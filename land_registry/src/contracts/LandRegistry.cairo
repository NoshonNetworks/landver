use core::starknet::ContractAddress;

#[starknet::interface]
trait ILandRegistry<TContractState> {
    fn register_land(
        ref self: TContractState,
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: LandRegistry::LandUse,
    ) -> u256;
    fn transfer_land(ref self: TContractState, land_id: u256, new_owner: ContractAddress);
    fn verify_land(ref self: TContractState, land_id: u256) -> LandRegistry::Land;
    fn get_owner_lands(self: @TContractState, owner: ContractAddress) -> Array<u256>;
    fn update_land(ref self: TContractState, owner: ContractAddress, land_id: u256) -> Land;
}

#[starknet::contract]
mod LandRegistry {
    use super::ILandRegistry;
    use core::array::ArrayTrait;
    use core::starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use core::starknet::storage::{
        Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess
    };

    #[storage]
    struct Storage {
        lands: Map<u256, Land>,
        owners: Map<ContractAddress, Array<u256>>,
    }

    #[derive(Drop, Serde, starknet::Store)]
    pub struct Land {
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: LandUse,
        is_verified: bool,
        last_transaction_timestamp: u64,
    }

    enum LandUse {
        Residential,
        Commercial,
        Industrial,
        Recreational,
        Agricultural,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        LandRegistered: LandRegistered,
        LandTransferred: LandTransferred,
        LandVerified: LandVerified,
    }

    #[derive(Drop, starknet::Event)]
    struct LandRegistered {
        land_id: u256,
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct LandTransferred {
        land_id: u256,
        from_owner: ContractAddress,
        to_owner: ContractAddress,
    }

    #[Contructor]
    fn contructor(ref self: TContractSatate, deployer: ContractAddress) {
        let deployer_address = get_caller_address();
        emit!(ContractDeployed { deployer: deployer_address, });
    }
    #[derive(Drop)]
    struct Location {
        latitude: f64,
        longitude: f64,
    }

    #[abi(embed_v0)]
    impl LandRegistryImpl of ILandRegistry<TContractState> {
        fn register_land(
            ref self: TContractState,
            owner: OwnerAddress,
            location: Location,
            area: u256,
            land_use: LandUse,
        ) -> u256 {
            //we will use the block time stamp as the landid for now.
            let mut timestamp = get_block_timestamp();
            let land_id: u256 = timestamp.into();
            let new_land = Land {
                owner: OwnerAddress,
                location: location,
                area: area,
                land_use: LandUse,
                landid: landid,
            };

            //store the land in the lands map..
            let result = self.lands.insert(land_id, new_land);

            // Add the land Id the list of owner lands by for an owner such that we can retrieve all
            // the lands for a specific owner
            let owner_lands = self.owner_lands.entry(owner).or_insert(Vec::new());

            //Emit events for land registered. This will help use to track registered lands

            //How can we get owner lands?

            emit!(
                LandRegistered {
                    land_id: u256,
                    owner: ContractAddress,
                    location: felt252,
                    area: u256,
                    land_use: felt252,
                }
            );

            //finally return the landID
            land_id

            println!('You land has been succcessfully registered {:?}', result)
        }
    }
}
