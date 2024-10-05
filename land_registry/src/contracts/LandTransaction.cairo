use starknet::ContractAddress;
use models::ModelLandTransaction;

#[starknet::contract]
mod LandTransaction {
    #[constructor]
    fn constructor(ref self: ContractState, land_registry: ContractAddress) {
        self.land_registry.write(land_registry);
    }

    #[external(v0)]
    fn create_transaction(
        ref self: ContractState,
        land_id: u256,
        from_owner: ContractAddress,
        to_owner: ContractAddress,
        transaction_type: u8
    ) -> u256 {
        assert(
            get_caller_address() == self.land_registry.read(),
            'Only LandRegistry can create transactions'
        );

        let transaction_id = self.transaction_count.read() + 1;
        self.transaction_count.write(transaction_id);

        let transaction = Transaction {
            land_id: land_id,
            from_owner: from_owner,
            to_owner: to_owner,
            transaction_type: transaction_type,
            status: 0, // 0 for pending
            initiation_date: get_block_timestamp(),
            completion_date: 0,
        };
        self.transactions.write(transaction_id, transaction);

        self
            .emit(
                Event::TransactionCreated(
                    TransactionCreated {
                        transaction_id: transaction_id,
                        land_id: land_id,
                        from_owner: from_owner,
                        to_owner: to_owner,
                        transaction_type: transaction_type,
                    }
                )
            );

        transaction_id
    }

    #[external(v0)]
    fn approve_transaction(ref self: ContractState, transaction_id: u256) {
        let caller = get_caller_address();
        let mut transaction = self.transactions.read(transaction_id);
        assert(transaction.to_owner == caller, 'Caller is not the transaction owner');
        assert(transaction.status == 0, 'Transaction is not pending');
        transaction.status = 1; // 1 for approved
        transaction.completion_date = get_block_timestamp();
        self.transactions.write(transaction_id, transaction);

        // Call LandRegistry to transfer the land
        ILandRegistry::transfer_land(
            self.land_registry.read(), transaction.land_id, transaction.to_owner
        );
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

#[starknet::interface]
trait ILandRegistry {
    fn transfer_land(ref self: ContractState, land_id: u256, new_owner: ContractAddress);
}
