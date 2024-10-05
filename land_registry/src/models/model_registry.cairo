mod ModelLandRegistry {
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

    #[derive(Drop, Serde, starknet::Store)]
    struct Land {
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: felt252,
        is_registered: bool,
        is_verified: bool,
        last_transaction_timestamp: u64,
    }

    #[storage]
    struct Storage {
        lands: LegacyMap<u256, Land>,
        owner_lands: LegacyMap<ContractAddress, Array<u256>>,
        owner_land_count: LegacyMap<ContractAddress, u256>,
        land_nft: ContractAddress,
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct LandDetails {
        owner: ContractAddress,
        area: u256,
        location: felt252,
        status: felt252,
    }
}
