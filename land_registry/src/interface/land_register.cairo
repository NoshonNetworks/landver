use starknet::ContractAddress;
use land_registry::utils::utils::{create_land_id};

// Core data structures and interfaces for the Land Registry system

// Represents a land parcel with its properties and metadata
#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Land {
    owner: ContractAddress, // Address of the current land owner
    location: Location, // Geographic coordinates of the land
    area: u256, // Size of the land parcel
    land_use: LandUse, // Designated purpose/usage of the land
    status: LandStatus, // Current verification status
    last_transaction_timestamp: u64, // Timestamp of the most recent transaction
    inspector: ContractAddress, // Address of assigned inspector
    fee: u256, // land registration fee
}

// Represents the verification status of a land parcel
#[derive(Drop, Debug, Copy, Serde, Clone, starknet::Store, PartialEq)]
pub enum LandStatus {
    Pending, // Awaiting verification
    Approved, // Verified and approved
    Rejected, // Verification failed
}

// Geographic coordinates of a land parcel
#[derive(Drop, Copy, Serde, starknet::Store, PartialEq)]
pub struct Location {
    latitude: felt252, // Latitude coordinate
    longitude: felt252, // Longitude coordinate
}

// Classification of land usage types
#[derive(Debug, Drop, Copy, Serde, Clone, starknet::Store, PartialEq)]
pub enum LandUse {
    Residential, // Housing and living spaces
    Commercial, // Business and retail
    Industrial, // Manufacturing and production
    Agricultural, // Farming and cultivation
    Recreational, // Parks and leisure
    Institutional, // Schools, hospitals, government buildings
    MixedUse, // Combined purposes
    Unclassified, // Undefined usage
}

// Represents a land listing in the marketplace
#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Listing {
    land_id: u256,
    seller: ContractAddress,
    price: u256,
    status: ListingStatus,
    created_at: u64,
    updated_at: u64
}

#[derive(Drop, Debug, Copy, Serde, Clone, starknet::Store, PartialEq)]
pub enum ListingStatus {
    Active,
    Sold,
    Cancelled
}

#[starknet::interface]
pub trait ILandRegistry<TContractState> {
    fn register_land(
        ref self: TContractState, location: Location, area: u256, land_use: LandUse,
    ) -> u256;
    fn transfer_land(ref self: TContractState, land_id: u256, new_owner: ContractAddress);
    fn get_land(self: @TContractState, land_id: u256) -> Land;
    fn get_land_count(self: @TContractState) -> u256;
    fn get_lands_by_owner(self: @TContractState, owner: ContractAddress) -> Span<u256>;
    fn update_land(ref self: TContractState, land_id: u256, area: u256, land_use: LandUse);
    fn approve_land(ref self: TContractState, land_id: u256);
    fn reject_land(ref self: TContractState, land_id: u256);
    fn is_inspector(self: @TContractState, inspector: ContractAddress) -> bool;
    // fn add_inspector(ref self: TContractState, inspector: ContractAddress);
    // fn remove_inspector(ref self: TContractState, inspector: ContractAddress);
    fn is_land_approved(self: @TContractState, land_id: u256) -> bool;
    fn get_pending_approvals(self: @TContractState) -> Array<u256>;
    fn get_land_transaction_history(
        self: @TContractState, land_id: u256
    ) -> Array<(ContractAddress, u64)>;
    fn get_land_status(self: @TContractState, land_id: u256) -> LandStatus;

    fn set_land_inspector(ref self: TContractState, land_id: u256, inspector: ContractAddress);
    fn get_land_inspector(self: @TContractState, land_id: u256) -> ContractAddress;
    fn add_inspector(ref self: TContractState, inspector: ContractAddress);
    fn remove_inspector(ref self: TContractState, inspector: ContractAddress);
    fn set_fee(ref self: TContractState, fee: u256);
    fn get_fee(self: @TContractState) -> u256;

    // Marketplace function
    fn create_listing(ref self: TContractState, land_id: u256, price: u256) -> u256;
    fn cancel_listing(ref self: TContractState, listing_id: u256);
    fn update_listing_price(ref self: TContractState, listing_id: u256, new_price: u256);
    fn buy_land(ref self: TContractState, listing_id: u256);
    fn get_listing(self: @TContractState, listing_id: u256) -> Listing;
    fn get_active_listings(self: @TContractState) -> Array<u256>;
    fn get_listing_price_history(self: @TContractState, listing_id: u256) -> Array<(u256, u64)>;
}

// Events
#[derive(Drop, starknet::Event)]
pub struct LandRegistered {
    land_id: u256,
    owner: ContractAddress,
    location: Location,
    area: u256,
    land_use: Option<felt252>,
}

#[derive(Drop, starknet::Event)]
pub struct LandTransferred {
    land_id: u256,
    from_owner: ContractAddress,
    to_owner: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct LandVerified {
    land_id: u256,
}

#[derive(Drop, Copy, starknet::Event)]
pub struct LandUpdated {
    land_id: u256,
    land_use: Option<felt252>,
    area: u256
}

#[derive(Drop, Copy, starknet::Event)]
pub struct LandInspectorSet {
    land_id: u256,
    inspector: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct InspectorAdded {
    inspector: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct InspectorRemoved {
    inspector: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct FeeUpdated {
    old_fee: u256,
    new_fee: u256,
}

#[derive(Drop, starknet::Event)]
pub struct ListingCreated {
    listing_id: u256,
    land_id: u256,
    seller: ContractAddress,
    price: u256
}

#[derive(Drop, starknet::Event)]
pub struct ListingCancelled {
    listing_id: u256
}

#[derive(Drop, starknet::Event)]
pub struct ListingPriceUpdated {
    listing_id: u256,
    old_price: u256,
    new_price: u256
}

#[derive(Drop, starknet::Event)]
pub struct LandSold {
    listing_id: u256,
    land_id: u256,
    seller: ContractAddress,
    buyer: ContractAddress,
    price: u256
}
