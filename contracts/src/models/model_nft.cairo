#[starknet::contract]
mod  ModelNFT {

#[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721::Storage,
        land_details: LegacyMap<u256, LandDetails>,
        land_registry: ContractAddress,
    }
    
    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct LandDetails {
        location: felt252,
        area: u256,
        land_use: felt252,
        is_verified: bool,
        document_hash: felt252,
    }
    
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        LandMinted: LandMinted,
        LandDetailsUpdated: LandDetailsUpdated,
    }

    #[derive(Drop, starknet::Event)]
    struct LandMinted {
        token_id: u256,
        owner: ContractAddress,
    }
    
    #[derive(Drop, starknet::Event)]
    struct LandDetailsUpdated {
        token_id: u256,
        location: felt252,
        area: u256,
        land_use: felt252,
        is_verified: bool,
        document_hash: felt252,
    }
    
}



