use core::starknet::ContractAddress;
use super::ModelNFT::LandDetails;

#[starknet::interface]
trait ILandNFT<TContractState> {
    fn mint_land(
        ref self: TContractState,
        to: ContractAddress,
        token_id: u256,
        location: felt252,
        area: u256,
        land_use: felt252,
        document_hash: felt252
    );

    fn update_land_details(
        ref self: TContractState,
        token_id: u256,
        location: felt252,
        area: u256,
        land_use: felt252,
        is_verified: bool,
        document_hash: felt252
    );

    fn get_land_details(self: @TContractState, token_id: u256) -> LandDetails;

    // ERC721 functions
    fn balance_of(self: @TContractState, account: ContractAddress) -> u256;
    fn owner_of(self: @TContractState, token_id: u256) -> ContractAddress;
    fn transfer_from(ref self: TContractState, from: ContractAddress, to: ContractAddress, token_id: u256);
    fn approve(ref self: TContractState, to: ContractAddress, token_id: u256);
    fn get_approved(self: @TContractState, token_id: u256) -> ContractAddress;
    fn set_approval_for_all(ref self: TContractState, operator: ContractAddress, approved: bool);
    fn is_approved_for_all(self: @TContractState, owner: ContractAddress, operator: ContractAddress) -> bool;
}