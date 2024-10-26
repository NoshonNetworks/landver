use starknet::ContractAddress;
use land_registry::utils::utils::{create_land_id};

#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Land {
    owner: ContractAddress,
    location: Location,
    area: u256,
    land_use: LandUse,
    status: LandStatus,
    inspector: Option<ContractAddress>,
    last_transaction_timestamp: u64,
}

#[derive(Drop, Debug, Copy, Serde, Clone, starknet::Store, PartialEq)]
pub enum LandStatus {
    Pending,
    Approved,
    Rejected,
}

#[derive(Drop, Copy, Serde, starknet::Store, PartialEq)]
pub struct Location {
    latitude: felt252,
    longitude: felt252,
}

#[derive(Debug, Drop, Copy, Serde, Clone, starknet::Store, PartialEq)]
pub enum LandUse {
    Residential,
    Commercial,
    Industrial,
    Agricultural,
    Recreational,
    Institutional,
    MixedUse,
    Unclassified,
}


#[starknet::interface]
pub trait ILandRegistry<TContractState> {
    fn register_land(
        ref self: TContractState, location: Location, area: u256, land_use: LandUse,
    ) -> u256;
    fn set_land_inspector(ref self: TContractState, land_id: u256, inspector: ContractAddress);
    fn get_land_inspector(self: @TContractState, land_id: u256) -> Option<ContractAddress>;
    fn transfer_land(ref self: TContractState, land_id: u256, new_owner: ContractAddress);
    fn get_land(self: @TContractState, land_id: u256) -> Land;
    fn get_land_count(self: @TContractState) -> u256;
    fn get_lands_by_owner(self: @TContractState, owner: ContractAddress) -> Span<u256>;
    fn update_land(ref self: TContractState, land_id: u256, area: u256, land_use: LandUse);
    fn approve_land(ref self: TContractState, land_id: u256);
    fn reject_land(ref self: TContractState, land_id: u256);
    fn is_inspector(self: @TContractState, inspector: ContractAddress) -> bool;
    fn add_inspector(ref self: TContractState, inspector: ContractAddress);
    fn remove_inspector(ref self: TContractState, inspector: ContractAddress);
    fn get_land_status(self: @TContractState, land_id: u256) -> LandStatus;
}
