use starknet::ContractAddress;
use starknet::testing::{set_caller_address, set_contract_address};
use land_registry::contracts::LandRegistry::{LandRegistry, ILandRegistryDispatcher, ILandRegistryDispatcherTrait};
use land_registry::contracts::LandNFT::{LandNFT, ILandNFTDispatcher, ILandNFTDispatcherTrait};

// Helper function to deploy contracts
fn deploy_contracts() -> (ILandRegistryDispatcher, ILandNFTDispatcher) {
    // Deploy LandNFT
    let land_nft = LandNFT::constructor(
        'LandNFT',
        'LNFT',
        starknet::contract_address_const::<0x1>()
    );
    let land_nft_address = land_nft.contract_address;

    // Deploy LandRegistry
    let land_registry = LandRegistry::constructor(
        starknet::contract_address_const::<0x2>(),
        land_nft_address
    );
    let land_registry_address = land_registry.contract_address;

    // Update LandNFT's land_registry
    land_nft.set_land_registry(land_registry_address);

    (
        ILandRegistryDispatcher { contract_address: land_registry_address },
        ILandNFTDispatcher { contract_address: land_nft_address }
    )
}

#[test]
fn test_register_land() {
    let (land_registry, land_nft) = deploy_contracts();

    // Set caller as the land registry contract
    set_caller_address(land_registry.contract_address);

    let owner = starknet::contract_address_const::<0x3>();
    let location = 'New York';
    let area = 1000;
    let land_use = 'Residential';
    let document_hash = 'QmHash123';

    let land_id = land_registry.register_land(owner, location, area, land_use, document_hash);

    assert(land_id == 1, 'Invalid land ID');

    let land_details = land_nft.get_land_details(land_id);
    assert(land_details.location == location, 'Invalid location');
    assert(land_details.area == area, 'Invalid area');
    assert(land_details.land_use == land_use, 'Invalid land use');
    assert(land_details.document_hash == document_hash, 'Invalid document hash');
    assert(!land_details.is_verified, 'Land should not be verified');
}

#[test]
fn test_transfer_land() {
    let (land_registry, land_nft) = deploy_contracts();

    // Register land
    set_caller_address(land_registry.contract_address);
    let original_owner = starknet::contract_address_const::<0x3>();
    let land_id = land_registry.register_land(original_owner, 'New York', 1000, 'Residential', 'QmHash123');

    // Transfer land
    let new_owner = starknet::contract_address_const::<0x4>();
    set_caller_address(original_owner);
    land_registry.transfer_land(land_id, new_owner);

    // Check new owner
    assert(land_nft.owner_of(land_id) == new_owner, 'Land transfer failed');
}

#[test]
fn test_verify_land() {
    let (land_registry, land_nft) = deploy_contracts();

    // Register land
    set_caller_address(land_registry.contract_address);
    let owner = starknet::contract_address_const::<0x3>();
    let land_id = land_registry.register_land(owner, 'New York', 1000, 'Residential', 'QmHash123');

    // Verify land
    let verifier = starknet::contract_address_const::<0x2>();
    set_caller_address(verifier);
    land_registry.verify_land(land_id, verifier);

    // Check verification status
    let land_details = land_nft.get_land_details(land_id);
    assert(land_details.is_verified, 'Land should be verified');
}

#[test]
fn test_get_owner_lands() {
    let (land_registry, land_nft) = deploy_contracts();

    // Register multiple lands for the same owner
    set_caller_address(land_registry.contract_address);
    let owner = starknet::contract_address_const::<0x3>();
    let land_id1 = land_registry.register_land(owner, 'New York', 1000, 'Residential', 'QmHash123');
    let land_id2 = land_registry.register_land(owner, 'Los Angeles', 1500, 'Commercial', 'QmHash456');

    // Get owner lands
    let owner_lands = land_registry.get_owner_lands(owner);

    assert(owner_lands.len() == 2, 'Invalid number of owner lands');
    assert(*owner_lands.at(0) == land_id1, 'Invalid land ID 1');
    assert(*owner_lands.at(1) == land_id2, 'Invalid land ID 2');
}