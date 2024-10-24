use starknet::{ContractAddress, contract_address_const};
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address};
use land_registry::interface::{
    ILandRegistryDispatcher, ILandRegistryDispatcherTrait, Land, LandUse
};
use land_registry::land_register::LandRegistryContract;
use land_registry::land_nft::{ILandNFTDispatcher, ILandNFTDispatcherTrait};
// fn deploy(name: ByteArray) -> ContractAddress {
// let nft_contract = declare("LandNFT").unwrap().contract_class();
// let (nft_address, _) = nft_contract.deploy(@array![Accounts::nft().into()]).unwrap();

// let land_registry_contract = declare(name).unwrap().contract_class();
// let constructor_args = array![nft_address.into(),];
// let (contract_address, _) = land_registry_contract.deploy(@constructor_args).unwrap();
// contract_address
// }


