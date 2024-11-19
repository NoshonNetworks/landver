use starknet::ContractAddress;

// Interface for Land NFT operations
#[starknet::interface]
pub trait ILandNFT<TContractState> {
    fn upgrade(
        ref self: TContractState, new_class_hash: starknet::class_hash::ClassHash
    ); // upgrade the contract class
    // Mints a new NFT representing a land parcel
    fn mint(ref self: TContractState, to: ContractAddress, token_id: u256);

    // Transfers ownership of a land NFT
    fn transfer(
        ref self: TContractState, from: ContractAddress, to: ContractAddress, token_id: u256
    );

    // Updates the base URI for NFT metadata
    fn set_base_uri(ref self: TContractState, new_base_uri: ByteArray, updater: ContractAddress);

    // Locks a land NFT to prevent transfers
    fn lock(ref self: TContractState, token_id: u256);

    // Unlocks a previously locked land NFT
    fn unlock(ref self: TContractState, token_id: u256);

    // Checks if a land NFT is currently locked
    fn is_locked(self: @TContractState, token_id: u256) -> bool;
}

// Events
#[derive(Drop, starknet::Event)]
struct BaseURIUpdated {
    caller: ContractAddress,
    new_base_uri: ByteArray
}

#[derive(Drop, starknet::Event)]
pub struct Locked {
    token_id: u256
}

#[derive(Drop, starknet::Event)]
pub struct Unlocked {
    token_id: u256
}
