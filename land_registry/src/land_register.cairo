#[starknet::contract]
pub mod LandRegistryContract {
    use starknet::{get_caller_address, get_block_timestamp, ContractAddress};
    use land_registry::interface::{ILandRegistry, Land, LandUse, Location, LandStatus};
    use land_registry::land_nft::{ILandNFTDispatcher, ILandNFTDispatcherTrait, LandNFT};
    use land_registry::utils::utils::{create_land_id, LandUseIntoOptionFelt252};
    use core::array::ArrayTrait;
    use starknet::storage::{Map, StorageMapWriteAccess, StorageMapReadAccess};


    #[storage]
    struct Storage {
        lands: Map::<u256, Land>,
        owner_lands: Map::<(ContractAddress, u256), u256>,
        owner_land_count: Map::<ContractAddress, u256>,
        land_inspectors: Map::<ContractAddress, bool>,
        approved_lands: Map::<u256, bool>,
        land_count: u256,
        nft_contract: ContractAddress,
        land_inspector_assignments: Map::<u256, ContractAddress>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        LandRegistered: LandRegistered,
        LandTransferred: LandTransferred,
        LandVerified: LandVerified,
        LandUpdated: LandUpdated,
        InspectorAssigned: InspectorAssigned,
    }

    #[derive(Drop, starknet::Event)]
    struct LandRegistered {
        land_id: u256,
        owner: ContractAddress,
        location: Location,
        area: u256,
        land_use: Option<felt252>,
    }

    #[derive(Drop, starknet::Event)]
    struct LandTransferred {
        land_id: u256,
        from_owner: ContractAddress,
        to_owner: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct LandVerified {
        land_id: u256,
    }

    #[derive(Drop, Copy, starknet::Event)]
    struct LandUpdated {
        land_id: u256,
        land_use: Option<felt252>,
        area: u256
    }

    #[derive(Drop, starknet::Event)]
    struct InspectorAssigned {
        land_id: u256,
        inspector: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, nft_contract: ContractAddress) {
        self.nft_contract.write(nft_contract);
    }

    #[abi(embed_v0)]
    impl LandRegistry of ILandRegistry<ContractState> {
        fn register_land(
            ref self: ContractState, location: Location, area: u256, land_use: LandUse,
        ) -> u256 {
            let caller = get_caller_address();
            let timestamp = get_block_timestamp();
            let land_id = create_land_id(caller, timestamp, location);

            let new_land = Land {
                owner: caller,
                location: location,
                area: area,
                land_use: land_use,
                status: LandStatus::Pending,
                inspector: Option::None,
                last_transaction_timestamp: timestamp,
            };

            self.lands.write(land_id, new_land);
            self.land_count.write(self.land_count.read() + 1);

            let owner_land_count = self.owner_land_count.read(caller);
            self.owner_lands.write((caller, owner_land_count), land_id);
            self.owner_land_count.write(caller, owner_land_count + 1);

            self
                .emit(
                    LandRegistered {
                        land_id: land_id,
                        owner: caller,
                        location: location,
                        area: area,
                        land_use: land_use.into()
                    }
                );

            land_id
        }

        fn get_land(self: @ContractState, land_id: u256) -> Land {
            self.lands.read(land_id)
        }

        fn get_land_count(self: @ContractState) -> u256 {
            self.land_count.read()
        }

