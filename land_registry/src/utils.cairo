pub mod utils {
    use starknet::ContractAddress;
    use core::poseidon::PoseidonTrait;
    use core::hash::{HashStateTrait, HashStateExTrait};
    use land_registry::interface::land_register::Location;

    pub const MODULO_BASE: u64 = 1000000000; // reduce the id to 9 digits

    pub fn create_land_id(
        caller: ContractAddress, timestamp: u64, location: Location, counter: u64,
    ) -> u64 {
        // Combine all inputs into a single hash operation
        let hash = PoseidonTrait::new()
            .update_with(caller)
            .update_with(timestamp)
            .update_with(location.latitude + location.longitude)
            .update_with(counter)
            .finalize();

        // Convert to u64 and ensure it's within range
        let land_id = hash.try_into().unwrap_or(0_u64);
        land_id % MODULO_BASE
    }
}
