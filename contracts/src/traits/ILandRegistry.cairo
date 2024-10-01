#[starknet::interface]
trait ILandRegistry {
    fn verify_land(ref self: ContractState, land_id: u256, verifier: ContractAddress);
}