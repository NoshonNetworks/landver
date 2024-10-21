// *************************************************************************
//                              Setup
// *************************************************************************
use starknet::{ContractAddress, contract_address_const};
use land_registry::interface::{
    ILandRegistryDispatcher, ILandRegistryDispatcherTrait, Land, LandUse
};
use land_registry::land_register::LandRegistryContract;
use land_registry::land_nft::{ILandNFTDispatcher, ILandNFTDispatcherTrait};

// Mock function contract deployment
fn deploy_land_registry() -> ILandRegistryDispatcher {
    let contract_address: ContractAddress = contract_address_const::<0x123>();
    let nft_address: ContractAddress = contract_address_const::<0x456>();
    ILandRegistryDispatcher { contract_address }
}

// Mock function NFT contract deployment
fn deploy_land_nft(land_registry: ContractAddress) -> ILandNFTDispatcher {
    let nft_address: ContractAddress = contract_address_const::<0x456>();
    ILandNFTDispatcher { contract_address: nft_address }
}

// Main test function
fn test_land_registry() {
    // Test register land
    let dispatcher = deploy_land_registry();
    let land_id = dispatcher.register_land(123, 1000, LandUse::Commercial);
    assert(land_id == 1, 'Incorrect land ID');

    let land = dispatcher.get_land(land_id);
    assert(land.location == 123, 'Incorrect location');
    assert(land.area == 1000, 'Incorrect area');
    assert(land.land_use == LandUse::Commercial, 'Incorrect land use');
    assert(!land.is_approved, 'Land not approved');

    // Test approve land
    dispatcher.add_inspector(starknet::get_caller_address());
    dispatcher.approve_land(land_id);
    let land = dispatcher.get_land(land_id);
    assert(land.is_approved, 'Land should be approved');

    // Test transfer land
    let new_owner = contract_address_const::<0x456>();
    dispatcher.transfer_land(land_id, new_owner);
    let land = dispatcher.get_land(land_id);
    assert(land.owner == new_owner, 'Land ownership not transferred');

    // Test register and approve land with NFT
    let land_registry = deploy_land_registry();
    let nft_contract = deploy_land_nft(land_registry.contract_address);
    let land_id = land_registry.register_land(456, 2000, LandUse::Residential);
    land_registry.add_inspector(starknet::get_caller_address());
    land_registry.approve_land(land_id);
    let land = land_registry.get_land(land_id);
    assert(land.is_approved, 'Land should be approved');

    // Test transfer land with NFT
    let new_owner = contract_address_const::<0x789>();
    land_registry.transfer_land(land_id, new_owner);
    let land = land_registry.get_land(land_id);
    assert(land.owner == new_owner, 'Land ownership not transferred');
}
