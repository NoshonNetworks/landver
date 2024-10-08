use core::starknet::ContractAddress;

#[starknet::interface]
pub trait ILandInspector {
    fn recive_land_request(ref self: ContractState, land_id: u256);
    fn view_land(self: @ContractState, land_id: u256);
    fn approve_land_request(ref self: ContractState, land_id: u256);
    fn reject_land_request(ref self: ContractState, land_id: u256);
    fn delete_land_request(ref self: ContractState, land_id: u256);
}

#[starknet::interface]
pub trait ILandTransaction {
    fn create_transaction(ref self: ContractState, land_id: u256, from_owner: ContractAddress, to_owner: ContractAddress, transaction_type: u8) -> u256;
    fn get_transaction(self: @ContractState, transaction_id: u256);
    fn get_all_transactions(self: @ContractState);
    fn get_transactions_by_land_id(self: @ContractState, land_id: u256);
    fn get_transactions_by_owner(self: @ContractState, owner: ContractAddress);
    fn get_transactions_by_type(self: @ContractState, transaction_type: u8);
}
