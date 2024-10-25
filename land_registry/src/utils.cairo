//helper functions
use starknet::{get_caller_address, get_block_timestamp, ContractAddress};
use core::poseidon::PoseidonTrait;
use core::hash::{HashStateTrait, HashStateExTrait};
use land_registry::interface::Location;

//LandHelpers

pub fn create_land_id(caller: ContractAddress, timestamp: u64, location: Location) -> u256 {
    let caller_hash = PoseidonTrait::new().update_with(caller).finalize();
    let timestamp_hash = PoseidonTrait::new().update_with(timestamp).finalize();
    let location_hash = PoseidonTrait::new()
        .update_with(location.latitude + location.longitude)
        .finalize();

    let felt_land_id = caller_hash + timestamp_hash + location_hash;
    let land_id: u256 = felt_land_id.into();
    land_id
}
