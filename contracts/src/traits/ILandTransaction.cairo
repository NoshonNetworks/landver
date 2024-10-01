use starknet::ContractAddress;

#[starknet::interface]
trait ILandInspector {
    fn recive_land_request(ref self: ContractState, land_id: u256);
    fn view_land(self: @ContractState, land_id: u256);
    fn approve_land_request(ref self: ContractState, land_id: u256);
    fn reject_land_request(ref self: ContractState, land_id: u256);
    fn delete_land_request(ref self: ContractState, land_id: u256);
}