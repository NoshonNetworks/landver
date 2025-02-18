use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address, start_cheat_block_timestamp, stop_cheat_block_timestamp,
    start_cheat_max_fee, stop_cheat_max_fee,
};
use land_registry::interface::land_register::{
    ILandRegistryDispatcher, ILandRegistryDispatcherTrait, Location, LandStatus, ListingStatus,
};
use land_registry::utils::utils::MODULO_BASE;
use starknet::ContractAddress;
use core::array::ArrayTrait;
use core::traits::TryInto;
use core::option::OptionTrait;
use core::result::ResultTrait;

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
    let land_registry_contract = declare(name).unwrap().contract_class();
    let mut call_data = ArrayTrait::<felt252>::new();
    nft_contract_class_hash.serialize(ref call_data);
    let (contract_address, _) = land_registry_contract.deploy(@call_data).unwrap();
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
    let area: u64 = 1000;
    let land_use = 'Residential';

    // Start cheating the caller address
    start_cheat_caller_address(contract_address, caller_address);

    // Register the land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    assert_le!(land_id, MODULO_BASE - 1); // ensure the id is within the 32-digit range.

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

// #[test]
// fn test_can_create_land_id() {
//     let contract_address = deploy("LandRegistryContract");

//     // Get an instance of the deployed Counter contract
//     let land_register_dispatcher = ILandRegistryDispatcher { contract_address };
//     // Set up test data
//     let area: u64 = 1000;
//     let land_use = 'Residential';

//     let location1: Location = Location { latitude: 1, longitude: 2 };
//     let location2: Location = Location { latitude: 3, longitude: 4 };
//     let location3: Location = Location { latitude: 5, longitude: 6 };

//     //Testcase 1
//     start_cheat_caller_address(contract_address, 123.try_into().unwrap());
//     start_cheat_block_timestamp(contract_address, 10);

//     let id_1 = land_register_dispatcher.register_land(location1, area, land_use);
//     assert(id_1 == 76145731643, 'land_id is not as expected (1)');

//     stop_cheat_caller_address(contract_address);
//     stop_cheat_block_timestamp(contract_address);

//     //Testcase 2
//     start_cheat_caller_address(contract_address, 456.try_into().unwrap());
//     start_cheat_block_timestamp(contract_address, 20);

//     let id_2 = land_register_dispatcher.register_land(location2, area, land_use);
//     assert(id_2 == 96145731646, 'land_id is not as expected (2)');

//     stop_cheat_caller_address(contract_address);
//     stop_cheat_block_timestamp(contract_address);

//     //Testcase 3
//     start_cheat_caller_address(contract_address, 789.try_into().unwrap());
//     start_cheat_block_timestamp(contract_address, 30);

//     let id_3 = land_register_dispatcher.register_land(location3, area, land_use);
//     assert(id_3 == 96145731647, 'land_id is not as expected (3)');
//     println!("id 3: {}", id_3);
//     stop_cheat_caller_address(contract_address);
//     stop_cheat_block_timestamp(contract_address);
// }

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
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, 'Residential');
    // Assert land_count is equal to one after registration
    assert(land_register_dispatcher.get_land_count() == 1, 'Should be equal to one');

    stop_cheat_caller_address(contract_address);
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
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, 'Residential');
    let land_id2 = land_register_dispatcher
        .register_land(Location { latitude: 3, longitude: 4 }, 1000, 'Residential');
    let land_id3 = land_register_dispatcher
        .register_land(Location { latitude: 5, longitude: 6 }, 1000, 'Residential');
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

    // Set up test data
    let caller_address = starknet::contract_address_const::<0x123>();
    let location: Location = Location { latitude: 12, longitude: 34 };
    let area: u64 = 1234;
    let land_use = 'Commercial';

    // Start cheating the caller address
    start_cheat_caller_address(contract_address, caller_address);

    // Register the land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);

    assert(
        land_register_dispatcher.is_land_approved(land_id) == false, 'Land should not be approved',
    );

    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_get_pending_approvals() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let caller_address = starknet::contract_address_const::<0x123>();
    let location: Location = Location { latitude: 12, longitude: 34 };
    let area: u64 = 1234;
    let land_use = 'Residential';

    // Start cheating the caller address
    start_cheat_caller_address(contract_address, caller_address);

    // Register the land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);

    assert(
        land_register_dispatcher.get_pending_approvals() == array![land_id],
        'Not enough pending approvals',
    );
}

