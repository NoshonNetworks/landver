#[starknet::contract]
mod LandVerification {
    use starknet::get_caller_address;
    use starknet::ContractAddress;
    use super::LandRegistry;



#[starknet::contract]
mod LandVerification {
    use starknet::get_caller_address;
    use starknet::ContractAddress;
    use super::LandRegistry;

pub  trait LandVerifier {
        // Function signature for land verification
        fn verify_land(self: @ContractState, land_id: u256);

        // Function signature for rejecting land verification
        fn reject_land_verification(self: @ContractState, land_id: u256);

        // Function signature for getting land verification status
        fn get_land_verification_status(self: @ContractState, land_id: u256) -> bool;

        // Function signature for getting the land verifier address
        fn get_land_verifier(self: @ContractState, land_id: u256) -> ContractAddress;

        // Function signature for getting land verification timestamp
        fn get_land_verification_timestamp(self: @ContractState, land_id: u256) -> u64;

        // Function signature for getting the reason for land verification
        fn get_land_verification_reason(self: @ContractState, land_id: u256) -> felt252;
}

    // Now we implement the `LandVerifier` trait for the `LandVerification` contract

}

    #[external(v0)]
    impl LandVerifier of LandVerification {
        fn verify_land(self: @ContractState, land_id: u256) {
            let caller = get_caller_address();
            let mut land = LandRegistry::lands::read(land_id);
            assert(land.is_registered == true, 'Land is not registered');
            assert(land.is_verified == false, 'Land is already verified');

            // Update land verification status
            land.is_verified = true;
            LandRegistry::lands::write(land_id, land);

            LandRegistry::emit(LandRegistry::Event::LandVerified(LandRegistry::LandVerified {
                land_id: land_id,
                verifier: caller,
            }));
        }

        #[external(v0)]
        fn reject_land_verification(self: @ContractState, land_id: u256) {
            let caller = get_caller_address();
            let mut land = LandRegistry::lands::read(land_id);
            assert(land.is_registered == true, 'Land is not registered');
            assert(land.is_verified == false, 'Land is already verified');
            
            // You can add the logic for rejecting verification here
        }

        #[external(v0)]
        fn get_land_verification_status(self: @ContractState, land_id: u256) -> bool {
            return LandRegistry::lands::read(land_id).is_verified;
        }

        #[external(v0)]
        fn get_land_verifier(self: @ContractState, land_id: u256) -> ContractAddress {
            return LandRegistry::lands::read(land_id).verifier;
        }

        #[external(v0)]
        fn get_land_verification_timestamp(self: @ContractState, land_id: u256) -> u64 {
            return LandRegistry::lands::read(land_id).verification_timestamp;
        }

        #[external(v0)]
        fn get_land_verification_reason(self: @ContractState, land_id: u256) -> felt252 {
            return LandRegistry::lands::read(land_id).verification_reason;
        }
        //TODO: Implement other functions like reject_land_verification, get_land_verification_status, etc.
    }
}
