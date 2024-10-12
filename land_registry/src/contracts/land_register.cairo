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
    // land approvals/rejection
}

#[starknet::contract]
mod LandRegistry {
    use super::ILandRegistry;
    use core::array::ArrayTrait;
    use core::option::OptionTrait;
    use core::traits::Into;
    use core::starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use core::starknet::storage::{
        Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess
    };


    //stores the lands and owners.
    #[storage]
    struct Storage {
        lands: Map<u256, Land>,
        owners: Map<ContractAddress, Array<u256>>,
    }

    //Land structure
    #[derive(Drop, Serde, starknet::Store)]
    pub struct Land {
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: LandUse,
        last_transaction_timestamp: u64,
    }


    #[derive(Drop, Serde, starknet::Store)]
    enum LandUse {
        Residential,
        Commercial,
        Industrial,
        Recreational,
        Agricultural,
    }

    //Events emitted by the contract
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

    //for deployer
    #[constructor]
    fn constructor(ref self: ContractState, deployer: ContractAddress) {
        let deployer_address = get_caller_address();
        self.emit(ContractDeployed { deployer: deployer_address });
    }

    //Main implementations

    #[abi(embed_v0)]
    impl LandRegistryImpl of ILandRegistry<ContractState> {
        fn register_land(
            ref self: ContractState,
            owner: ContractAddress,
            location: felt252,
            area: u256,
            land_use: LandUse,
        ) -> u256 {
            let timestamp = get_block_timestamp();
            let land_id: u256 = timestamp.into();
            let new_land = Land {
                owner, location, area, land_use, last_transaction_timestamp: timestamp,
            };

            self.lands.write(land_id, new_land);

            let mut owner_lands = self.owners.read(owner);
            owner_lands.append(land_id);
            self.owners.write(owner, owner_lands);

            self
                .emit(
                    LandRegistered { land_id, owner, location, area, land_use: land_use.into(), }
                );

            land_id
        }

        //Transfers land current owner to new owner
        //We should have a from, to address. ?

        fn transfer_land(ref self: ContractState, land_id: u256, new_owner: ContractAddress) {
            //read owner from landid
            let mut land = self.lands.read(land_id);
            let current_owner = land.owner;
            assert(current_owner == get_caller_address(), 'Not the land owner');

            land.owner = new_owner;
            land.last_transaction_timestamp = get_block_timestamp();
            self.lands.write(land_id, land);

            let mut current_owner_lands = self.owners.read(current_owner);
            let index = current_owner_lands.index_of(land_id);
            current_owner_lands.pop_front();
            self.owners.write(current_owner, current_owner_lands);

            let mut new_owner_lands = self.owners.read(new_owner);
            new_owner_lands.append(land_id);
            self.owners.write(new_owner, new_owner_lands);

            self.emit(LandTransferred { land_id, from_owner: current_owner, to_owner: new_owner });
        }

        fn verify_land(self: @ContractState, land_id: u256) -> Land {
            self.lands.read(land_id)
        }

        fn get_owner_lands(self: @ContractState, owner: ContractAddress) -> Array<u256> {
            self.owners.read(owner)
        }

        fn update_land(
            ref self: ContractState,
            land_id: u256,
            new_location: felt252,
            new_area: u256,
            new_land_use: LandUse
        ) -> Land {
            let mut land = self.lands.read(land_id);
            assert(land.owner == get_caller_address(), 'Not the land owner');

            land.location = new_location;
            land.area = new_area;
            land.land_use = new_land_use;
            land.last_transaction_timestamp = get_block_timestamp();

            self.lands.write(land_id, land);
            land
            //Updating land should  not change landid

            //Transaction time helps to get the timestamp of the specific transaction for
        //references.
        }
    }
}
