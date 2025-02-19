// Implementation of NFT functionality for land parcels using ERC721 standard

// use starknet::ContractAddress;
// use openzeppelin::token::erc721::ERC721Component;
// use openzeppelin::introspection::src5::SRC5Component;
// use land_registry::custom_error::Errors;

use land_registry::interface::land_nft::{ILandNFT};

#[starknet::contract]
pub mod LandNFT {
    use core::num::traits::Zero;
    use super::ILandNFT;
    use starknet::ContractAddress;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess, Map};
    use openzeppelin::token::erc721::ERC721Component;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721HooksEmptyImpl;
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::upgrades::UpgradeableComponent;
    // use openzeppelin::upgrades::interface::IUpgradeable;
    use land_registry::custom_error;
    use land_registry::interface::land_nft::{BaseURIUpdated, Locked, Unlocked};


    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);

    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721MetadataImpl = ERC721Component::ERC721MetadataImpl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721CamelOnlyImpl = ERC721Component::ERC721CamelOnlyImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;
    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;
    // Upgradeable
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;


    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage, // ERC721 standard storage
        #[substorage(v0)]
        src5: SRC5Component::Storage, // SRC5 interface storage
        #[substorage(v0)]
        ownable: OwnableComponent::Storage, // Openzeppelin storage for Ownable component
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage, // Openzeppelin storage for Upgradable component 
        land_registry: ContractAddress, // Address of the land registry contract
        locked: Map<u64, bool> // Mapping of locked status for each token
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event, // openzeppelin event
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event, // openzeppelin event
        BaseURIUpdated: BaseURIUpdated,
        Locked: Locked,
        Unlocked: Unlocked,
    }

    #[constructor]
    fn constructor(ref self: ContractState, land_registry: ContractAddress, base_uri: ByteArray) {
        let owner = starknet::get_caller_address();
        self.ownable.initializer(owner);

        self.erc721.initializer("Land NFT", "LAND", base_uri);
        self.land_registry.write(land_registry);
    }

    #[abi(embed_v0)]
    impl LandNFTImpl of ILandNFT<ContractState> {
        fn upgrade(ref self: ContractState, new_class_hash: starknet::class_hash::ClassHash) {
            self.ownable.assert_only_owner();
            self.upgradeable.upgrade(new_class_hash);
        }

        fn mint(ref self: ContractState, to: ContractAddress, token_id: u64) {
            // Only the land registry contract can mint NFTs
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                custom_error::Errors::MINT_NFT,
            );
            self.erc721.mint(to, token_id.into());
        }

        fn transfer(
            ref self: ContractState, from: ContractAddress, to: ContractAddress, token_id: u64,
        ) {
            // Only the land registry contract can transfer NFTs
            assert(
                starknet::get_caller_address() == self.land_registry.read(),
                custom_error::Errors::TRANSFER_NFT,
            );

            // ERC721::transfer ensures the token already existed and that
            // from was really its previous owner
            self.erc721.transfer(from, to, token_id.into());
        }

        fn set_base_uri(
            ref self: ContractState, new_base_uri: ByteArray, updater: ContractAddress,
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
    }
}
