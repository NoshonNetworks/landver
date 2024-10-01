#[starknet::contract]
mod LandVerification {
    use starknet::get_caller_address;
    use starknet::ContractAddress;
    use super::LandRegistry;
    use super::ILandRegistry;

    #[constructor]
    fn constructor(ref self: ContractState, land_registry: ContractAddress) {
        self.land_registry.write(land_registry);
    }

    #[external(v0)]
    fn add_verifier(ref self: ContractState, verifier: ContractAddress) {
        // Only contract owner should be able to add verifiers
        self.verifiers.write(verifier, true);
    }

    #[external(v0)]
    fn verify_land(ref self: ContractState, land_id: u256) {
        let caller = get_caller_address();
        assert(self.verifiers.read(caller), 'Caller is not an authorized verifier');

        ILandRegistry::verify_land(self.land_registry.read(), land_id, caller);
    }

    // Implement (reject_land_verification, get_land_verification_status, etc.)
}


