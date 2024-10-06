use core::starknet::ContractAddress;
use openzeppelin::token::erc721::ERC721;
use models::ModelNFT;
use openzeppelin::introspection::src5::SRC5Component;
use openzeppelin::token::erc721::{ERC721Component, ERC721HooksEmptyImpl};

#[starknet::interface]
trait ILandNFT<ContractState> {
    fn mint_land(
        ref self: ContractState,
        to: ContractAddress,
        token_id: u256,
        location: felt252,
        area: u256,
        land_use: felt252,
        document_hash: felt252
    );

    fn update_land_details(
        ref self: ContractState,
        token_id: u256,
        location: felt252,
        area: u256,
        land_use: felt252,
        is_verified: bool,
        document_hash: felt252
    );

    fn get_land_details(self: @ContractState, token_id: u256) -> LandDetails;
}

