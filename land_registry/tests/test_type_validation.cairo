use snforge_std::{declare, ContractClassTrait, spy_events, CheatTarget, start_prank, stop_prank};
use starknet::{ContractAddress, contract_address_const};
use land_registry::interface::land_register::{
    ILandRegistryDispatcher, ILandRegistryDispatcherTrait, Location, LandUse, Land, LandStatus
};

#[test]
fn test_location_bounds() {
    let (dispatcher, owner) = setup_test();
    start_prank(CheatTarget::One(dispatcher.contract_address), owner);
    
    // Test extreme latitude values
    let invalid_location = Location { 
        latitude: 91, // Invalid: latitude should be -90 to 90
        longitude: 0 
    };
    
    // This should panic
    let result = dispatcher.register_land(invalid_location, LAND_AREA, LandUse::Residential);
    assert(result.is_err(), 'Should fail with invalid latitude');
    
    stop_prank(CheatTarget::One(dispatcher.contract_address));
}

#[test]
fn test_area_validation() {
    let (dispatcher, owner) = setup_test();
    start_prank(CheatTarget::One(dispatcher.contract_address), owner);
    
    let location = Location { latitude: 45, longitude: 45 };
    
    // Test zero area
    let result = dispatcher.register_land(location, 0, LandUse::Residential);
    assert(result.is_err(), 'Should fail with zero area');
    
    // Test maximum area
    let max_area: u256 = 0xffffffffffffffffffffffffffffffff; // Adjust based on realistic limits
    let result = dispatcher.register_land(location, max_area, LandUse::Residential);
    assert(result.is_err(), 'Should fail with excessive area');
    
    stop_prank(CheatTarget::One(dispatcher.contract_address));
}

#[test]
fn test_price_validation() {
    let (dispatcher, owner) = setup_test();
    start_prank(CheatTarget::One(dispatcher.contract_address), owner);
    
    // Setup: Register and approve land
    let location = Location { latitude: 45, longitude: 45 };
    let land_id = dispatcher.register_land(location, LAND_AREA, LandUse::Residential);
    dispatcher.approve_land(land_id);
    
    // Test zero price
    let result = dispatcher.create_listing(land_id, 0);
    assert(result.is_err(), 'Should fail with zero price');
    
    // Test maximum price
    let max_price: u256 = 0xffffffffffffffffffffffffffffffff; // Adjust based on realistic limits
    let result = dispatcher.create_listing(land_id, max_price);
    assert(result.is_err(), 'Should fail with excessive price');
    
    stop_prank(CheatTarget::One(dispatcher.contract_address));
} 