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

    #[external(v0)]
    fn approve_transaction(self: @ContractState, transaction_id: u256) {
        let caller = get_caller_address();
        let transaction = self.transactions.read(transaction_id);
        assert(transaction.to_owner == caller, 'Caller is not the transaction owner');
        assert(transaction.status == 0, 'Transaction is not pending');
        transaction.status = 1; // 1 for approved
        transaction.completion_date = get_block_timestamp();
        self.transactions.write(transaction_id, transaction);
    }

    #[external(v0)]
    fn reject_transaction(self: @ContractState, transaction_id: u256) {
        let caller = get_caller_address();
        let transaction = self.transactions.read(transaction_id);
        assert(transaction.from_owner == caller, 'Caller is not the transaction owner');
        assert(transaction.status == 0, 'Transaction is not pending');
        transaction.status = 2; // 2 for rejected
        self.transactions.write(transaction_id, transaction);
    }

    #[external(v0)]
    fn get_transaction_details(self: @ContractState, transaction_id: u256) -> Transaction {
        return self.transactions.read(transaction_id);
    }

    #[external(v0)]
    fn get_transaction_status(self: @ContractState, transaction_id: u256) -> u8 {
        return self.transactions.read(transaction_id).status;
    }

    #[external(v0)]
    fn get_transaction_initiation_date(self: @ContractState, transaction_id: u256) -> u64 {
        return self.transactions.read(transaction_id).initiation_date;
    }

    #[external(v0)]
    fn get_transaction_completion_date(self: @ContractState, transaction_id: u256) -> u64 {
        return self.transactions.read(transaction_id).completion_date;
    }       

    #[external(v0)]
    fn get_transaction_type(self: @ContractState, transaction_id: u256) -> u8 {
        return self.transactions.read(transaction_id).transaction_type;
    }

    #[external(v0)]
    fn get_transaction_from_owner(self: @ContractState, transaction_id: u256) -> ContractAddress {
        return self.transactions.read(transaction_id).from_owner;
    }   

    #[external(v0)]
    fn get_transaction_to_owner(self: @ContractState, transaction_id: u256) -> ContractAddress {
        return self.transactions.read(transaction_id).to_owner;
    }
}