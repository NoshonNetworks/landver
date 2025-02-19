// This Tests cover the full flow from land registration to NFT minting and transfer and Edge cases.
use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address, spy_events, EventSpyAssertionsTrait,
};
use starknet::ContractAddress;
use land_registry::interface::land_register::{
    ILandRegistryDispatcher, ILandRegistryDispatcherTrait,
};
use land_registry::interface::land_register::{Location, LandStatus};

use land_registry::land_register::LandRegistryContract::{Event};
use land_registry::interface::land_register::{LandVerified, LandTransferred};

pub mod Accounts {
    use starknet::ContractAddress;
    use core::traits::TryInto;

    pub fn nft() -> ContractAddress {
        'nft'.try_into().unwrap()
    }

    pub fn ADDR1() -> ContractAddress {
        starknet::contract_address_const::<0x123>()
    }
    pub fn ADDR2() -> ContractAddress {
        starknet::contract_address_const::<0x456>()
    }
    pub fn ADDR3() -> ContractAddress {
        starknet::contract_address_const::<0x789>()
    }
}

fn deploy(name: ByteArray) -> ContractAddress {
    let nft_class_hash = declare("LandNFT").unwrap().contract_class();
    let nft_contract_class_hash = nft_class_hash.class_hash;
    let land_registry_contract = declare(name).unwrap().contract_class();
    let mut call_data = ArrayTrait::<felt252>::new();
    nft_contract_class_hash.serialize(ref call_data);
    let (contract_address, _) = land_registry_contract.deploy(@call_data).unwrap();
    contract_address
}

#[test]
fn test_register_and_get_land() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let owner = Accounts::ADDR1();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';

    start_cheat_caller_address(contract_address, owner);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    let registered_land = land_register_dispatcher.get_land(land_id);

    // Assert land details are correct
    assert!(registered_land.owner == owner, "Wrong owner");
    assert!(registered_land.location == location, "Wrong location");
    assert!(registered_land.area == area, "Wrong area");
    assert!(registered_land.land_use == land_use, "Wrong land use");
    match registered_land.status {
        LandStatus::Pending => {},
        _ => panic!("Must be Pending"),
    }
    assert!(registered_land.inspector == 0.try_into().unwrap(), "Should have no inspector");
}

#[test]
fn test_register_multiple_lands() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // // Set up test data
    let owner = Accounts::ADDR1();
    let location_1: Location = Location { latitude: 1, longitude: 2 };
    let location_2: Location = Location { latitude: 3, longitude: 4 };
    let location_3: Location = Location { latitude: 5, longitude: 6 };
    let area_1: u64 = 1000;
    let area_2: u64 = 2000;
    let area_3: u64 = 3000;
    let land_use_1 = 'Residential';
    let land_use_2 = 'Commercial';
    let land_use_3 = 'Industrial';

    start_cheat_caller_address(contract_address, owner);
    land_register_dispatcher.register_land(location_1, area_1, land_use_1);
    land_register_dispatcher.register_land(location_2, area_2, land_use_2);
    land_register_dispatcher.register_land(location_3, area_3, land_use_3);

    let land_ids = land_register_dispatcher.get_lands_by_owner(owner);

    let land_1 = land_register_dispatcher.get_land(*land_ids.at(0));
    let land_2 = land_register_dispatcher.get_land(*land_ids.at(1));
    let land_3 = land_register_dispatcher.get_land(*land_ids.at(2));

    // Assert land 1
    assert!(land_1.owner == owner, "Wrong owner");
    assert!(land_1.location == location_1, "Wrong location");
    assert!(land_1.area == area_1, "Wrong area");
    assert!(land_1.land_use == land_use_1, "Wrong land use");
    match land_1.status {
        LandStatus::Pending => {},
        _ => panic!("Must be Pending"),
    }
    assert!(land_1.inspector == 0.try_into().unwrap(), "Should have no inspector");

    // Assert land 2
    assert!(land_2.owner == owner, "Wrong owner");
    assert!(land_2.location == location_2, "Wrong location");
    assert!(land_2.area == area_2, "Wrong area");
    assert!(land_2.land_use == land_use_2, "Wrong land use");
    match land_2.status {
        LandStatus::Pending => {},
        _ => panic!("Must be Pending"),
    }
    assert!(land_2.inspector == 0.try_into().unwrap(), "Should have no inspector");

    // Assert land 3
    assert!(land_3.owner == owner, "Wrong owner");
    assert!(land_3.location == location_3, "Wrong location");
    assert!(land_3.area == area_3, "Wrong area");
    assert!(land_3.land_use == land_use_3, "Wrong land use");
    match land_3.status {
        LandStatus::Pending => {},
        _ => panic!("Must be Pending"),
    }
    assert!(land_3.inspector == 0.try_into().unwrap(), "Should have no inspector");
}

