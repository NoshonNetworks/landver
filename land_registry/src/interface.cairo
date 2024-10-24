use starknet::ContractAddress;

#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Land {
    owner: ContractAddress,
    location: felt252,
    area: u256,
    land_use: LandUse,
    is_approved: bool,
    inspector: Option<ContractAddress>,
    last_transaction_timestamp: u64,
    sub_category: felt252,
    zoning_restrictions: felt252,
}

#[derive(Debug, Drop, Copy, Clone, Serde, starknet::Store, PartialEq)]
pub enum LandUse {
    // Residential categories
    ResidentialSingleFamily,
    ResidentialMultiFamily,
    ResidentialMixedUse,
    
    // Commercial categories
    CommercialRetail,
    CommercialOffice,
    CommercialHospitality,
    
    // Industrial categories
    IndustrialManufacturing,
    IndustrialWarehouse,
    IndustrialResearch,
    
    // Agricultural categories
    AgriculturalCrops,
    AgriculturalLivestock,
    AgriculturalForestry,
    
    // Additional categories
    Recreational,
    Institutional,
    Conservation,
    Mixed,
}


impl LandUseIntoFelt252 of Into<LandUse, felt252> {
    fn into(self: LandUse) -> felt252 {
        match self {
            // Residential (100-199 range)
            LandUse::ResidentialSingleFamily => 101,
            LandUse::ResidentialMultiFamily => 102,
            LandUse::ResidentialMixedUse => 103,
            
            // Commercial (200-299 range)
            LandUse::CommercialRetail => 201,
            LandUse::CommercialOffice => 202,
            LandUse::CommercialHospitality => 203,
            
            // Industrial (300-399 range)
            LandUse::IndustrialManufacturing => 301,
            LandUse::IndustrialWarehouse => 302,
            LandUse::IndustrialResearch => 303,
            
            // Agricultural (400-499 range)
            LandUse::AgriculturalCrops => 401,
            LandUse::AgriculturalLivestock => 402,
            LandUse::AgriculturalForestry => 403,
            
            // Additional categories (500+)
            LandUse::Recreational => 501,
            LandUse::Institutional => 502,
            LandUse::Conservation => 503,
            LandUse::Mixed => 504,
        }
    }
}

#[starknet::interface]
pub trait ILandRegistry<TContractState> {
    fn register_land(
        ref self: TContractState, 
        location: felt252, 
        area: u256, 
        land_use: LandUse,
    ) -> u256;
    
    fn transfer_land(
        ref self: TContractState, 
        land_id: u256, 
        new_owner: ContractAddress
    );
    
    fn get_land(self: @TContractState, land_id: u256) -> Land;
    
    fn update_land(
        ref self: TContractState, 
        land_id: u256, 
        area: u256, 
        land_use: LandUse
    );
    
    fn approve_land(ref self: TContractState, land_id: u256);
    fn reject_land(ref self: TContractState, land_id: u256);
    fn is_inspector(self: @TContractState, address: ContractAddress) -> bool;
    fn add_inspector(ref self: TContractState, inspector: ContractAddress);
    fn remove_inspector(ref self: TContractState, inspector: ContractAddress);
}

