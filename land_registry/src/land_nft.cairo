#[starknet::interface]
pub trait ILandNFT<TContractState> {
    fn mint(ref self: TContractState, to: ContractAddress, token_id: u256);
    fn transfer(ref self: TContractState, from: ContractAddress, to: ContractAddress, token_id: u256);
}

#[starknet::contract]
pub mod LandNFT {
    use starknet::ContractAddress;
    use openzeppelin::token::erc721::ERC721Component;
    use starknet::storage::{Map, StorageMapWriteAccess, StorageMapReadAccess};


    component!(path: ERC721Component, storage: erc721, event: ERC721Event);

    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721MetadataImpl = ERC721Component::ERC721MetadataImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        land_registry: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event
    }

    #[constructor]
    fn constructor(ref self: ContractState, land_registry: ContractAddress) {
        self.erc721.initializer('Land NFT', 'LAND');
        self.land_registry.write(land_registry);
    }

    #[external(v0)]
    fn mint(ref self: ContractState, to: ContractAddress, token_id: u256) {
        // Only the land registry contract can mint NFTs
        assert(starknet::get_caller_address() == self.land_registry.read(), 'Only land registry can mint');
        self.erc721._mint(to, token_id);
    }

    #[external(v0)]
    fn transfer(ref self: ContractState, from: ContractAddress, to: ContractAddress, token_id: u256) {
        // Only the land registry contract can transfer NFTs
        assert(starknet::get_caller_address() == self.land_registry.read(), 'Only land registry can transfer');
        self.erc721._transfer(from, to, token_id);
    }

    // The following functions are already implemented by ERC721Impl and ERC721MetadataImpl
    // We don't need to reimplement them here

    // #[external(v0)]
    // fn token_uri(self: @ContractState, token_id: u256) -> felt252 {
    //     self.erc721.token_uri(token_id)
    // }

    // #[external(v0)]
    // fn owner_of(self: @ContractState, token_id: u256) -> ContractAddress {
    //     self.erc721.owner_of(token_id)
    // }

    // #[external(v0)]
    // fn balance_of(self: @ContractState, account: ContractAddress) -> u256 {
    //     self.erc721.balance_of(account)
    // }

    //TO DO: 
}
