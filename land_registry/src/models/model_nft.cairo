mod ModelNFT {
    use openzeppelin::token::erc721::ERC721;
    use openzeppelin::utils::legacy_map::LegacyMap;
    use openzeppelin::utils::contract_address::ContractAddress;
    use openzeppelin::utils::felt252::felt252;
    use openzeppelin::utils::u256::u256;
    use core::starknet::ContractAddress;

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

