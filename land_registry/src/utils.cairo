pub mod utils {
    use starknet::ContractAddress;
    use core::poseidon::PoseidonTrait;
    use core::hash::{HashStateTrait, HashStateExTrait};
    use land_registry::interface::land_register::Location;

    pub const MODULO_BASE: u64 = 1000000000; // reduce the id to 9 digits

    pub fn create_land_id(
        caller: ContractAddress, timestamp: u64, location: Location, counter: u64,
    ) -> u64 {
        let caller_hash = PoseidonTrait::new().update_with(caller).finalize();
        let timestamp_hash = PoseidonTrait::new().update_with(timestamp).finalize();
        let location_hash = PoseidonTrait::new()
            .update_with(location.latitude + location.longitude)
            .update_with(counter * 255_u64)
            .finalize();

        let felt_land_id = caller_hash + timestamp_hash + location_hash;
        let mut land_id: u64 = felt_land_id.try_into().unwrap();
        land_id = land_id % MODULO_BASE;
        land_id
    }
}
