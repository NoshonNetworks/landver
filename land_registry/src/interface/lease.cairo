use starknet::ContractAddress;

#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Lease {
    pub lease_id: u256,
    pub land_id: u256,
    pub lessor: ContractAddress,  // Property owner
    pub lessee: ContractAddress,  // Tenant
    pub start_date: u64,
    pub end_date: u64,
    pub rent_amount: u256,
    pub status: LeaseStatus,
    pub terms_hash: felt252,  // Hash of lease terms stored in IPFS/Arweave
    pub last_updated: u64
}

#[derive(Drop, Debug, Copy, Serde, Clone, starknet::Store, PartialEq)]
pub enum LeaseStatus {
    Draft,
    Active,
    Terminated,
    Expired
}

#[starknet::interface]
pub trait ILeaseManager<TContractState> {
    // Create a new lease agreement
    fn create_lease(
        ref self: TContractState, 
        land_id: u256,
        lessee: ContractAddress,
        start_date: u64,
        end_date: u64,
        rent_amount: u256,
        terms_hash: felt252
    ) -> u256;

    // Sign the lease (both parties must sign)
    fn sign_lease(ref self: TContractState, lease_id: u256);

    // Terminate lease before end date
    fn terminate_lease(ref self: TContractState, lease_id: u256);

    // Update lease terms
    fn update_lease_terms(
        ref self: TContractState, 
        lease_id: u256, 
        new_terms_hash: felt252
    );

    // Get lease details
    fn get_lease(self: @TContractState, lease_id: u256) -> Lease;

    // Get all leases for a land parcel
    fn get_land_leases(self: @TContractState, land_id: u256) -> Array<Lease>;

    // Get all leases for a lessee
    fn get_lessee_leases(self: @TContractState, lessee: ContractAddress) -> Array<Lease>;

    // Verify lease authenticity
    fn verify_lease(self: @TContractState, lease_id: u256, terms_hash: felt252) -> bool;
}

// Events
#[derive(Drop, starknet::Event)]
pub struct LeaseCreated {
    pub lease_id: u256,
    pub land_id: u256,
    pub lessor: ContractAddress,
    pub lessee: ContractAddress
}

#[derive(Drop, starknet::Event)]
pub struct LeaseSigned {
    pub lease_id: u256,
    pub signer: ContractAddress
}

#[derive(Drop, starknet::Event)]
pub struct LeaseTerminated {
    pub lease_id: u256,
    pub termination_date: u64
}

#[derive(Drop, starknet::Event)]
pub struct LeaseTermsUpdated {
    pub lease_id: u256,
    pub new_terms_hash: felt252
} 