mod ModelLandTransaction {
    use starknet::get_caller_address;
    use starknet::ContractAddress;
    use super::LandRegistry;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        TransactionCreated: TransactionCreated,
    }

    #[derive(Drop, starknet::Event)]
    struct TransactionCreated {
        transaction_id: u256,
        land_id: u256,
        from_owner: ContractAddress,
        to_owner: ContractAddress,
        transaction_type: u8,
    }

    #[derive(Storage)]
    struct Transaction {
        land_id: u256,
        from_owner: ContractAddress,
        to_owner: ContractAddress,
        transaction_type: u8,
        status: u8,
        initiation_date: u64,
        completion_date: u64,
    }

    #[storage]
    struct Storage {
        transactions: LegacyMap<u256, Transaction>,
        transaction_count: u256,
        land_registry: ContractAddress,
    }
}
