use starknet::ContractAddress;

// Interface for Land NFT operations
#[starknet::interface]
pub trait ILandNFT<TContractState> {
    fn upgrade(
        ref self: TContractState, new_class_hash: starknet::class_hash::ClassHash,
    ); // upgrade the contract class
    // Mints a new NFT representing a land parcel
    fn mint(ref self: TContractState, to: ContractAddress, token_id: u64);

    // Transfers ownership of a land NFT
    fn transfer(
        ref self: TContractState, from: ContractAddress, to: ContractAddress, token_id: u64,
    );

    // Updates the base URI for NFT metadata
    fn set_base_uri(ref self: TContractState, new_base_uri: ByteArray, updater: ContractAddress);
}

// Events
#[derive(Drop, starknet::Event)]
pub struct BaseURIUpdated {
    pub caller: ContractAddress,
    pub new_base_uri: ByteArray,
}

#[derive(Drop, starknet::Event)]
pub struct Locked {
    pub token_id: u64,
}

#[derive(Drop, starknet::Event)]
pub struct Unlocked {
    pub token_id: u64,
}
