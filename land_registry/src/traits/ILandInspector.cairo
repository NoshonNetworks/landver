use starknet::ContractAddress;

#[starknet::interface]
trait ILandInspector {
    fn receive_land_request(ref self: ContractState, land_id: u256);
    fn view_land(self: @ContractState, land_id: u256) -> LandDetails;
    fn approve_land_request(ref self: ContractState, land_id: u256);
    fn reject_land_request(ref self: ContractState, land_id: u256, reason: felt252);
    fn delete_land_request(ref self: TContractState, land_id: u256);
    fn get_pending_requests(self: @ContractState) -> Array<u256>;
    fn is_inspector(self: @ContractState, address: ContractAddress) -> bool;
}

