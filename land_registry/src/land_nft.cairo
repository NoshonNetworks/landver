use starknet::ContractAddress;
use openzeppelin::token::erc721::ERC721Component;
use openzeppelin::introspection::src5::SRC5Component;

#[starknet::interface]
pub trait ILandNFT<TContractState> {
    fn mint(ref self: TContractState, to: ContractAddress, token_id: u256);
    fn transfer(
        ref self: TContractState, from: ContractAddress, to: ContractAddress, token_id: u256
    );
    fn update_metadata_uri(ref self: TContractState, new_metadata_uri: ByteArray);
    fn metadata_uri(self: @TContractState) -> ByteArray;
    fn lock(ref self: TContractState);
    fn unlock(ref self: TContractState);
    fn is_locked(self: @TContractState) -> bool;
}

#[starknet::contract]
pub mod LandNFT {
    use super::ILandNFT;
    use starknet::ContractAddress;
    use openzeppelin::token::erc721::ERC721Component;
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
        metadata_uri: ByteArray,
        locked: bool,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        MetadataURIUpdated: MetadataURIUpdated,
        Locked: Locked,
        Unlocked: Unlocked,
    }

    #[derive(Drop, starknet::Event)]
    struct MetadataURIUpdated {
        new_metadata_uri: ByteArray
    }

    #[derive(Drop, starknet::Event)]
    pub struct Locked {}

    #[derive(Drop, starknet::Event)]
    pub struct Unlocked {}

    pub mod Errors {
        pub const LOCKED: felt252 = 'Locked';
        pub const NOT_LOCKED: felt252 = 'Not locked';
    }

    #[constructor]
    fn constructor(
        ref self: ContractState, land_registry: ContractAddress, metadata_uri: ByteArray
    ) {
        self.erc721.initializer("Land NFT", "LAND", format!(""));
        self.land_registry.write(land_registry);
        self.metadata_uri.write(metadata_uri);
    }

    #[abi(embed_v0)]
    impl LandNFTImpl of ILandNFT<ContractState> {
        fn mint(ref self: ContractState, to: ContractAddress, token_id: u256) {
            // Only the land registry contract can mint NFTs
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                'Only land registry can mint'
            );
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
            self.assert_not_locked();

            self.erc721.transfer(from, to, token_id);
        }

        fn update_metadata_uri(ref self: ContractState, new_metadata_uri: ByteArray) {
            // Only the land registry contract can update the metadata URI
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                'Only land registry can update'
            );
            self.metadata_uri.write(new_metadata_uri.clone());
            self.emit(MetadataURIUpdated { new_metadata_uri });
        }

        fn metadata_uri(self: @ContractState) -> ByteArray {
            self.metadata_uri.read()
        }

        fn lock(ref self: ContractState) {
            // Only land registry can lock
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                'Only land registry can lock'
            );
            self.assert_not_locked();
            self.locked.write(true);
            self.emit(Locked {});
        }

        fn unlock(ref self: ContractState) {
            // Only land registry can unlock
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                'Only land registry can unlock'
            );
            self.assert_locked();
            self.locked.write(false);
            self.emit(Unlocked {});
        }

        fn is_locked(self: @ContractState) -> bool {
            self.locked.read()
        }
    }

    #[generate_trait]
    impl Internal of InternalTrait {
        /// Makes a function only callable when the contract is not locked.
        fn assert_not_locked(self: @ContractState) {
            assert(!self.locked.read(), Errors::LOCKED);
        }

        /// Makes a function only callable when the contract is locked.
        fn assert_locked(self: @ContractState) {
            assert(self.locked.read(), Errors::NOT_LOCKED);
        }
    }
}
