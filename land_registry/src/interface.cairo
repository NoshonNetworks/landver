use starknet::ContractAddress;

#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Land {
    owner: ContractAddress,
    location: felt252,
    area: u256,
    land_use: LandUse,
    last_transaction_timestamp: u64,
}

struct LandApprovalDetails {
    ApprovedBy: felt252,
    Agency: felt252,
    land: Land,
    land_id: u256,
    timestamp: u64,
}

#[derive(Debug, Drop, Copy, Clone, Serde, starknet::Store, PartialEq)]
pub enum LandUse {
    Residential,
    Commercial,
    Industrial,
    Agricultural,
}

impl LandUseIntoFelt252 of Into<LandUse, felt252> {
    fn into(self: LandUse) -> felt252 {
        match self {
            LandUse::Residential => 1,
            LandUse::Commercial => 2,
            LandUse::Industrial => 3,
            LandUse::Agricultural => 4,
        }
    }
}

#[starknet::interface]
pub trait ILandRegistry<TContractState> {
    fn register_land(
        ref self: TContractState, location: felt252, area: u256, land_use: LandUse,
    ) -> u256;
    fn transfer_land(ref self: TContractState, land_id: u256, new_owner: ContractAddress);
    fn get_land(self: @TContractState, land_id: u256) -> Land;
    //fn get_owner_lands(self: @TContractState, owner_lands: ContractAddress) -> Array<u256>;
    //fn get_lands(self: @TContractState, owner: ContractAddress, location: felt252, land_use:
    //felt252) -> Array<u256>;

    fn update_land(ref self: TContractState, land_id: u256, area: u256, land_use: LandUse);
    // fn get_approved_lands

    //fn approve_land
//fn reject_land
}
