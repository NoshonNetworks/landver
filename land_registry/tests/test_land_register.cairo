use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address, start_cheat_block_timestamp, stop_cheat_block_timestamp
};
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

#[test]
fn test_can_create_land_id() {
    let contract_address = deploy("LandRegistryContract");

    // Get an instance of the deployed Counter contract
    let land_register_dispatcher = ILandRegistryDispatcher { contract_address };

    // Set up test data
    let area: u256 = 1000;
    let land_use = LandUse::Residential;

    //Testcase 1
    start_cheat_caller_address(contract_address, 123.try_into().unwrap());
    start_cheat_block_timestamp(contract_address, 10);

    let id_1 = land_register_dispatcher.register_land('ABC', area, land_use);
    assert(
        id_1 == 1834956290592547505146755301616865612884178131756197740284375722154676772061,
        'land_id is not as expected (1)'
    );

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);

    //Testcase 2
    start_cheat_caller_address(contract_address, 456.try_into().unwrap());
    start_cheat_block_timestamp(contract_address, 20);

    let id_2 = land_register_dispatcher.register_land('JKL', area, land_use);
    assert(
        id_2 == 1787167357877672313141019654757764563488770727666136878743809661333652189710,
        'land_id is not as expected (2)'
    );

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);

    //Testcase 3
    start_cheat_caller_address(contract_address, 789.try_into().unwrap());
    start_cheat_block_timestamp(contract_address, 30);

    let id_3 = land_register_dispatcher.register_land('XYZ', area, land_use);
    assert(
        id_3 == 3320737153900052178546737093552069553460562050721261109286934583944424896980,
        'land_id is not as expected (3)'
    );

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);
}
