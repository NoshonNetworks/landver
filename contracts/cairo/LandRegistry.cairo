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

    //TODO:Implement other functions like transfer_land, verify_land, get_land_details....
    #[external(v0)]
    fn transfer_land(self: @ContractState, land_id: u256, new_owner: ContractAddress) {
        let caller = get_caller_address();
        let land = self.lands.read(land_id);
        assert(land.owner == caller, 'Only the current owner can transfer the land');
        assert(land.is_registered, 'Land is not registered');
        land.owner = new_owner;
        self.lands.write(land_id, land);
        self.emit(Event::LandTransferred(LandTransferred {
            land_id: land_id,
            from_owner: caller,
            to_owner: new_owner,
        }));
    }

    #[external(v0)]
    fn get_land_details(self: @ContractState, land_id: u256) -> Land {
        return self.lands.read(land_id);
    }   

    #[external(v0)]
    fn get_owner_lands(self: @ContractState, owner: ContractAddress) -> Vec<u256> {
        let mut lands = Vec::new();
        let count = self.owner_land_count.read(owner);
        for i in 0..count {
            let land_id = self.owner_lands.read((owner, i));
            lands.push(land_id);
        }
        return lands;
    }

    #[external(v0)]
    fn get_land_count(self: @ContractState) -> u256 {
        return self.owner_land_count.read(get_caller_address());
    }   

    #[external(v0)]
    fn get_land_count_for_owner(self: @ContractState, owner: ContractAddress) -> u256 {
        return self.owner_land_count.read(owner);
    }

    #[external(v0)]
    fn get_land_owner(self: @ContractState, land_id: u256) -> ContractAddress {
        return self.lands.read(land_id).owner;
    }

    #[external(v0)]
    fn get_land_location(self: @ContractState, land_id: u256) -> felt252 {
        return self.lands.read(land_id).location;
    }       

    #[external(v0)]
    fn get_land_area(self: @ContractState, land_id: u256) -> u256 {
        return self.lands.read(land_id).area;
    }

    #[external(v0)]
    fn get_land_land_use(self: @ContractState, land_id: u256) -> felt252 {
        return self.lands.read(land_id).land_use;
    }

    #[external(v0)]
    fn get_land_document_hash(self: @ContractState, land_id: u256) -> felt252 {
        return self.lands.read(land_id).document_hash;
    }

    #[external(v0)]
    fn get_land_last_transaction_timestamp(self: @ContractState, land_id: u256) -> u64 {
        return self.lands.read(land_id).last_transaction_timestamp;
    }
}