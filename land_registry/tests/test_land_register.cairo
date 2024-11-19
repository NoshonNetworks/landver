use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address, start_cheat_block_timestamp, stop_cheat_block_timestamp,
    start_cheat_max_fee,
};
use starknet::ContractAddress;
use land_registry::interface::land_register::{
    ILandRegistryDispatcher, ILandRegistryDispatcherTrait
};
use land_registry::interface::land_register::{LandUse, Location, LandStatus};

pub mod Accounts {
    use starknet::ContractAddress;
    use core::traits::TryInto;

    pub fn zero() -> ContractAddress {
        0x0000000000000000000000000000000000000000.try_into().unwrap()
    }

    pub fn account1() -> ContractAddress {
        'account1'.try_into().unwrap()
    }
}

fn deploy(name: ByteArray) -> ContractAddress {
    let nft_class_hash = declare("LandNFT").unwrap().contract_class();
    let nft_contract_class_hash = nft_class_hash.class_hash;
    let initial_fee_rate: u128 = 1;
    let land_registry_contract = declare(name).unwrap().contract_class();
    let mut call_data = ArrayTrait::<felt252>::new();
    nft_contract_class_hash.serialize(ref call_data);
    initial_fee_rate.serialize(ref call_data);
    let (contract_address, _) = land_registry_contract.deploy(@call_data).unwrap();
    contract_address
}

#[test]
fn test_can_register_land() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

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
    assert(registered_land.inspector == 0.try_into().unwrap(), 'Should have no inspector');
}

#[test]
fn test_can_create_land_id() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

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

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Start cheating the caller address
    start_cheat_caller_address(contract_address, starknet::contract_address_const::<0x123>());
    // Assert land_count is equal to zero before registration
    assert(land_register_dispatcher.get_land_count() == 0, 'Should be equal to zero');
    // Register the land
    land_register_dispatcher
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, LandUse::Residential);
    // Assert land_count is equal to one after registration
    assert(land_register_dispatcher.get_land_count() == 1, 'Should be equal to one');

    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_get_lands_by_owner() {
    let contract_address = deploy("LandRegistryContract");
    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

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

    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_get_is_land_approved() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let caller_address = starknet::contract_address_const::<0x123>();
    let location: Location = Location { latitude: 12, longitude: 34 };
    let area: u256 = 1234;
    let land_use = LandUse::Commercial;

    // Start cheating the caller address
    start_cheat_caller_address(contract_address, caller_address);

    // Register the land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);

    assert(
        land_register_dispatcher.is_land_approved(land_id) == false, 'Land should not be approved'
    );

    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_get_pending_approvals() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let caller_address = starknet::contract_address_const::<0x123>();
    let location: Location = Location { latitude: 12, longitude: 34 };
    let area: u256 = 1234;
    let land_use = LandUse::Residential;

    // Start cheating the caller address
    start_cheat_caller_address(contract_address, caller_address);

    // Register the land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);

    assert(
        land_register_dispatcher.get_pending_approvals() == array![land_id],
        'Not enough pending approvals'
    );
}

#[test]
fn test_can_get_land_transaction_history() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let caller_address = starknet::contract_address_const::<0x123>();
    let location: Location = Location { latitude: 12, longitude: 34 };
    let area: u256 = 1234;
    let land_use = LandUse::Residential;

    // Start cheating the caller address
    start_cheat_caller_address(contract_address, caller_address);
    start_cheat_block_timestamp(contract_address, 1);

    // Register the land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);

    assert(
        land_register_dispatcher
            .get_land_transaction_history(land_id) == array![(caller_address, 1)],
        'Inaccurate land history'
    );

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);
}

#[test]
fn test_set_inspector() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u256 = 1000;
    let land_use = LandUse::Residential;

    // Start cheating the caller address
    start_cheat_caller_address(contract_address, owner_address);

    // Register the land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);

    // Get the registered land
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    let registered_land = land_register_dispatcher.get_land(land_id);

    // Assert land details are correct
    assert(registered_land.inspector == inspector_address, 'Wrong inspector');
}

