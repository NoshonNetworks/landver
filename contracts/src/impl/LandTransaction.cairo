use models::ModelLandTransaction;
#[starknet::contract]
mod LandTransaction {

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