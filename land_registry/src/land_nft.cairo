// Implementation of NFT functionality for land parcels using ERC721 standard

use starknet::ContractAddress;
use openzeppelin::token::erc721::ERC721Component;
use openzeppelin::introspection::src5::SRC5Component;
use land_registry::custom_error::Errors;

use land_registry::interface::land_nft::{ILandNFT};

#[starknet::contract]
pub mod LandNFT {
    use core::num::traits::Zero;
    use super::ILandNFT;
    use starknet::ContractAddress;
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map
    };
    use openzeppelin::token::erc721::ERC721Component;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721HooksEmptyImpl;
    use land_registry::custom_error;
    use land_registry::interface::land_nft::{BaseURIUpdated, Locked, Unlocked};


    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721MetadataImpl = ERC721Component::ERC721MetadataImpl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721CamelOnlyImpl = ERC721Component::ERC721CamelOnlyImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage, // ERC721 standard storage
        #[substorage(v0)]
        src5: SRC5Component::Storage, // SRC5 interface storage
        land_registry: ContractAddress, // Address of the land registry contract
        locked: Map<u256, bool>, // Mapping of locked status for each token
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        BaseURIUpdated: BaseURIUpdated,
        Locked: Locked,
        Unlocked: Unlocked,
    }

    #[constructor]
    fn constructor(ref self: ContractState, land_registry: ContractAddress, base_uri: ByteArray) {
        self.erc721.initializer("Land NFT", "LAND", base_uri);
        self.land_registry.write(land_registry);
    }

    #[abi(embed_v0)]
    impl LandNFTImpl of ILandNFT<ContractState> {
        fn mint(ref self: ContractState, to: ContractAddress, token_id: u256) {
            // Only the land registry contract can mint NFTs
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                custom_error::Errors::MINT_NFT
            );
            self.erc721.mint(to, token_id);
        }

        fn transfer(
            ref self: ContractState, from: ContractAddress, to: ContractAddress, token_id: u256
        ) {
            // Only the land registry contract can transfer NFTs
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                custom_error::Errors::TRANSFER_NFT
            );
            self._assert_not_locked(token_id);

            // ERC721::transfer ensures the token already existed and that
            // from was really its previous owner
            self.erc721.transfer(from, to, token_id);
        }

        fn set_base_uri(
            ref self: ContractState, new_base_uri: ByteArray, updater: ContractAddress
        ) {
            // Only the land registry contract can update the metadata URI
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                custom_error::Errors::SET_URI_ONLY_LAND_REGISTRY,
            );
            assert(Zero::is_non_zero(@updater), custom_error::Errors::INVALID_ADDRESS);
            self.erc721._set_base_uri(new_base_uri.clone());
            self.emit(BaseURIUpdated { caller: updater, new_base_uri });
        }

        fn lock(ref self: ContractState, token_id: u256) {
            // Only land registry can lock
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                custom_error::Errors::LOCK_NFT_ONLY_LAND_REGISTRY,
            );
            self.erc721._require_owned(token_id);
            self._assert_not_locked(token_id);
            self.locked.entry(token_id).write(true);
            self.emit(Locked { token_id });
        }

        fn unlock(ref self: ContractState, token_id: u256) {
            // Only land registry can unlock
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                custom_error::Errors::UNLOCK_NFT_ONLY_LAND_REGISTRY,
            );
            self.erc721._require_owned(token_id);
            self._assert_locked(token_id);
            self.locked.entry(token_id).write(false);
            self.emit(Unlocked { token_id });
        }

        fn is_locked(self: @ContractState, token_id: u256) -> bool {
            self.locked.entry(token_id).read()
        }
    }

    #[generate_trait]
    impl Internal of InternalTrait {
        /// Makes a function only callable when the contract is not locked.
        fn _assert_not_locked(self: @ContractState, token_id: u256) {
            assert(!self.is_locked(token_id), custom_error::Errors::LOCKED);
        }

        /// Makes a function only callable when the contract is locked.
        fn _assert_locked(self: @ContractState, token_id: u256) {
            assert(self.is_locked(token_id), custom_error::Errors::NOT_LOCKED);
        }
    }
}
