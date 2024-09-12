#[starknet::contract]
mod LandTransaction {
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
    }

    #[external(v0)]
    fn create_transaction(
        self: @ContractState,
        transaction_id: u256,
        land_id: u256,
        to_owner: ContractAddress,
        transaction_type: u8
    ) {
        let caller = get_caller_address();
        let land = LandRegistry::lands::read(land_id);
        assert(land.owner == caller, 'Caller is not the land owner');

        let new_transaction = Transaction {
            land_id: land_id,
            from_owner: caller,
            to_owner: to_owner,
            transaction_type: transaction_type,
            status: 0, // 0 for pending
            initiation_date: 0, // TODO: Implement timestamp
            completion_date: 0,
        };
        self.transactions.write(transaction_id, new_transaction);

        self.emit(Event::TransactionCreated(TransactionCreated {
            transaction_id: transaction_id,
            land_id: land_id,
            from_owner: caller,
            to_owner: to_owner,
            transaction_type: transaction_type,
        }));
    }

    // Implement other functions like approve_transaction, reject_transaction, get_transaction_details, etc.
}