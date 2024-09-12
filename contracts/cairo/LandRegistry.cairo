#[starknet::contract]
mod LandRegistry {
    use starknet::get_caller_address;
    use starknet::ContractAddress;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        LandRegistered: LandRegistered,
        LandTransferred: LandTransferred,
        LandVerified: LandVerified,
    }

    #[derive(Drop, starknet::Event)]
    struct LandRegistered {
        land_id: u256,
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: felt252,
        document_hash: felt252,
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
        verifier: ContractAddress,
    }

    #[derive(Storage)]
    struct Land {
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: felt252,
        is_registered: bool,
        is_verified: bool,
        document_hash: felt252,
        last_transaction_timestamp: u64,
    }

    #[storage]
    struct Storage {
        lands: LegacyMap<u256, Land>,
        owner_lands: LegacyMap<(ContractAddress, u256), u256>,
        owner_land_count: LegacyMap<ContractAddress, u256>,
    }

    #[external(v0)]
    fn register_land(
        self: @ContractState,
        land_id: u256,
        location: felt252,
        area: u256,
        land_use: felt252,
        document_hash: felt252
    ) {
        let caller = get_caller_address();
        let new_land = Land {
            owner: caller,
            location: location,
            area: area,
            land_use: land_use,
            is_registered: true,
            is_verified: false,
            document_hash: document_hash,
            last_transaction_timestamp: 0,
        };
        self.lands.write(land_id, new_land);
        
        let count = self.owner_land_count.read(caller);
        self.owner_lands.write((caller, count), land_id);
        self.owner_land_count.write(caller, count + 1);

        self.emit(Event::LandRegistered(LandRegistered {
            land_id: land_id,
            owner: caller,
            location: location,
            area: area,
            land_use: land_use,
            document_hash: document_hash,
        }));
    }

    // Implement other functions like transfer_land, verify_land, get_land_details, etc.
}