#[test]
fn test_register_and_approve() {
    let mut spy = spy_events();

    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // // Set up test data
    let owner = Accounts::ADDR1();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';
    let inspector = Accounts::ADDR2();

    start_cheat_caller_address(contract_address, owner);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    land_register_dispatcher.set_land_inspector(land_id, inspector);
    stop_cheat_caller_address(contract_address);

    // approve land
    start_cheat_caller_address(contract_address, inspector);
    land_register_dispatcher.approve_land(land_id);

    spy.assert_emitted(@array![(contract_address, Event::LandVerified(LandVerified { land_id }))]);
}

#[test]
fn test_register_approve_and_transfer() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // // Set up test data
    let owner = Accounts::ADDR1();
    let inspector = Accounts::ADDR2();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';

    // register and add inspector
    start_cheat_caller_address(contract_address, owner);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    land_register_dispatcher.set_land_inspector(land_id, inspector);
    stop_cheat_caller_address(contract_address);

    // approve land
    start_cheat_caller_address(contract_address, inspector);
    land_register_dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    let mut spy = spy_events();

    // transfer land
    let new_owner = Accounts::ADDR3();
    start_cheat_caller_address(contract_address, owner);
    land_register_dispatcher.transfer_land(land_id, new_owner);

    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    Event::LandTransferred(
                        LandTransferred { land_id, from_owner: owner, to_owner: new_owner },
                    ),
                ),
            ],
        );
}

#[test]
fn test_register_update_approve_and_transfer() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // // Set up test data
    let owner = Accounts::ADDR1();
    let inspector = Accounts::ADDR2();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';
    let land_status = LandStatus::Pending;

    // register and add inspector
    start_cheat_caller_address(contract_address, owner);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    land_register_dispatcher.set_land_inspector(land_id, inspector);

    // update land
    let new_area: u64 = 1000;
    let new_land_use = 'Residential';
    land_register_dispatcher.update_land(land_id, new_area, new_land_use, land_status);

    stop_cheat_caller_address(contract_address);

    // approve land
    start_cheat_caller_address(contract_address, inspector);
    land_register_dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    let mut spy = spy_events();

    // transfer land
    let new_owner = Accounts::ADDR3();
    start_cheat_caller_address(contract_address, owner);
    land_register_dispatcher.transfer_land(land_id, new_owner);

    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    Event::LandTransferred(
                        LandTransferred { land_id, from_owner: owner, to_owner: new_owner },
                    ),
                ),
            ],
        );
}

#[test]
fn test_register_approve_update_and_transfer() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // // Set up test data
    let owner = Accounts::ADDR1();
    let inspector = Accounts::ADDR2();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';

    // register and add inspector
    start_cheat_caller_address(contract_address, owner);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    land_register_dispatcher.set_land_inspector(land_id, inspector);
    stop_cheat_caller_address(contract_address);

    // approve land
    start_cheat_caller_address(contract_address, inspector);
    land_register_dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    // update land
    start_cheat_caller_address(contract_address, owner);
    let new_area: u64 = 1000;
    let new_land_use = 'Residential';
    let land_status = LandStatus::Approved;
    land_register_dispatcher.update_land(land_id, new_area, new_land_use, land_status);
    stop_cheat_caller_address(contract_address);

    let mut spy = spy_events();

    // transfer land
    let new_owner = Accounts::ADDR3();
    start_cheat_caller_address(contract_address, owner);
    land_register_dispatcher.transfer_land(land_id, new_owner);

    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    Event::LandTransferred(
                        LandTransferred { land_id, from_owner: owner, to_owner: new_owner },
                    ),
                ),
            ],
        );
}

