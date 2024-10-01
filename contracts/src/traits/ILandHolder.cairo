#[starknet::interface]
trait ILandHolder {
    fn get_registered_land(self: @ContractState, land_id: u256, document_hash: felt252) -> Option<LandRegistered>;
    fn get_all_registered_lands(self: @ContractState, owner: ContractAddress) -> Array<LandRegistered>;
    fn check_land_ownership(self: @ContractState, land_id: u256, owner: ContractAddress) -> bool;
    fn update_land_document(ref self: ContractState, land_id: u256, new_document_hash: felt252);
    fn remove_registered_land(ref self: ContractState, land_id: u256);
}