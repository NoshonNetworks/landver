use starknet::ContractAddress;
use openzeppelin::token::erc721::ERC721Component;
use openzeppelin::introspection::src5::SRC5Component;

#[starknet::interface]
pub trait ILandNFT<TContractState> {
    fn mint(ref self: TContractState, to: ContractAddress, token_id: u256);
    fn transfer(
        ref self: TContractState, from: ContractAddress, to: ContractAddress, token_id: u256
    );
}

#[starknet::contract]
pub mod LandNFT {
    use super::ILandNFT;
    use starknet::ContractAddress;
    use openzeppelin::token::erc721::{ERC721Component, ERC721Component::InternalTrait};
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721HooksEmptyImpl;


    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721CamelOnlyImpl = ERC721Component::ERC721CamelOnlyImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        land_registry: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
    }

    #[constructor]
    fn constructor(ref self: ContractState, land_registry: ContractAddress) {
        self.erc721.initializer("Land NFT", "LAND", format!(""));
        self.land_registry.write(land_registry);
    }

    #[abi(embed_v0)]
    impl LandNFTImpl of ILandNFT<ContractState> {
        fn mint(ref self: ContractState, to: ContractAddress, token_id: u256) {
            // Only the land registry contract can mint NFTs
            // assert(
            //     starknet::get_caller_address() == self.land_registry.read(),
            //     'Only land registry can mint'
            // );
            self.erc721.mint(to, token_id);
        }

        fn transfer(
            ref self: ContractState, from: ContractAddress, to: ContractAddress, token_id: u256
        ) {
            // Only the land registry contract can transfer NFTs
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                'Only land registry can transfer'
            );
            self.erc721.transfer(from, to, token_id);
        }
    }
}