#[test]
fn test_register_approve_transfer_and_update_by_new_owner() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // // Set up test data
    let owner = Accounts::ADDR1();
    let inspector = Accounts::ADDR2();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';
    let land_status = LandStatus::Approved;

    // register and add inspector
    start_cheat_caller_address(contract_address, owner);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    land_register_dispatcher.set_land_inspector(land_id, inspector);
    stop_cheat_caller_address(contract_address);

    // approve land
    start_cheat_caller_address(contract_address, inspector);
    land_register_dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    // transfer land
    let new_owner = Accounts::ADDR3();
    start_cheat_caller_address(contract_address, owner);
    land_register_dispatcher.transfer_land(land_id, new_owner);

    // update land
    start_cheat_caller_address(contract_address, new_owner);
    let new_area: u64 = 2000;
    let new_land_use = 'Commercial';
    land_register_dispatcher.update_land(land_id, new_area, new_land_use, land_status);
}

#[test]
#[should_panic(expected: ('Land must be approved',))]
fn try_to_transfer_before_approve() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // // Set up test data
    let owner = Accounts::ADDR1();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';

    // register and add inspector
    start_cheat_caller_address(contract_address, owner);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);

    // transfer land
    let new_owner = Accounts::ADDR3();
    land_register_dispatcher.transfer_land(land_id, new_owner);
}

#[test]
#[should_panic(expected: ('Only owner can update land',))]
fn previous_owner_tries_to_update_after_transfer_should_fail() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // // Set up test data
    let owner = Accounts::ADDR1();
    let inspector = Accounts::ADDR2();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';
    let land_status = LandStatus::Approved;

    // register and add inspector
    start_cheat_caller_address(contract_address, owner);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    land_register_dispatcher.set_land_inspector(land_id, inspector);
    stop_cheat_caller_address(contract_address);

    // approve land
    start_cheat_caller_address(contract_address, inspector);
    land_register_dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    // transfer land
    let new_owner = Accounts::ADDR3();
    start_cheat_caller_address(contract_address, owner);
    land_register_dispatcher.transfer_land(land_id, new_owner);

    // update land
    let new_area: u64 = 2000;
    let new_land_use = 'Commercial';
    land_register_dispatcher.update_land(land_id, new_area, new_land_use, land_status);
}

#[test]
#[should_panic(expected: ('Only inspector can approve',))]
fn test_no_inspector_tries_to_approve_should_fail() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // // Set up test data
    let owner = Accounts::ADDR1();
    let no_inspector = Accounts::ADDR2();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';

    // register and add inspector
    start_cheat_caller_address(contract_address, owner);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // no inspector tries to approve land
    start_cheat_caller_address(contract_address, no_inspector);
    land_register_dispatcher.approve_land(land_id);
}

#[test]
#[should_panic(expected: ('Only inspector can approve',))]
fn test_try_to_approve_a_not_existant_land_should_fail() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };
    let inspector = Accounts::ADDR2();
    let fake_land_id = 1;
    start_cheat_caller_address(contract_address, inspector);
    land_register_dispatcher.approve_land(fake_land_id);
}

#[test]
#[should_panic]
fn test_try_to_transfer_a_not_existant_land_should_fail() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };
    let new_owner = Accounts::ADDR1();
    let fake_land_id = 1;
    start_cheat_caller_address(contract_address, new_owner);
    land_register_dispatcher.transfer_land(fake_land_id, new_owner);
}

#[test]
#[should_panic(expected: ('Only owner can update land',))]
fn test_try_to_update_a_not_existant_land_should_fail() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // // Set up test data
    let owner = Accounts::ADDR1();
    let not_owner = Accounts::ADDR2();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';
    let land_status = LandStatus::Approved;

    // register and add inspector
    start_cheat_caller_address(contract_address, owner);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);
    start_cheat_caller_address(contract_address, not_owner);
    let new_area = 2000;
    let new_land_use = 'Commercial';
    land_register_dispatcher.update_land(land_id, new_area, new_land_use, land_status);
}
