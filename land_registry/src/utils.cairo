pub mod utils {
    use starknet::ContractAddress;
    use core::poseidon::PoseidonTrait;
    use core::hash::{HashStateTrait, HashStateExTrait};
    use land_registry::interface::land_register::{Location, LandUse};

    pub const MODULO_BASE: u256 = 100000000000000000000000000000000;    // reduce the id to 32 digits

    pub fn create_land_id(
        caller: ContractAddress, timestamp: u64, location: Location, counter: u256
    ) -> u256 {
        let caller_hash = PoseidonTrait::new().update_with(caller).finalize();
        let timestamp_hash = PoseidonTrait::new().update_with(timestamp).finalize();
        let location_hash = PoseidonTrait::new()
            .update_with(location.latitude + location.longitude)
            .update_with(counter * 255_u256)
            .finalize();

        let felt_land_id = caller_hash + timestamp_hash + location_hash;
        let mut land_id: u256 = felt_land_id.into();
        land_id = land_id % MODULO_BASE;
        land_id
    }

    pub impl LandUseIntoOptionFelt252 of Into<LandUse, Option<felt252>> {
        fn into(self: LandUse) -> Option<felt252> {
            match self {
                LandUse::Residential => Option::Some('residential'),
                LandUse::Commercial => Option::Some('commercial'),
                LandUse::Industrial => Option::Some('industrial'),
                LandUse::Agricultural => Option::Some('agricultural'),
                LandUse::Recreational => Option::Some('recreational'),
                LandUse::Institutional => Option::Some('institutional'),
                LandUse::MixedUse => Option::Some('mixeduse'),
                LandUse::Unclassified => Option::None,
            }
        }
    }
}
