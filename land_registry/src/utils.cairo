pub mod utils {
    use starknet::ContractAddress;
    use land_registry::interface::land_register::Location;

    pub const MODULO_BASE: u64 = 1000000000; // reduce the id to 9 digits

    pub fn create_land_id(
        caller: ContractAddress, timestamp: u64, location: Location, counter: u64,
    ) -> u64 {
        // Simple deterministic combination of inputs
        let caller_felt: felt252 = caller.into();
        let caller_num: u64 = (caller_felt.try_into().unwrap_or(0_u64)) % 1000000;

        // Combine location coordinates into a single number
        let loc_num = ((location.latitude.try_into().unwrap_or(0_u64) % 1000) * 1000
            + (location.longitude.try_into().unwrap_or(0_u64) % 1000)) % 1000000;

        // Final combination
        let id = (timestamp % 1000) * 1000000
            + (counter % 100) * 10000
            + (caller_num + loc_num) % 10000;

        id % MODULO_BASE
    }
}