        fn get_lands_by_owner(self: @ContractState, owner: ContractAddress) -> Span<u256> {
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

        fn update_land(ref self: ContractState, land_id: u256, area: u256, land_use: LandUse) {
            assert(InternalFunctions::only_owner(@self, land_id), 'Only owner can update land');
            let mut land = self.lands.read(land_id);
            land.area = area;
            land.land_use = land_use;
            self.lands.write(land_id, land);

            self.emit(LandUpdated { land_id: land_id, area: area, land_use: land_use.into() });
        }

        fn transfer_land(ref self: ContractState, land_id: u256, new_owner: ContractAddress) {
            assert(InternalFunctions::only_owner(@self, land_id), 'Only owner can transfer');

            let mut land = self.lands.read(land_id);
            assert(land.status == LandStatus::Approved, 'Land must be approved');
            let old_owner = land.owner;
            land.owner = new_owner;
            self.lands.write(land_id, land);

            // Update owner_lands for old owner
            let mut old_owner_land_count = self.owner_land_count.read(old_owner);
            let mut index_to_remove = old_owner_land_count;
            let mut i: u256 = 0;
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

            assert(index_to_remove < old_owner_land_count, 'Land not found');

            if index_to_remove < old_owner_land_count - 1 {
                let last_land = self.owner_lands.read((old_owner, old_owner_land_count - 1));
                self.owner_lands.write((old_owner, index_to_remove), last_land);
            }
            self.owner_land_count.write(old_owner, old_owner_land_count - 1);

            // Update owner_lands for new owner
            let new_owner_land_count = self.owner_land_count.read(new_owner);
            self.owner_lands.write((new_owner, new_owner_land_count), land_id);
            self.owner_land_count.write(new_owner, new_owner_land_count + 1);

            // Transfer NFT
            let nft_contract = self.nft_contract.read();
            let nft_dispatcher = ILandNFTDispatcher { contract_address: nft_contract };
            nft_dispatcher.transfer(old_owner, new_owner, land_id);

            self
                .emit(
                    LandTransferred {
                        land_id: land_id, from_owner: old_owner, to_owner: new_owner,
                    }
                );
        }

        fn approve_land(ref self: ContractState, land_id: u256) {
            assert(InternalFunctions::only_inspector(@self), 'Only inspector can approve');
            self.approved_lands.write(land_id, true);

            // Mint NFT
            let mut land = self.lands.read(land_id);
            assert(land.status == LandStatus::Pending, 'Land must be in Pending status');
            land.status = LandStatus::Approved;
            self.lands.write(land_id, land);
            let nft_contract = self.nft_contract.read();
            let nft_dispatcher = ILandNFTDispatcher { contract_address: nft_contract };
            nft_dispatcher.mint(land.owner, land_id);

            self.emit(LandVerified { land_id: land_id });
        }

        fn reject_land(ref self: ContractState, land_id: u256) {
            assert(InternalFunctions::only_inspector(@self), 'Only inspector can reject');
            let mut land = self.lands.read(land_id);
            assert(land.status == LandStatus::Pending, 'Land must be in Pending status');
            land.status = LandStatus::Rejected;
            self.lands.write(land_id, land);

            self.emit(LandVerified { land_id: land_id });
        }

        fn is_inspector(self: @ContractState, inspector: ContractAddress) -> bool {
            self.land_inspectors.read(inspector)
        }

        fn add_inspector(ref self: ContractState, inspector: ContractAddress) {
            self.land_inspectors.write(inspector, true);
        }

        fn remove_inspector(ref self: ContractState, inspector: ContractAddress) {
            self.land_inspectors.write(inspector, false);
        }

        fn get_land_status(self: @ContractState, land_id: u256) -> LandStatus {
            let land = self.lands.read(land_id);
            land.status
        }

        fn set_land_inspector(ref self: ContractState, land_id: u256, inspector: ContractAddress) {
            // Ensure inspector is approved
            assert(self.land_inspectors.read(inspector), 'Inspector not approved');

            // Ensure land exists
            let land = self.lands.read(land_id);
            assert(land.status == LandStatus::Pending, 'Land must be pending');

            // Assign inspector
            self.land_inspector_assignments.write(land_id, inspector);

            // Emit event
            self.emit(InspectorAssigned { land_id: land_id, inspector: inspector });
        }

        fn get_land_inspector(self: @ContractState, land_id: u256) -> Option<ContractAddress> {
            if self.land_inspector_assignments.read(land_id).is_zero() {
                Option::None
            } else {
                Option::Some(self.land_inspector_assignments.read(land_id))
            }
        }
    }

    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        fn only_owner(self: @ContractState, land_id: u256) -> bool {
            let land = self.lands.read(land_id);
            land.owner == get_caller_address()
        }

        fn only_inspector(self: @ContractState) -> bool {
            let caller = get_caller_address();
            self.land_inspectors.read(caller)
        }
    }
}
