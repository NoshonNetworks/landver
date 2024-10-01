use starknet::ContractAddress;
use openzeppelin::token::erc721::ERC721;
use models::ModelNFT;
use openzeppelin::introspection::src5::SRC5Component;
use openzeppelin::token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
use starknet::ContractAddress;

#[starknet::contract]
mod LandNFT {
    use super::ContractAddress;
    use super::ERC721;
    use super::ModelNFT::{LandDetails, Event};

    #[constructor]
    fn constructor(ref self: ContractState, name: felt252, symbol: felt252, land_registry: ContractAddress) {
        self.erc721.initializer(name, symbol);
        self.land_registry.write(land_registry);
    }

    #[external(v0)]
    fn mint_land(
        ref self: ContractState,
        to: ContractAddress,
        token_id: u256,
        location: felt252,
        area: u256,
        land_use: felt252,
        document_hash: felt252
    ) {
        assert(get_caller_address() == self.land_registry.read(), 'Only LandRegistry can mint');

        self.erc721._mint(to, token_id);
        
        let land_details = LandDetails {
            location: location,
            area: area,
            land_use: land_use,
            is_verified: false,
            document_hash: document_hash,
        };
        self.land_details.write(token_id, land_details);

        self.emit(Event::LandMinted(LandMinted { token_id: token_id, owner: to }));
        self.emit(Event::LandDetailsUpdated(LandDetailsUpdated {
            token_id: token_id,
            location: location,
            area: area,
            land_use: land_use,
            is_verified: false,
            document_hash: document_hash,
        }));
    }

    #[external(v0)]
    fn update_land_details(
        ref self: ContractState,
        token_id: u256,
        location: felt252,
        area: u256,
        land_use: felt252,
        is_verified: bool,
        document_hash: felt252
    ) {
        assert(get_caller_address() == self.land_registry.read(), 'Only LandRegistry can update');

        let land_details = LandDetails {
            location: location,
            area: area,
            land_use: land_use,
            is_verified: is_verified,
            document_hash: document_hash,
        };
        self.land_details.write(token_id, land_details);

        self.emit(Event::LandDetailsUpdated(LandDetailsUpdated {
            token_id: token_id,
            location: location,
            area: area,
            land_use: land_use,
            is_verified: is_verified,
            document_hash: document_hash,
        }));
    }

    #[external(v0)]
    fn get_land_details(self: @ContractState, token_id: u256) -> LandDetails {
        self.land_details.read(token_id)
    }

    // Implement
}