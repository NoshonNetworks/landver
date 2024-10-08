use core::starknet::ContractAddress;
#[starknet::interface]
trait ILandRegistry<TContractState> {
    fn verify_land(self: @TContractState, land_id: u256, verifier: ContractAddress);
    fn register_land(
        ref self: TContractState, land_id: u256, owner: ContractAddress
    ) -> LandDetails;
}
