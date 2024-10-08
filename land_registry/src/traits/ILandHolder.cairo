use core::starknet::ContractAddress;
#[starknet::interface]
pub trait ILandHolder<TContractState> {
    fn get_registered_land(
        self: @TContractState, land_id: u256, contract_address: ContractAddress
    ) -> Option<LandRegistered>;


    fn get_all_registered_lands(
        self: @TContractState, owner_address: Address
    ) -> Array<LandRegistered>;

    fn check_land_ownership(
        self: @TContractState, land_id: u256, contract_address: ContractAddress
    ) -> bool;
    fn update_land_document(
        ref self: TContractState, land_id: u256, contract_address: ContractAddress
    );
    fn remove_registered_land(
        ref self: TContractState, land_id: u256, contract_address: ContractAddress
    );
}
