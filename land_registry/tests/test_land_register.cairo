use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address};
use starknet::ContractAddress;

use land_registry::interface::{ILandRegistryDispatcher, ILandRegistryDispatcherTrait};


use land_registry::interface::LandUse;

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
    let location: felt252 = 'Test Location';
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
    assert(registered_land.is_approved == false, 'Should not be approved');
    assert(registered_land.inspector.is_none(), 'Should have no inspector');
}