#[test]
fn test_can_get_land_transaction_history() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let caller_address = starknet::contract_address_const::<0x123>();
    let location: Location = Location { latitude: 12, longitude: 34 };
    let area: u64 = 1234;
    let land_use = 'Residential';

    // Start cheating the caller address
    start_cheat_caller_address(contract_address, caller_address);
    start_cheat_block_timestamp(contract_address, 1);

    // Register the land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);

    assert(
        land_register_dispatcher
            .get_land_transaction_history(land_id) == array![(caller_address, 1)],
        'Inaccurate land history',
    );

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);
}

#[test]
fn test_set_inspector() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';

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

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';

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

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';

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

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';

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

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let unauthorized_address = starknet::contract_address_const::<0x789>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';

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

    // Set up initial test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let location = Location { latitude: 1, longitude: 2 };
    let initial_area = 1000;
    let initial_land_use = 'Residential';
    let land_status = LandStatus::Approved;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, initial_area, initial_land_use);

    // Update data
    let new_area = 1500;
    let new_land_use = 'Commercial';

    // Update land
    land_register_dispatcher.update_land(land_id, new_area, new_land_use, land_status);

    // Verify updates
    let updated_land = land_register_dispatcher.get_land(land_id);
    assert(updated_land.area == new_area, 'Area not updated correctly');
    assert(updated_land.land_use == new_land_use, 'Land use not updated correctly');
    assert(updated_land.status == land_status, 'Land status not updated');

    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic(expected: ('Only owner can update land',))]
fn test_update_land_by_unauthorized_user_will_fail() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let unauthorized_address = starknet::contract_address_const::<0x789>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Attempt to update land as unauthorized user
    start_cheat_caller_address(contract_address, unauthorized_address);
    land_register_dispatcher
        .update_land(land_id, 1500, 'Commercial', LandStatus::Approved); // This should panic
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_add_inspector() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

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
    let land_use = 'Residential';

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

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';

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
fn test_can_get_all_inspectors() {
    let contract_address = deploy("LandRegistryContract");

    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let inspector_address = starknet::contract_address_const::<0x456>();
    let admin_address = starknet::contract_address_const::<0x123>();

    // Add inspector
    start_cheat_caller_address(contract_address, admin_address);

    // Add the inspector
    land_register_dispatcher.add_inspector(inspector_address);

    let inspectors = land_register_dispatcher.get_all_inspectors();

    assert(inspectors == array![inspector_address], 'Should have inspector');

    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_transfer_land() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let new_owner_address = starknet::contract_address_const::<0x789>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';

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
fn test_buy_land() {
    // Deploy contract
    let contract_address = deploy("LandRegistryContract");
    let dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test addresses
    let seller = starknet::contract_address_const::<0x123>();
    let buyer = starknet::contract_address_const::<0x456>();
    let inspector = starknet::contract_address_const::<0x789>();

    // Set high max fee for all operations
    start_cheat_max_fee(contract_address, 1000000000000000000000000);

    // 1. Register land as seller
    start_cheat_caller_address(contract_address, seller);
    let location = Location { latitude: 1, longitude: 2 };
    let land_id = dispatcher.register_land(location, 1000_u64, 'Residential');

    // 2. Add inspector and set for land
    dispatcher.add_inspector(inspector);
    dispatcher.set_land_inspector(land_id, inspector);
    stop_cheat_caller_address(contract_address);

    // 3. Approve land as inspector
    start_cheat_caller_address(contract_address, inspector);
    dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    // 4. Create listing as seller
    start_cheat_caller_address(contract_address, seller);
    let price: u128 = 5000_u128;
    let listing_id = dispatcher.create_listing(land_id, price);
    stop_cheat_caller_address(contract_address);

    // 5. Buy land as buyer
    start_cheat_caller_address(contract_address, buyer);

    // Execute purchase
    dispatcher.buy_land(listing_id);

    // Verify results
    let listing = dispatcher.get_listing(listing_id);
    let land = dispatcher.get_land(land_id);

    assert(listing.status == ListingStatus::Sold, 'Listing should be sold');
    assert(land.owner == buyer, 'Land owner should be buyer');

    stop_cheat_caller_address(contract_address);
    stop_cheat_max_fee(contract_address);
}

#[test]
fn test_update_listing_price() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let old_price = 200;
    let new_price = 400;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, 'Residential');
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
    assert(listing_details.price == old_price.into(), 'Wrong price set');

    // Update listing and record
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.update_listing_price(listing_id, new_price);
    stop_cheat_caller_address(contract_address);

    // Assert the price is updated correctly
    let new_listing_details = land_register_dispatcher.get_listing(listing_id);
    assert(new_listing_details.price == new_price.into(), 'Wrong updated price');

    // Verify other listing details remain unchanged
    assert(new_listing_details.seller == owner_address, 'Wrong seller');
    assert(new_listing_details.land_id == land_id.try_into().unwrap(), 'Wrong land id');
}

