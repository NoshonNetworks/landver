use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address, start_cheat_block_timestamp, stop_cheat_block_timestamp
};
use starknet::ContractAddress;
use land_registry::interface::{ILandRegistryDispatcher, ILandRegistryDispatcherTrait};
use land_registry::interface::{LandUse, Location, LandStatus};

pub mod Accounts {
    use starknet::ContractAddress;
    use core::traits::TryInto;

    pub fn zero() -> ContractAddress {
        0x0000000000000000000000000000000000000000.try_into().unwrap()
    }

    pub fn nft() -> ContractAddress {
        'nft'.try_into().unwrap()
    }

    pub fn account1() -> ContractAddress {
        'account1'.try_into().unwrap()
    }
}

fn deploy(name: ByteArray) -> ContractAddress {
    // Deploy Ownable contract
    let nft_contract = declare("LandNFT").unwrap().contract_class();
    let (nft_address, _) = nft_contract.deploy(@array![Accounts::nft().into()]).unwrap();

    // Deploy Aggregator contract
    let land_registry_contract = declare(name).unwrap().contract_class();
    let constructor_args = array![nft_address.into(),];
    let (contract_address, _) = land_registry_contract.deploy(@constructor_args).unwrap();
    contract_address
}

#[test]
fn test_can_register_land() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let caller_address = starknet::contract_address_const::<0x123>();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u256 = 1000;
    let land_use = LandUse::Residential;

    // Start cheating the caller address
    start_cheat_caller_address(contract_address, caller_address);

    // Register the land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);

    // Get the registered land
    let registered_land = land_register_dispatcher.get_land(land_id);

    // Assert land details are correct
    assert(registered_land.owner == caller_address, 'Wrong owner');
    assert(registered_land.location == location, 'Wrong location');
    assert(registered_land.area == area, 'Wrong area');
    assert(registered_land.land_use == land_use, 'Wrong land use');
    match registered_land.status {
        LandStatus::Pending => {},
        _ => panic!("Must be Pending"),
    }
    assert(registered_land.inspector.is_none(), 'Should have no inspector');
}

#[test]
fn test_can_create_land_id() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let area: u256 = 1000;
    let land_use = LandUse::Residential;

    let location1: Location = Location { latitude: 1, longitude: 2 };
    let location2: Location = Location { latitude: 3, longitude: 4 };
    let location3: Location = Location { latitude: 5, longitude: 6 };

    //Testcase 1
    start_cheat_caller_address(contract_address, 123.try_into().unwrap());
    start_cheat_block_timestamp(contract_address, 10);

    let id_1 = land_register_dispatcher.register_land(location1, area, land_use);
    assert(
        id_1 == 689216240506425664519995665376830138699152617179386928383439581252423035401,
        'land_id is not as expected (1)'
    );

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);

    //Testcase 2
    start_cheat_caller_address(contract_address, 456.try_into().unwrap());
    start_cheat_block_timestamp(contract_address, 20);

    let id_2 = land_register_dispatcher.register_land(location2, area, land_use);
    assert(
        id_2 == 14747943344839073547474207539210781044163306897453701102442319167742800565,
        'land_id is not as expected (2)'
    );

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);

    //Testcase 3
    start_cheat_caller_address(contract_address, 789.try_into().unwrap());
    start_cheat_block_timestamp(contract_address, 30);

    let id_3 = land_register_dispatcher.register_land(location3, area, land_use);
    assert(
        id_3 == 864555402638950626684962868225518693284860492943333490893906025290030385222,
        'land_id is not as expected (3)'
    );

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);
}

#[test]
fn test_can_get_land_count() {
    let contract_address = deploy("LandRegistryContract");
    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };
    // Start cheating the caller address
    start_cheat_caller_address(contract_address, starknet::contract_address_const::<0x123>());
    // Assert land_count is equal to zero before registration
    assert(land_register_dispatcher.get_land_count() == 0, 'Should be equal to zero');
    // Register the land
    land_register_dispatcher
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, LandUse::Residential);
    // Assert land_count is equal to one after registration
    assert(land_register_dispatcher.get_land_count() == 1, 'Should be equal to one');
}

#[test]
fn test_can_get_lands_by_owner() {
    let contract_address = deploy("LandRegistryContract");
    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };
    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    // Start cheating the caller address
    start_cheat_caller_address(contract_address, owner_address);
    // Register lands
    let land_id1 = land_register_dispatcher
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, LandUse::Residential);
    let land_id2 = land_register_dispatcher
        .register_land(Location { latitude: 3, longitude: 4 }, 1000, LandUse::Residential);
    let land_id3 = land_register_dispatcher
        .register_land(Location { latitude: 5, longitude: 6 }, 1000, LandUse::Residential);
    assert_eq!(
        land_register_dispatcher.get_lands_by_owner(owner_address),
        array![land_id1, land_id2, land_id3].span(),
    );
}

#[test]
fn test_can_approve_land() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = LandUse::Residential;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Add inspector
    start_cheat_caller_address(contract_address, inspector_address);
    land_register_dispatcher.add_inspector(inspector_address);

    // Approve land as inspector
    let land_before = land_register_dispatcher.get_land(land_id);
    assert_eq!(land_before.status, LandStatus::Pending, "Should be pending before approval");

    land_register_dispatcher.approve_land(land_id);

    // Get approved land and verify status
    let land_after = land_register_dispatcher.get_land(land_id);
    assert_eq!(land_after.status, LandStatus::Approved, "Should be approved after");
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_reject_land() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = LandUse::Residential;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Add inspector
    start_cheat_caller_address(contract_address, inspector_address);
    land_register_dispatcher.add_inspector(inspector_address);

    // Reject land as inspector
    let land_before = land_register_dispatcher.get_land(land_id);
    assert_eq!(land_before.status, LandStatus::Pending, "Should be pending before reject");

    land_register_dispatcher.reject_land(land_id);

    // Get rejected land and verify status
    let land_after = land_register_dispatcher.get_land(land_id);
    assert_eq!(land_after.status, LandStatus::Rejected, "Should be rejected after");
    stop_cheat_caller_address(contract_address);
}