#[test]
fn test_can_approve_land() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

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

    // Set inspector as owner address
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    // Approve land as inspector
    start_cheat_caller_address(contract_address, inspector_address);
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

    start_cheat_max_fee(contract_address, 10000000000000000000);

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

    // Set inspector as owner
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    // Reject land as inspector
    start_cheat_caller_address(contract_address, inspector_address);
    let land_before = land_register_dispatcher.get_land(land_id);
    assert_eq!(land_before.status, LandStatus::Pending, "Should be pending before reject");

    land_register_dispatcher.reject_land(land_id);

    // Get rejected land and verify status
    let land_after = land_register_dispatcher.get_land(land_id);
    assert_eq!(land_after.status, LandStatus::Rejected, "Should be rejected after");
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_reject_land_by_inspector() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

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

    // Set inspector as owner
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    // Reject land as inspector
    start_cheat_caller_address(contract_address, inspector_address);

    // Verify initial status
    let land_before = land_register_dispatcher.get_land(land_id);
    assert_eq!(land_before.status, LandStatus::Pending, "Should be pending before reject");

    // Perform rejection
    land_register_dispatcher.reject_land(land_id);

    // Verify final status
    let land_after = land_register_dispatcher.get_land(land_id);
    assert_eq!(land_after.status, LandStatus::Rejected, "Should be rejected after");

    stop_cheat_caller_address(contract_address);
}


#[test]
#[should_panic(expected: ('Only inspector/owner can reject',))]
fn test_reject_land_by_unauthorized_user() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let unauthorized_address = starknet::contract_address_const::<0x789>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = LandUse::Residential;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Attempt to reject land as unauthorized user
    start_cheat_caller_address(contract_address, unauthorized_address);
    land_register_dispatcher.reject_land(land_id); // This should panic
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_update_land() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up initial test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let location = Location { latitude: 1, longitude: 2 };
    let initial_area = 1000;
    let initial_land_use = LandUse::Residential;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, initial_area, initial_land_use);

    // Update data
    let new_area = 1500;
    let new_land_use = LandUse::Commercial;

    // Update land
    land_register_dispatcher.update_land(land_id, new_area, new_land_use);

    // Verify updates
    let updated_land = land_register_dispatcher.get_land(land_id);
    assert(updated_land.area == new_area, 'Area not updated correctly');
    assert(updated_land.land_use == new_land_use, 'Land use not updated correctly');

    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic(expected: ('Only owner can update land',))]
fn test_update_land_by_unauthorized_user() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let unauthorized_address = starknet::contract_address_const::<0x789>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = LandUse::Residential;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Attempt to update land as unauthorized user
    start_cheat_caller_address(contract_address, unauthorized_address);
    land_register_dispatcher.update_land(land_id, 1500, LandUse::Commercial); // This should panic
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_add_inspector() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let inspector_address = starknet::contract_address_const::<0x456>();
    let admin_address = starknet::contract_address_const::<0x123>();

    // Add inspector
    start_cheat_caller_address(contract_address, admin_address);

    // Add the inspector
    land_register_dispatcher.add_inspector(inspector_address);

    // Get land for inspector to verify assignment
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = LandUse::Residential;

    // Register land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);

    // Set inspector for the land to make them active
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);

    // Verify inspector is registered
    assert(land_register_dispatcher.is_inspector(inspector_address), 'Should be registered');

    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic(expected: ('Inspector already registered',))]
fn test_cannot_add_duplicate_inspector() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let inspector_address = starknet::contract_address_const::<0x456>();
    let admin_address = starknet::contract_address_const::<0x123>();

    start_cheat_caller_address(contract_address, admin_address);

    // Add inspector first time
    land_register_dispatcher.add_inspector(inspector_address);

    // Try to add same inspector again - should panic
    land_register_dispatcher.add_inspector(inspector_address);

    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic(expected: ('Invalid inspector address',))]
fn test_cannot_add_zero_address_inspector() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    let admin_address = starknet::contract_address_const::<0x123>();
    start_cheat_caller_address(contract_address, admin_address);

    // Try to add zero address as inspector
    land_register_dispatcher.add_inspector(Accounts::zero());

    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic(expected: ('Inspector not registered',))]
fn test_cannot_remove_unregistered_inspector() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    let admin_address = starknet::contract_address_const::<0x123>();
    let unregistered_inspector = starknet::contract_address_const::<0x789>();

    start_cheat_caller_address(contract_address, admin_address);

    // Try to remove an inspector that was never registered
    land_register_dispatcher.remove_inspector(unregistered_inspector);

    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic(expected: ('Inspector is active',))]
