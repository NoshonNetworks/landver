#[starknet::contract]
mod ModelVerification {

    #[storage]
    struct Storage {
        land_registry: ContractAddress,
        verifiers: LegacyMap<ContractAddress, bool>,
    }
}
