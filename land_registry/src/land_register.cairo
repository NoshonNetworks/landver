#[starknet::contract]
pub mod LandRegistryContract {
    use OwnableComponent::InternalTrait;
    use starknet::SyscallResultTrait;
    use starknet::{
        get_caller_address, get_contract_address, get_block_timestamp, ContractAddress, syscalls,
        get_tx_info,
    };
    use land_registry::interface::land_register::{
        ILandRegistry, Land, Location, LandStatus, Listing, ListingStatus,
    };
    use land_registry::interface::land_register::{
        LandRegistered, LandTransferred, LandVerified, LandUpdated, LandInspectorSet,
        InspectorAdded, InspectorRemoved, ListingCreated, ListingCancelled, ListingPriceUpdated,
        LandSold,
    };
    // use land_registry::land_nft::{LandNFT};
    use land_registry::interface::land_nft::{ILandNFTDispatcher, ILandNFTDispatcherTrait};
    use land_registry::utils::utils::{create_land_id};
    use core::array::ArrayTrait;
    use starknet::storage::{Map, StorageMapWriteAccess, StorageMapReadAccess};
    use land_registry::custom_error::Errors;

    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::upgrades::UpgradeableComponent;
    // use openzeppelin::upgrades::interface::IUpgradeable;

    // open zeppellin commponents
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);

    // Ownable Mixin
    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;
    // Upgradeable
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;


    #[storage]
    struct Storage {
        #[substorage(v0)]
        ownable: OwnableComponent::Storage, // Openzeppelin storage for Ownable component
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage, // Openzeppelin storage for Upgradable component 
        lands: Map::<u64, Land>, // Stores all registered lands
        lands_registry: Map::<u64, Land>,
        owner_lands: Map::<(ContractAddress, u64), u64>, // Maps owners to their lands
        owner_land_count: Map::<ContractAddress, u64>, // Number of lands per owner
        land_inspectors: Map::<u64, ContractAddress>, // Assigned inspector for each land
        all_land_inspectors: Map::<u64, ContractAddress>, // All inspectors
        lands_assigned_to_inspector: Map::<ContractAddress, u64>, // Number of lands per inspector
        approved_lands: Map::<u64, bool>, // Tracks approved land status
        land_count: u64, // Total number of registered lands
        nft_contract: ContractAddress, // Address of the NFT contract
        land_transaction_history: Map::<(u64, u64), (ContractAddress, u64)>, // Transaction history
        land_transaction_count: Map::<u64, u64>, // Number of transactions per land
        land_inspector_assignments: Map::<u64, ContractAddress>, // Inspector assignments
        registered_inspectors: Map::<ContractAddress, bool>, // List of registered inspectors
        inspector_count: u64, // Total number of registered inspectors
        listings: Map::<u64, Listing>,
        listing_count: u64,
        price_history: Map::<(u64, u64), (u128, u64)>, // (listing_id, index) -> (price, timestamp)
        price_update_count: Map::<u64, u64>, // listing_id -> number of price updates
        active_listings: Map::<u64, u64>, // index -> listing_id
        active_listing_count: u64,
        id_exists: Map::<u64, bool>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event, // openzeppelin event
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event, // openzeppelin event
        LandRegistered: LandRegistered,
        LandTransferred: LandTransferred,
        LandVerified: LandVerified,
        LandUpdated: LandUpdated,
        LandInspectorSet: LandInspectorSet,
        InspectorAdded: InspectorAdded,
        InspectorRemoved: InspectorRemoved,
        ListingCreated: ListingCreated,
        ListingCancelled: ListingCancelled,
        ListingPriceUpdated: ListingPriceUpdated,
        LandSold: LandSold,
    }

    // Constructor initializes the contract with NFT functionality

    #[constructor]
    fn constructor(
        ref self: ContractState, nft_contract_class_hash: starknet::class_hash::ClassHash,
    ) {
        let owner = get_caller_address();
        self.ownable.initializer(owner);

        self.inspector_count.write(0);

        // Deploy the NFT contract and store its address

        let land_register_contract_address = get_contract_address();
        let base_uri: ByteArray = "https://example.base.uri/";
        let mut call_data = ArrayTrait::<felt252>::new();
        call_data.append(land_register_contract_address.try_into().unwrap());
        base_uri.serialize(ref call_data);
        let (nft_contract_address, _) = syscalls::deploy_syscall(
            nft_contract_class_hash, 0, call_data.span(), true,
        )
            .unwrap_syscall();

        self.nft_contract.write(nft_contract_address);
    }

    #[abi(embed_v0)]
    impl LandRegistry of ILandRegistry<ContractState> {
        fn upgrade(ref self: ContractState, new_class_hash: starknet::class_hash::ClassHash) {
            self.ownable.assert_only_owner();
            self.upgradeable.upgrade(new_class_hash);
        }

        // Registers a new land parcel in the system
        fn register_land(
            ref self: ContractState, location: Location, area: u64, land_use: felt252,
        ) -> u64 {
            let caller = get_caller_address();

            let timestamp = get_block_timestamp();
            // Generate unique land ID based on owner, timestamp, location, and a counter
            // This counter increases for each registration to re-ensure uniqueness.
            let mut counter = self.land_count.read();
            let mut land_id = create_land_id(caller, timestamp, location, counter);

            while self.id_exists.read(land_id) {
                // This is highly impossible, but not impossible. re-iterate.
                counter += 1;
                land_id = create_land_id(caller, timestamp, location, counter);
            };

            let transaction_count = self.land_transaction_count.read(land_id);

            // id is available, now make it unavailable.
            self.id_exists.write(land_id, true);

            // Create new land record
            let new_land = Land {
                land_id,
                owner: caller,
                location,
                area,
                land_use,
                status: LandStatus::Pending,
                inspector: 0.try_into().unwrap(),
                last_transaction_timestamp: timestamp,
            };

            // Update storage with new land information
            self.lands.write(land_id, new_land);
            self.lands_registry.write(self.land_count.read() + 1, new_land);
            self.land_count.write(self.land_count.read() + 1);

            // Update owner's land records
            let owner_land_count = self.owner_land_count.read(caller);
            self.owner_lands.write((caller, owner_land_count), land_id);
            self.owner_land_count.write(caller, owner_land_count + 1);

            // Record transaction in history
            self.land_transaction_history.write((land_id, transaction_count), (caller, timestamp));
            self
                .land_transaction_count
                .write(land_id, self.land_transaction_count.read(land_id) + 1);

            // Emit registration event
            self
                .emit(
                    LandRegistered {
                        land_id: land_id,
                        owner: caller,
                        location: location,
                        area: area,
                        land_use: Option::Some(land_use),
                    },
                );

            land_id
        }
        fn get_user_type(self: @ContractState, userAddress: ContractAddress) -> felt252 {
            let inspector = self.registered_inspectors.read(userAddress);

            let owner = self.owner_land_count.read(userAddress);
            let inspector_role = 'inspector';
            let owner_role = 'owner';

            if inspector {
                return inspector_role;
            } else if (owner > 0) {
                return owner_role;
            } else {
                return 'None';
            }
        }

        fn get_land(self: @ContractState, land_id: u64) -> Land {
            self.lands.read(land_id)
        }

        fn get_land_count(self: @ContractState) -> u64 {
            self.land_count.read()
        }


        fn get_lands_by_owner(self: @ContractState, owner: ContractAddress) -> Span<u64> {
            let mut result = array![];
            let owner_land_count = self.owner_land_count.read(owner);
            let mut i = 0;
            while i < owner_land_count {
                let land_id = self.owner_lands.read((owner, i));
                result.append(land_id);
                i += 1;
            };
            result.span()
        }

        fn get_all_lands(self: @ContractState) -> Span<Land> {
            let mut lands = array![];
            let land_count = self.land_count.read();
            let mut i: u64 = 1;

            while i < land_count + 1 {
                let land: Land = self.lands_registry.read(i);
                lands.append(land);
                i += 1;
            };
            lands.span()
        }

        fn update_land(
            ref self: ContractState,
            land_id: u64,
            area: u64,
            land_use: felt252,
            land_status: LandStatus,
        ) {
            assert(InternalFunctions::only_owner(@self, land_id), Errors::UPDATE_BY_LAND);
            let mut land = self.lands.read(land_id);
            land.area = area;
            land.land_use = land_use;
            land.status = land_status;
            self.lands.write(land_id, land);

            self
                .emit(
                    LandUpdated {
                        land_id: land_id,
                        area: area,
                        land_use: Option::Some(land_use),
                        status: land_status,
                    },
                );
        }

        // Transfers land ownership to a new owner
        fn transfer_land(ref self: ContractState, land_id: u64, new_owner: ContractAddress) {
            // Verify caller is the current owner
            assert(InternalFunctions::only_owner(@self, land_id), Errors::ONLY_OWNER_TRNF);
            assert(new_owner != 0.try_into().unwrap(), Errors::ADDRESS_ZERO);

            let mut land = self.lands.read(land_id);
            // Verify land is approved for transfer
            assert(land.status == LandStatus::Approved, Errors::LAND_APPROVAL);

            let old_owner = land.owner;
            land.owner = new_owner;
            self.lands.write(land_id, land);

            // Update old owner's land records
            let mut old_owner_land_count = self.owner_land_count.read(old_owner);
            let mut index_to_remove = old_owner_land_count;
            let mut i: u64 = 0;

            // Find the land index in old owner's records
            loop {
                if i >= old_owner_land_count {
                    break;
                }
                if self.owner_lands.read((old_owner, i)) == land_id {
                    index_to_remove = i;
                    break;
                }
                i += 1;
            };

            assert(index_to_remove < old_owner_land_count, Errors::NO_LAND);

            // Reorganize old owner's land records
            if index_to_remove < old_owner_land_count - 1 {
                let last_land = self.owner_lands.read((old_owner, old_owner_land_count - 1));
                self.owner_lands.write((old_owner, index_to_remove), last_land);
            }
            self.owner_land_count.write(old_owner, old_owner_land_count - 1);

            // Update new owner's land records
            let new_owner_land_count = self.owner_land_count.read(new_owner);
            self.owner_lands.write((new_owner, new_owner_land_count), land_id);
            self.owner_land_count.write(new_owner, new_owner_land_count + 1);

            // Transfer the associated NFT
            let nft_contract = self.nft_contract.read();
            let nft_dispatcher = ILandNFTDispatcher { contract_address: nft_contract };
            nft_dispatcher.transfer(old_owner, new_owner, land_id.into());

            // Emit transfer event
            self
                .emit(
                    LandTransferred {
                        land_id: land_id, from_owner: old_owner, to_owner: new_owner,
                    },
                );
        }

        fn approve_land(ref self: ContractState, land_id: u64) {
            assert(InternalFunctions::only_inspector(@self, land_id), Errors::INSPECTOR_APPROVE);

            self.approved_lands.write(land_id, true);

            // Mint NFT
            let mut land = self.lands.read(land_id);
            assert(land.status == LandStatus::Pending, Errors::PENDING_LAND);
            land.status = LandStatus::Approved;
            self.lands.write(land_id, land);
            let nft_contract = self.nft_contract.read();
            let nft_dispatcher = ILandNFTDispatcher { contract_address: nft_contract };
            let token_id = land_id.into();
            nft_dispatcher.mint(land.owner, token_id);

            self.emit(LandVerified { land_id: land_id });
        }

        fn reject_land(ref self: ContractState, land_id: u64) {
            assert(
                InternalFunctions::only_inspector(@self, land_id)
                    | InternalFunctions::only_owner(@self, land_id),
                Errors::INSPECTOR_OWNER_APPR,
            );
            let mut land = self.lands.read(land_id);
            assert(land.status == LandStatus::Pending, Errors::PENDING_LAND);
            land.status = LandStatus::Rejected;
            self.lands.write(land_id, land);

            self.emit(LandVerified { land_id: land_id });
        }

        fn is_inspector(self: @ContractState, inspector: ContractAddress) -> bool {
            let count = self.lands_assigned_to_inspector.read(inspector);

            if count > 0 {
                return true;
            }

            return false;
        }


        fn is_land_approved(self: @ContractState, land_id: u64) -> bool {
            let land = self.lands.read(land_id);
            land.status == LandStatus::Approved
        }


        fn get_pending_approvals(self: @ContractState) -> Array<u64> {
            let mut pending_approvals = array![];
            let owner = get_caller_address();
            let owner_land_count = self.owner_land_count.read(owner);
            let mut i = 0;
            while i < owner_land_count {
                let land_id = self.owner_lands.read((owner, i));
                if (!self.approved_lands.read(land_id)) {
                    pending_approvals.append(land_id);
                }
                i += 1;
            };
            pending_approvals
        }

        fn get_land_transaction_history(
            self: @ContractState, land_id: u64,
        ) -> Array<(ContractAddress, u64)> {
            let mut land_history = array![];
            let transaction_count = self.land_transaction_count.read(land_id);
            let mut i = 0;
            while i < transaction_count {
                land_history.append(self.land_transaction_history.read((land_id, i)));
                i += 1;
            };

            land_history
        }
        fn get_land_status(self: @ContractState, land_id: u64) -> LandStatus {
            let land = self.lands.read(land_id);
            land.status
        }

        fn set_land_inspector(ref self: ContractState, land_id: u64, inspector: ContractAddress) {
            assert(self.only_owner(land_id), Errors::OWNER_MK_INSPECTOR);

            let prev_land_count = self.lands_assigned_to_inspector.read(inspector);

            self.land_inspectors.write(land_id, inspector);
            self.lands_assigned_to_inspector.write(inspector, prev_land_count + 1);

            let prev_land = self.lands.read(land_id);

            self.lands.write(land_id, Land { inspector: inspector, ..prev_land });

            self.emit(LandInspectorSet { land_id, inspector });
        }

        fn inspector_lands(self: @ContractState, inspector: ContractAddress) -> Array<Land> {
            let mut inspector_lands: Array<Land> = array![];

            let land_count = self.land_count.read();
            let mut i: u64 = 1;

            while i < land_count + 1 {
                let land_registry: Land = self.lands_registry.read(i);
                let land_inspector = self.land_inspectors.read(land_registry.land_id);

                if land_inspector == inspector {
                    let land = self.lands.read(land_registry.land_id);
                    inspector_lands.append(land);
                }

                i += 1;
            };

            inspector_lands
        }

        fn get_land_inspector(self: @ContractState, land_id: u64) -> ContractAddress {
            self.land_inspectors.read(land_id)
        }

        fn add_inspector(ref self: ContractState, inspector: ContractAddress) {
            assert(inspector != 0.try_into().unwrap(), Errors::INSPECTOR_ADDR);
            assert(!self.registered_inspectors.read(inspector), Errors::REGISTERED_INSPECTOR);

            // Register the inspector
            self.registered_inspectors.write(inspector, true);
            self.all_land_inspectors.write(self.inspector_count.read(), inspector);
            self.inspector_count.write(self.inspector_count.read() + 1);
            self.lands_assigned_to_inspector.write(inspector, 0);

            self.emit(InspectorAdded { inspector });
        }

        fn remove_inspector(ref self: ContractState, inspector: ContractAddress) {
            assert(self.registered_inspectors.read(inspector), Errors::NOT_REGISTERED_INSP);

            let assigned_lands = self.lands_assigned_to_inspector.read(inspector);
            assert(assigned_lands == 0, Errors::ACTIVE_INSPECTOR);

            self.registered_inspectors.write(inspector, false);
            self.inspector_count.write(self.inspector_count.read() - 1);

            self.emit(InspectorRemoved { inspector });
        }

        fn get_all_inspectors(self: @ContractState) -> Array<ContractAddress> {
            let mut inspectors = array![];
            let inspector_count = self.inspector_count.read();
            let mut i = 0;
            while i < inspector_count {
                let inspector = self.all_land_inspectors.read(i);
                if (self.registered_inspectors.read(inspector)) {
                    inspectors.append(inspector);
                }
                i += 1;
            };
            inspectors
        }

        fn create_listing(ref self: ContractState, land_id: u64, price: u128) -> u64 {
            let caller = get_caller_address();

            // Verify caller owns the land
            assert(InternalFunctions::only_owner(@self, land_id), Errors::ONLY_OWNER_CAN_LIST);

            // Verify land is approved
            let land = self.lands.read(land_id);
            assert(land.status == LandStatus::Approved, Errors::LAND_NOT_APPROVED);

            // Create listing
            let listing_id = self.listing_count.read() + 1;
            let timestamp = get_block_timestamp();

            let listing = Listing {
                land_id: land_id,
                seller: caller,
                price,
                status: ListingStatus::Active,
                created_at: timestamp,
                updated_at: timestamp,
            };

            self.listings.write(listing_id, listing);
            self.listing_count.write(listing_id);

            // Add to active listings
            let active_count = self.active_listing_count.read();
            self.active_listings.write(active_count, listing_id);
            self.active_listing_count.write(active_count + 1);

            // Record initial price in history
            self.price_history.write((listing_id, 0), (price, timestamp));
            self.price_update_count.write(listing_id, 1);

            self.emit(ListingCreated { listing_id, land_id, seller: caller, price });

            listing_id
        }

        fn cancel_listing(ref self: ContractState, listing_id: u64) {
            let mut listing = self.listings.read(listing_id);
            let caller = get_caller_address();

            assert(listing.seller == caller, Errors::ONLY_SELLER_CAN_CANCEL_LIST);
            assert(listing.status == ListingStatus::Active, Errors::LISTING_NOT_ACTIVE);

            listing.status = ListingStatus::Cancelled;
            listing.updated_at = get_block_timestamp();
            self.listings.write(listing_id, listing);

            // Remove from active listings
            self._remove_from_active_listings(listing_id);

            self.emit(ListingCancelled { listing_id });
        }

        fn update_listing_price(ref self: ContractState, listing_id: u64, new_price: u128) {
            let mut listing = self.listings.read(listing_id);
            let caller = get_caller_address();

            assert(listing.seller == caller, Errors::ONLY_SELLER_CAN_UPDATE_LIST);
            assert(listing.status == ListingStatus::Active, Errors::LISTING_NOT_ACTIVE);

            let old_price = listing.price;
            listing.price = new_price;
            listing.updated_at = get_block_timestamp();
            self.listings.write(listing_id, listing);

            // Record price update in history
            let update_count = self.price_update_count.read(listing_id);
            self
                .price_history
                .write((listing_id, update_count), (new_price, get_block_timestamp()));
            self.price_update_count.write(listing_id, update_count + 1);

            self.emit(ListingPriceUpdated { listing_id, old_price, new_price });
        }

        fn buy_land(ref self: ContractState, listing_id: u64) {
            let mut listing = self.listings.read(listing_id);
            let buyer = get_caller_address();

            assert(listing.status == ListingStatus::Active, Errors::LISTING_NOT_ACTIVE);
            assert(buyer != listing.seller, Errors::SELLER_CANT_BUY_OWN);

            // Verify payment
            let payment = get_tx_info().unbox().max_fee;
            assert(payment >= listing.price, Errors::INSUFFICIENT_PAYMENT_TO_BUY_LAND);

            // Get land details
            let mut land = self.lands.read(listing.land_id);
            let old_owner = land.owner;

            // Update listing status
            listing.status = ListingStatus::Sold;
            listing.updated_at = get_block_timestamp();
            self.listings.write(listing_id, listing);

            // Remove from active listings
            self._remove_from_active_listings(listing_id);

            // Update owner records
            let old_owner_count = self.owner_land_count.read(old_owner);
            self.owner_land_count.write(old_owner, old_owner_count - 1);

            let new_owner_count = self.owner_land_count.read(buyer);
            self.owner_lands.write((buyer, new_owner_count), listing.land_id);
            self.owner_land_count.write(buyer, new_owner_count + 1);

            // Update land ownership
            land.owner = buyer;
            self.lands.write(listing.land_id, land);
            // Handle NFT
            let nft_contract = self.nft_contract.read();
            let nft_dispatcher = ILandNFTDispatcher { contract_address: nft_contract };
            nft_dispatcher.transfer(old_owner, buyer, listing.land_id.into());

            self
                .emit(
                    LandSold {
                        listing_id,
                        land_id: listing.land_id,
                        seller: old_owner,
                        buyer,
                        price: listing.price.try_into().unwrap(),
                    },
                );
        }

        fn get_listing(self: @ContractState, listing_id: u64) -> Listing {
            self.listings.read(listing_id)
        }

        fn get_active_listings(self: @ContractState) -> Array<u64> {
            let mut active = array![];
            let count = self.active_listing_count.read();

            let mut i: u64 = 0;
            while i < count {
                active.append(self.active_listings.read(i));
                i += 1;
            };

            active
        }
        //TODO: Add get_listing_price_history

    }

    // Internal helper functions for access control
    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        // Verifies if the caller is the owner of the land
        fn only_owner(self: @ContractState, land_id: u64) -> bool {
            let land = self.lands.read(land_id);
            land.owner == get_caller_address()
        }

        // Verifies if the caller is the inspector assigned to the land
        fn only_inspector(self: @ContractState, land_id: u64) -> bool {
            let caller = get_caller_address();
            let inspector = self.land_inspectors.read(land_id);
            inspector == caller
        }

        fn _remove_from_active_listings(ref self: ContractState, listing_id: u64) {
            let count = self.active_listing_count.read();
            let mut i: u64 = 0;

            // Find listing index
            while i < count {
                if self.active_listings.read(i) == listing_id {
                    // Replace with last listing if not last
                    if i < count - 1 {
                        let last_listing = self.active_listings.read(count - 1);
                        self.active_listings.write(i, last_listing);
                    }
                    self.active_listing_count.write(count - 1);
                    break;
                }
                i += 1;
            }
        }
    }

    fn is_inspector(self: @ContractState, inspector: ContractAddress) -> bool {
        let count = self.lands_assigned_to_inspector.read(inspector);

        if count > 0 {
            return true;
        }

        return false;
    }
}