fn test_cannot_remove_active_inspector() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = LandUse::Residential;

    // Add inspector
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.add_inspector(inspector_address);

    // Register land and assign inspector
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);

    // Try to remove active inspector
    land_register_dispatcher.remove_inspector(inspector_address); // Should panic

    stop_cheat_caller_address(contract_address);
}
#[test]
fn test_can_transfer_land() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let new_owner_address = starknet::contract_address_const::<0x789>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = LandUse::Residential;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Set inspector as owner
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    // approve land
    start_cheat_caller_address(contract_address, inspector_address);
    land_register_dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    // transfer land
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.transfer_land(land_id, new_owner_address);

    let land_after = land_register_dispatcher.get_land(land_id);

    assert(land_after.owner == new_owner_address, 'Land not transfered');

    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_update_listing_price() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let old_price = 200;
    let new_price = 400;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, LandUse::Residential);
    stop_cheat_caller_address(contract_address);

    // Set inspector as owner
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    // approve land
    start_cheat_caller_address(contract_address, inspector_address);
    land_register_dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    // create a listing
    start_cheat_caller_address(contract_address, owner_address);
    let listing_id = land_register_dispatcher.create_listing(land_id, old_price);
    stop_cheat_caller_address(contract_address);

    let listing_details = land_register_dispatcher.get_listing(listing_id);

    // Assert the price is set correctly
    assert(listing_details.price == old_price, 'Wrong price set');

    // Update listing and record
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.update_listing_price(listing_id, new_price);
    stop_cheat_caller_address(contract_address);

    // Assert the price is updated correctly
    let new_listing_details = land_register_dispatcher.get_listing(listing_id);
    assert(new_listing_details.price == new_price, 'Wrong updated price');

    // Verify other listing details remain unchanged
    assert(new_listing_details.seller == owner_address, 'Wrong seller');
    assert(new_listing_details.land_id == land_id.try_into().unwrap(), 'Wrong land id');

    // Verify price history
    let price_history = land_register_dispatcher.get_listing_price_history(listing_id);

    // Verify number of updates
    assert(price_history.len() == 2, 'Wrong number of price updates');
}


#[test]
#[should_panic(expected: ('Only seller can update',))]
fn test_update_listing_price_should_panic_if_caller_not_seller() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let not_seller_address = starknet::contract_address_const::<0x789>();
    let old_price = 200;
    let new_price = 400;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, LandUse::Residential);
    stop_cheat_caller_address(contract_address);

    // Set inspector as owner
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    // approve land
    start_cheat_caller_address(contract_address, inspector_address);
    land_register_dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    // create a listing
    start_cheat_caller_address(contract_address, owner_address);
    let listing_id = land_register_dispatcher.create_listing(land_id, old_price);
    stop_cheat_caller_address(contract_address);

    let listing_details = land_register_dispatcher.get_listing(listing_id);

    // Assert the price is set correctly
    assert(listing_details.price == old_price, 'Wrong price set');

    // Update listing
    start_cheat_caller_address(contract_address, not_seller_address);
    land_register_dispatcher.update_listing_price(listing_id, new_price);
    stop_cheat_caller_address(contract_address);
}


#[test]
#[should_panic(expected: ('Listing not active',))]
fn test_update_listing_price_should_panic_if_listing_not_active() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let old_price = 200;
    let new_price = 400;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, LandUse::Residential);
    stop_cheat_caller_address(contract_address);

    // Set inspector as owner
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    // approve land
    start_cheat_caller_address(contract_address, inspector_address);
    land_register_dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    // create a listing
    start_cheat_caller_address(contract_address, owner_address);
    let listing_id = land_register_dispatcher.create_listing(land_id, old_price);
    stop_cheat_caller_address(contract_address);

    // cancel listing
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.cancel_listing(listing_id);
    stop_cheat_caller_address(contract_address);

    // Update listing
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.update_listing_price(listing_id, new_price);
    stop_cheat_caller_address(contract_address);
}


#[test]
fn test_upgradability() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };
    let new_class_hash = declare("LandRegistryContract").unwrap().contract_class().class_hash;
    land_register_dispatcher.upgrade(*new_class_hash);
}

#[test]
#[should_panic]
fn test_upgradability_should_fail_if_not_owner_tries_to_update() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };
    let new_class_hash = declare("LandRegistryContract").unwrap().contract_class().class_hash;
    start_cheat_caller_address(contract_address, starknet::contract_address_const::<0x123>());
    land_register_dispatcher.upgrade(*new_class_hash);
}
