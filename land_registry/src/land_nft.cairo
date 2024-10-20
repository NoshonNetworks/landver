#[starknet::interface]
pub trait ILandNFT<ContractState> {
    fn mint(ref self: ContractState, to: ContractAddress, token_id: u256);
    fn transfer(ref self: ContractState, from: ContractAddress, to: ContractAddress, token_id: u256);
    use starknet::ContractAddress;
}

#[starknet::contract]
pub mod LandNFT {
    use starknet::ContractAddress;
    use openzeppelin::token::erc20::ERC20Component;
    use starknet::storage::{Map, StorageMapWriteAccess, StorageMapReadAccess};


    component!(path: ERC20Component, storage: erc20, event: ERC20Event);

    #[abi(embed_v0)]
    impl ERC20Impl = ERC20Component::ERC20Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC20CamelOnlyImpl = ERC20Component::ERC20CamelOnlyImpl<ContractState>;
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        land_registry: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event
    }

    #[constructor]
    fn constructor(ref self: ContractState, land_registry: ContractAddress) {
        self.erc20.initializer('Land NFT', 'LAND');
        self.land_registry.write(land_registry);
    }

    #[external(v0)]
    fn mint(ref self: ContractState, to: ContractAddress, token_id: u256) {
        // Only the land registry contract can mint NFTs
        assert(starknet::get_caller_address() == self.land_registry.read(), 'Only land registry can mint');
        self.erc20._mint(to, token_id);
    }

    #[external(v0)]
    fn transfer_land_nft(ref self: ContractState, from: ContractAddress, to: ContractAddress, token_id: u256) {
        // Only the land registry contract can transfer NFTs
        assert(starknet::get_caller_address() == self.land_registry.read(), 'Only land registry can transfer');
        self.erc20._transfer(from, to, token_id);
    }
}
