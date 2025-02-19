use starknet::ContractAddress;
// use land_registry::utils::utils::{create_land_id};

// Core data structures and interfaces for the Land Registry system

// Represents a land parcel with its properties and metadata
#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Land {
    pub land_id: u64, // Land id
    pub owner: ContractAddress, // Address of the current land owner
    pub location: Location, // Geographic coordinates of the land
    pub area: u64, // Size of the land parcel
    pub land_use: felt252, // Designated purpose/usage of the land
    pub status: LandStatus, // Current verification status
    pub last_transaction_timestamp: u64, // Timestamp of the most recent transaction
    pub inspector: ContractAddress // Address of assigned inspector
}

// Represents the verification status of a land parcel
#[derive(Drop, Debug, Copy, Serde, Clone, starknet::Store, PartialEq)]
#[allow(starknet::store_no_default_variant)]
pub enum LandStatus {
    Pending, // Awaiting verification
    Approved, // Verified and approved
    Rejected // Verification failed
}

// Geographic coordinates of a land parcel
#[derive(Drop, Copy, Serde, starknet::Store, PartialEq)]
pub struct Location {
    pub latitude: felt252, // Latitude coordinate
    pub longitude: felt252 // Longitude coordinate
}
// Represents a land listing in the marketplace
#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Listing {
    pub land_id: u64,
    pub seller: ContractAddress,
    pub price: u128,
    pub status: ListingStatus,
    pub created_at: u64,
    pub updated_at: u64,
}

#[derive(Drop, Debug, Copy, Serde, Clone, starknet::Store, PartialEq)]
#[allow(starknet::store_no_default_variant)]
pub enum ListingStatus {
    Active,
    Sold,
    Cancelled,
}

#[starknet::interface]
pub trait ILandRegistry<TContractState> {
    fn upgrade(
        ref self: TContractState, new_class_hash: starknet::class_hash::ClassHash,
    ); // // upgrade the contract class
    fn register_land(
        ref self: TContractState, location: Location, area: u64, land_use: felt252,
    ) -> u64;
    fn transfer_land(ref self: TContractState, land_id: u64, new_owner: ContractAddress);
    fn get_land(self: @TContractState, land_id: u64) -> Land;
    fn get_land_count(self: @TContractState) -> u64;
    fn get_lands_by_owner(self: @TContractState, owner: ContractAddress) -> Span<u64>;
    fn get_all_lands(self: @TContractState) -> Span<Land>;
    fn update_land(
        ref self: TContractState,
        land_id: u64,
        area: u64,
        land_use: felt252,
        land_status: LandStatus,
    );
    fn approve_land(ref self: TContractState, land_id: u64);
    fn reject_land(ref self: TContractState, land_id: u64);
    fn is_inspector(self: @TContractState, inspector: ContractAddress) -> bool;
    // fn add_inspector(ref self: TContractState, inspector: ContractAddress);
    // fn remove_inspector(ref self: TContractState, inspector: ContractAddress);
    fn is_land_approved(self: @TContractState, land_id: u64) -> bool;
    fn get_pending_approvals(self: @TContractState) -> Array<u64>;
    fn get_land_transaction_history(
        self: @TContractState, land_id: u64,
    ) -> Array<(ContractAddress, u64)>;
    fn get_land_status(self: @TContractState, land_id: u64) -> LandStatus;

    fn set_land_inspector(ref self: TContractState, land_id: u64, inspector: ContractAddress);
    fn get_land_inspector(self: @TContractState, land_id: u64) -> ContractAddress;
    fn add_inspector(ref self: TContractState, inspector: ContractAddress);
    fn remove_inspector(ref self: TContractState, inspector: ContractAddress);
    fn get_all_inspectors(self: @TContractState) -> Array<ContractAddress>;
    fn inspector_lands(self: @TContractState, inspector: ContractAddress) -> Array<Land>;

    fn get_user_type(self: @TContractState, userAddress: ContractAddress) -> felt252;


    // Marketplace function
    fn create_listing(ref self: TContractState, land_id: u64, price: u128) -> u64;
    fn cancel_listing(ref self: TContractState, listing_id: u64);
    fn update_listing_price(ref self: TContractState, listing_id: u64, new_price: u128);
    fn buy_land(ref self: TContractState, listing_id: u64);
    fn get_listing(self: @TContractState, listing_id: u64) -> Listing;
    fn get_active_listings(self: @TContractState) -> Array<u64>;
    // fn get_listing_price_history(self: @TContractState, listing_id: u64) -> Array<(u128, u64)>;
}

// Events
#[derive(Drop, starknet::Event)]
pub struct LandRegistered {
    pub land_id: u64,
    pub owner: ContractAddress,
    pub location: Location,
    pub area: u64,
    pub land_use: Option<felt252>,
}

#[derive(Drop, starknet::Event)]
pub struct LandTransferred {
    pub land_id: u64,
    pub from_owner: ContractAddress,
    pub to_owner: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct LandVerified {
    pub land_id: u64,
}

#[derive(Drop, Copy, starknet::Event)]
pub struct LandUpdated {
    pub land_id: u64,
    pub land_use: Option<felt252>,
    pub area: u64,
    pub status: LandStatus,
}


#[derive(Drop, Copy, starknet::Event)]
pub struct LandInspectorSet {
    pub land_id: u64,
    pub inspector: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct InspectorAdded {
    pub inspector: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct InspectorRemoved {
    pub inspector: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct ListingCreated {
    pub listing_id: u64,
    pub land_id: u64,
    pub seller: ContractAddress,
    pub price: u128,
}

#[derive(Drop, starknet::Event)]
pub struct ListingCancelled {
    pub listing_id: u64,
}

#[derive(Drop, starknet::Event)]
pub struct ListingPriceUpdated {
    pub listing_id: u64,
    pub old_price: u128,
    pub new_price: u128,
}

#[derive(Drop, starknet::Event)]
pub struct LandSold {
    pub listing_id: u64,
    pub land_id: u64,
    pub seller: ContractAddress,
    pub buyer: ContractAddress,
    pub price: u128,
}
