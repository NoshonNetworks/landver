use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address, start_cheat_block_timestamp, stop_cheat_block_timestamp,
    start_cheat_max_fee,
};
use starknet::ContractAddress;
use land_registry::interface::land_register::{
    ILandRegistryDispatcher, ILandRegistryDispatcherTrait
};
use land_registry::interface::land_register::{LandUse, Location, LandStatus, ListingStatus};

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
    let initial_fee_rate: u256 = 1;
    let land_registry_contract = declare(name).unwrap().contract_class();
    let mut call_data = ArrayTrait::<felt252>::new();
    nft_contract_class_hash.serialize(ref call_data);
    initial_fee_rate.serialize(ref call_data);
    let (contract_address, _) = land_registry_contract.deploy(@call_data).unwrap();
    contract_address
}


#[test]
fn test_create_listing() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    
    start_cheat_max_fee(contract_address, 10000000000000000000);

    let price: u256 = 1000;

    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();

    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u256 = 20000;
    let land_use = LandUse::Residential;

    // Register and get the land
    start_cheat_caller_address(contract_address, owner_address);
    let registered_land_id = land_register_dispatcher.register_land(location, area, land_use);

    // Set inspector as owner
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(registered_land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    //  Approve the land
    start_cheat_caller_address(contract_address, inspector_address);
    land_register_dispatcher.approve_land(registered_land_id);
    stop_cheat_caller_address(contract_address);

    // Create a listing in marketplace 
    start_cheat_caller_address(contract_address, owner_address);
    let listing_id = land_register_dispatcher
        .create_listing(registered_land_id, price);
    stop_cheat_caller_address(contract_address);

    // Retrieve the created listing
    let listing = land_register_dispatcher.get_listing(listing_id);

    // Verify the properties of the created listing
    assert(listing.land_id == registered_land_id, 'Wrong land listed'); // Check if land ID matches
    assert(listing.price == price, 'Wrong listing price'); 
    assert(listing.seller == owner_address, 'Wrong address of seller');
    match listing.status {
        ListingStatus::Active => {},
        _ => panic!("Must be Active"),
    }
    // assert(listing.created_at > 0, 'Create time not set');

}

#[test]
fn test_cancel_listing() {
    let contract_address = deploy("LandRegistryContract");
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    start_cheat_max_fee(contract_address, 10000000000000000000);

    let price: u256 = 1000;

    let owner_address = starknet::contract_address_const::<0x123>();
    let inspector_address = starknet::contract_address_const::<0x456>();

    let location: Location = Location { latitude: 1, longitude: 2 };
    let area: u256 = 20000;
    let land_use = LandUse::Residential;

    // Register and get the land
    start_cheat_caller_address(contract_address, owner_address);
    let registered_land_id = land_register_dispatcher.register_land(location, area, land_use);
    stop_cheat_caller_address(contract_address);

    // Set inspector as owner
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.set_land_inspector(registered_land_id, inspector_address);
    stop_cheat_caller_address(contract_address);

    //  Approve the land
    start_cheat_caller_address(contract_address, inspector_address);
    land_register_dispatcher.approve_land(registered_land_id);
    stop_cheat_caller_address(contract_address);

    // Create a listing in marketplace 
    start_cheat_caller_address(contract_address, owner_address);
    let listing_id = land_register_dispatcher
        .create_listing(registered_land_id, price);
    stop_cheat_caller_address(contract_address);

    // Retrieve the created listing
    let listing = land_register_dispatcher.get_listing(listing_id);

    // Verify that the listing is active 
    match listing.status {
        ListingStatus::Active => {},
        _ => panic!("Must be Active"),
    }

    // Cancel the listing
    start_cheat_caller_address(contract_address, owner_address);
    land_register_dispatcher.cancel_listing(listing_id); 
    stop_cheat_caller_address(contract_address);

    let cancelled_listing = land_register_dispatcher.get_listing(listing_id);

    // Verify that the listing is now cancelled
    match cancelled_listing.status {
        ListingStatus::Cancelled => {},
        _ => panic!("Must be Cancelled"),
    }

}




