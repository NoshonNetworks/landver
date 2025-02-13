use snforge_std::{
    declare, ContractClassTrait, spy_events, CheatTarget, start_prank, stop_prank,
    start_warp, stop_warp, get_class_hash, test_address, spy_events_as_array
};
use starknet::{ContractAddress, contract_address_const};
use land_registry::interface::land_register::{
    ILandRegistryDispatcher, ILandRegistryDispatcherTrait, Location, LandUse, Land, LandStatus
};

// Test Constants
const INITIAL_BALANCE: u256 = 1000000000000000000000;
const LAND_AREA: u256 = 1000;
const LAND_PRICE: u256 = 100000000000000000;

fn setup_test() -> (ILandRegistryDispatcher, ContractAddress) {
    // Deploy contracts
    let contract = declare("LandRegistryContract");
    let contract_address = contract.deploy(@array![]).unwrap();
    
    let dispatcher = ILandRegistryDispatcher { contract_address };
    let owner = contract_address_const::<'OWNER'>();
    
    (dispatcher, owner)
}

#[test]
fn test_gas_register_land() {
    let (dispatcher, owner) = setup_test();
    start_prank(CheatTarget::One(dispatcher.contract_address), owner);
    
    // Measure gas for land registration
    let location = Location { latitude: 123, longitude: 456 };
    let initial_gas = starknet::get_gas();
    
    dispatcher.register_land(location, LAND_AREA, LandUse::Residential);
    
    let gas_used = starknet::get_gas() - initial_gas;
    assert(gas_used < 100000, 'Gas usage too high'); // Adjust threshold as needed
    
    stop_prank(CheatTarget::One(dispatcher.contract_address));
}

#[test]
fn test_gas_bulk_operations() {
    let (dispatcher, owner) = setup_test();
    start_prank(CheatTarget::One(dispatcher.contract_address), owner);
    
    // Test gas usage for multiple operations
    let location = Location { latitude: 123, longitude: 456 };
    let initial_gas = starknet::get_gas();
    
    // Register multiple lands
    let mut i: u8 = 0;
    while i < 5 {
        dispatcher.register_land(location, LAND_AREA, LandUse::Residential);
        i += 1;
    }
    
    let avg_gas = (starknet::get_gas() - initial_gas) / 5;
    assert(avg_gas < 120000, 'Average gas too high'); // Adjust threshold
    
    stop_prank(CheatTarget::One(dispatcher.contract_address));
}

#[test]
fn test_gas_marketplace_operations() {
    let (dispatcher, owner) = setup_test();
    start_prank(CheatTarget::One(dispatcher.contract_address), owner);
    
    // Setup: Register and approve land
    let location = Location { latitude: 123, longitude: 456 };
    let land_id = dispatcher.register_land(location, LAND_AREA, LandUse::Residential);
    dispatcher.approve_land(land_id);
    
    // Measure listing creation gas
    let initial_gas = starknet::get_gas();
    let listing_id = dispatcher.create_listing(land_id, LAND_PRICE);
    let listing_gas = starknet::get_gas() - initial_gas;
    
    assert(listing_gas < 150000, 'Listing gas too high');
    
    stop_prank(CheatTarget::One(dispatcher.contract_address));
} 