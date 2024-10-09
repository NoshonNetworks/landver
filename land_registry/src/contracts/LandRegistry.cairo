use core::starknet::ContractAddress;

#[starknet::interface]
trait ILandRegistry<TContractState> {
    fn register_land(
        ref self: TContractState,
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: LandRegistry::LandUse,
    ) -> u256;
    fn transfer_land(ref self: TContractState, land_id: u256, new_owner: ContractAddress);
    fn verify_land(ref self: TContractState, land_id: u256) -> LandRegistry::Land;
    fn get_owner_lands(self: @TContractState, owner: ContractAddress) -> Array<u256>;
    fn update_land(ref self: TContractState, owner: ContractAddress, land_id: u256) -> Land;
}

#[starknet::contract]
mod LandRegistry {
    use super::ILandRegistry;
    use core::array::ArrayTrait;
    use core::starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use core::starknet::storage::{
        Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess
    };

    #[storage]
    struct Storage {
        lands: Map<u256, Land>,
        owners: Map<ContractAddress, Array<u256>>,
    }

    #[derive(Drop, Serde, starknet::Store)]
    pub struct Land {
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: felt252,
        is_verified: bool,
        last_transaction_timestamp: u64,
    }

    enum LandUse {
        Residential,
        Commercial,
        Industrial,
        Recreational,
        Agricultural,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        LandRegistered: LandRegistered,
        LandTransferred: LandTransferred,
        LandVerified: LandVerified,
    }

    #[derive(Drop, starknet::Event)]
    struct LandRegistered {
        land_id: u256,
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct LandTransferred {
        land_id: u256,
        from_owner: ContractAddress,
        to_owner: ContractAddress,
    }

}