#[test]
#[should_panic(expected: ('Only seller can update',))]
fn test_update_listing_price_should_panic_if_caller_not_seller() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let not_seller_address = starknet::contract_address_const::<0x789>();
    let old_price = 200;
    let new_price = 400;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, 'Residential');
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
    assert(listing_details.price == old_price.into(), 'Wrong price set');

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

    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let old_price = 200;
    let new_price = 400;

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher
        .register_land(Location { latitude: 1, longitude: 2 }, 1000, 'Residential');
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

#[test]
fn test_get_user_type() {
    let contract_address = deploy("LandRegistryContract");
    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u64 = 1000;
    let land_use = 'Residential';

    // Step 1: Register land with owner_address
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Step 2: Set inspector for the land
    start_cheat_caller_address(contract_address, owner_address);

    land_register_dispatcher.add_inspector(inspector_address);
    stop_cheat_caller_address(contract_address);

    let owner_type = land_register_dispatcher.get_user_type(owner_address);
    assert(owner_type == 'owner', 'Expect Owner');

    let inspector_type = land_register_dispatcher.get_user_type(inspector_address);
    assert(inspector_type == 'inspector', 'Expect Inspector');

    // Check a non-existent user
    let non_existent_address = starknet::contract_address_const::<0x789>();
    let non_user_type = land_register_dispatcher.get_user_type(non_existent_address);
    assert(non_user_type == 'None', 'Expecte None');
}

#[test]
fn test_can_get_listing() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location: Location = Location { latitude: 12, longitude: 34 };
    let area: u64 = 1234;
    let land_use = 'Commercial';

    // Start cheat caller address
    start_cheat_caller_address(contract_address, owner_address);
    // Register the land
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Set inspector as owner
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    // Approve the land
    start_cheat_caller_address(contract_address, inspector_address);
    land_register_dispatcher.approve_land(land_id);
    stop_cheat_caller_address(contract_address);

    // Create listing
    start_cheat_caller_address(contract_address, owner_address);
    let listing_price: u128 = 100000_u128;
    let listing_id = land_register_dispatcher.create_listing(land_id, listing_price);
    stop_cheat_caller_address(contract_address);

    // Retrieve the listing
    start_cheat_caller_address(contract_address, owner_address);
    let retrieved_listing = land_register_dispatcher.get_listing(listing_id);
    stop_cheat_caller_address(contract_address);

    // Assert retrieved listing details
    assert(retrieved_listing.land_id == land_id, 'Incorrect land ID');
    assert(retrieved_listing.seller == owner_address, 'Incorrect seller address');
    assert(retrieved_listing.price == listing_price, 'Incorrect listing price');
    assert(retrieved_listing.status == ListingStatus::Active, 'Incorrect listing status');

    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_get_active_listings() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();

    // Register first land
    let location1: Location = Location { latitude: 12, longitude: 34 };
    let area1: u64 = 1234;
    let land_use1 = 'Commercial';

    // Start cheat caller address for first land
    start_cheat_caller_address(contract_address, owner_address);
    let land_id1 = land_register_dispatcher.register_land(location1, area1, land_use1);
    stop_cheat_caller_address(contract_address);

    // Register second land
    let location2: Location = Location { latitude: 45, longitude: 67 };
    let area2: u64 = 5678;
    let land_use2 = 'Residential';

    start_cheat_caller_address(contract_address, owner_address);
    let land_id2 = land_register_dispatcher.register_land(location2, area2, land_use2);
    stop_cheat_caller_address(contract_address);

    // Set inspector for both lands
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id1, inspector_address);
    land_register_dispatcher.set_land_inspector(land_id2, inspector_address);
    stop_cheat_caller_address(contract_address);

    // Approve both lands
    start_cheat_caller_address(contract_address, inspector_address);
    land_register_dispatcher.approve_land(land_id1);
    land_register_dispatcher.approve_land(land_id2);
    stop_cheat_caller_address(contract_address);

    // Create listings
    start_cheat_caller_address(contract_address, owner_address);
    let listing_price1: u128 = 100000_u128;
    let listing_id1 = land_register_dispatcher.create_listing(land_id1, listing_price1);

    let listing_price2: u128 = 200000_u128;
    let listing_id2 = land_register_dispatcher.create_listing(land_id2, listing_price2);
    stop_cheat_caller_address(contract_address);

    // Get active listings
    start_cheat_caller_address(contract_address, owner_address);
    let active_listings = land_register_dispatcher.get_active_listings();
    stop_cheat_caller_address(contract_address);

    // Assert number of listings
    assert(active_listings.len().into() == 2, 'Incorrect listings');

    // Assert listing matching IDs
    assert(active_listings.at(0).try_into().unwrap() == @listing_id1, 'First ID incorrect');
    assert(active_listings.at(1).try_into().unwrap() == @listing_id2, 'Second ID incorrect');

    // Get and verify each listing details
    let retrieved_listing1 = land_register_dispatcher.get_listing(listing_id1);
    let retrieved_listing2 = land_register_dispatcher.get_listing(listing_id2);

    // Assert first listing details
    assert(retrieved_listing1.land_id == land_id1, 'Incorrect land ID 1');
    assert(retrieved_listing1.seller == owner_address, 'Incorrect seller 1');
    assert(retrieved_listing1.price == listing_price1, 'Incorrect price 1');
    assert(retrieved_listing1.status == ListingStatus::Active, 'Incorrect status 1');

    // Assert second listing details
    assert(retrieved_listing2.land_id == land_id2, 'Incorrect land ID 2');
    assert(retrieved_listing2.seller == owner_address, 'Incorrect seller 2');
    assert(retrieved_listing2.price == listing_price2, 'Incorrect price 2');
    assert(retrieved_listing2.status == ListingStatus::Active, 'Incorrect status 2');

    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_create_listing() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';
    let listing_price: u128 = 1000;

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

    // Create listing as land owner
    // let mut spy = spy_events();

    start_cheat_caller_address(contract_address, owner_address);
    let listing_id = land_register_dispatcher.create_listing(land_id, listing_price);
    let listing = land_register_dispatcher.get_listing(listing_id);

    // let expected_event = LandRegistryContract::Event::ListingCreated(
    //     LandRegistryContract::ListingCreated {
    //         listing_id, land_id, seller: owner_address, price: listing_price
    //     }
    // );

    // spy.assert_emitted(@array![(contract_address, expected_event)]);

    assert(listing.status == ListingStatus::Active, 'listing not created');
    assert(listing.price == listing_price, 'wrong listing price');
    assert(listing.land_id == land_id, 'wrong land id');
    assert(listing.seller == owner_address, 'wrong listing seller');
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_can_cancel_listing() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';
    let listing_price: u128 = 1000;

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

    // Create and cancel listing as land owner
    // let mut spy = spy_events();
    start_cheat_caller_address(contract_address, owner_address);
    // create listing
    let listing_id = land_register_dispatcher.create_listing(land_id, listing_price);
    // cancel listing
    land_register_dispatcher.cancel_listing(listing_id.clone());

    let listing = land_register_dispatcher.get_listing(listing_id);

    // let expected_event = LandRegistryContract::Event::ListingCancelled(
    //     LandRegistryContract::ListingCancelled { listing_id }
    // );

    // spy.assert_emitted(@array![(contract_address, expected_event)]);

    assert(listing.status == ListingStatus::Cancelled, 'listing not cancelled');
    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic]
