#[starknet::contract]
pub mod LeaseManager {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use land_registry::interface::lease::{
        ILeaseManager, Lease, LeaseStatus,
        LeaseCreated, LeaseSigned, LeaseTerminated, LeaseTermsUpdated
    };
    use land_registry::interface::land_register::{ILandRegistryDispatcher, ILandRegistryDispatcherTrait};
    use land_registry::custom_error::Errors;

    #[storage]
    struct Storage {
        leases: Map::<u256, Lease>,
        lease_count: u256,
        land_leases: Map::<u256, Array<u256>>, // land_id -> lease_ids
        lessee_leases: Map::<ContractAddress, Array<u256>>, // lessee -> lease_ids
        lease_signatures: Map::<(u256, ContractAddress), bool>, // (lease_id, signer) -> signed
        land_registry: ContractAddress
    }

    #[constructor]
    fn constructor(ref self: ContractState, land_registry: ContractAddress) {
        self.land_registry.write(land_registry);
    }

    #[external(v0)]
    impl LeaseManagerImpl of ILeaseManager<ContractState> {
        fn create_lease(
            ref self: ContractState,
            land_id: u256,
            lessee: ContractAddress,
            start_date: u64,
            end_date: u64,
            rent_amount: u256,
            terms_hash: felt252
        ) -> u256 {
            let caller = get_caller_address();
            let land_registry = ILandRegistryDispatcher { contract_address: self.land_registry.read() };
            
            // Verify caller owns the land
            let land = land_registry.get_land(land_id);
            assert(land.owner == caller, Errors::ONLY_OWNER_CAN_LEASE);

            // Create new lease
            let lease_id = self.lease_count.read() + 1;
            let lease = Lease {
                lease_id,
                land_id,
                lessor: caller,
                lessee,
                start_date,
                end_date,
                rent_amount,
                status: LeaseStatus::Draft,
                terms_hash,
                last_updated: get_block_timestamp()
            };

            // Store lease
            self.leases.write(lease_id, lease);
            self.lease_count.write(lease_id);

            // Update mappings
            let mut land_leases = self.land_leases.read(land_id);
            land_leases.append(lease_id);
            self.land_leases.write(land_id, land_leases);

            let mut lessee_leases = self.lessee_leases.read(lessee);
            lessee_leases.append(lease_id);
            self.lessee_leases.write(lessee, lessee_leases);

            self.emit(LeaseCreated { lease_id, land_id, lessor: caller, lessee });

            lease_id
        }

        fn sign_lease(ref self: ContractState, lease_id: u256) {
            let caller = get_caller_address();
            let mut lease = self.leases.read(lease_id);
            
            assert(
                caller == lease.lessor || caller == lease.lessee, 
                Errors::ONLY_PARTIES_CAN_SIGN
            );

            // Record signature
            self.lease_signatures.write((lease_id, caller), true);

            // If both parties have signed, activate the lease
            if self.lease_signatures.read((lease_id, lease.lessor)) && 
               self.lease_signatures.read((lease_id, lease.lessee)) {
                lease.status = LeaseStatus::Active;
                self.leases.write(lease_id, lease);
            }

            self.emit(LeaseSigned { lease_id, signer: caller });
        }

        // Implement other interface functions...
    }
} 