fn test_get_land_for_id_that_does_not_exist_will_fail() {
    // Deploy the Land Registry Contract
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set a maximum fee for transactions
    start_cheat_max_fee(contract_address, 100000000000000);

    // Start cheating the caller address
    let caller_address = starknet::contract_address_const::<0x123>();
    start_cheat_caller_address(contract_address, caller_address);

    // Attempt to retrieve a non-existent land record
    land_register_dispatcher.get_land(5);

    // Stop cheating the caller address
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_get_land_status() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';

    // Register land
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Set inspector as owner address
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    // Approve land as inspector
    start_cheat_caller_address(contract_address, inspector_address);
    let status_before = land_register_dispatcher.get_land_status(land_id);
    assert_eq!(status_before, LandStatus::Pending, "Should be pending before approval");

    land_register_dispatcher.approve_land(land_id);

    // Get approved land and verify status
    let status_after = land_register_dispatcher.get_land_status(land_id);
    assert_eq!(status_after, LandStatus::Approved, "Should be approved after");
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_set_land_inspector() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 10, longitude: 20 };
    let area = 500;
    let land_use = 'Residential';

    // Register land
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Assign inspector to the land
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    // Verify that the inspector is correctly assigned
    let assigned_inspector = land_register_dispatcher.get_land_inspector(land_id);
    assert_eq!(
        assigned_inspector,
        inspector_address,
        "Inspector address should match the assigned address",
    );
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_inspector_lands() {
    let contract_address = deploy("LandRegistryContract");

    // Instance of LandRegistryContract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    // Set up test data
    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();
    let location = Location { latitude: 1, longitude: 2 };
    let area = 1000;
    let land_use = 'Residential';

    // Register land as owner
    start_cheat_caller_address(contract_address, owner_address);
    let land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Set inspector as owner address
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    let inspector_lands = land_register_dispatcher.inspector_lands(inspector_address);

    assert(inspector_lands.len() == 1, 'Wrong inspector land count');
}
