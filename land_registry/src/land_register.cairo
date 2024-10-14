#[starknet::contract]
pub mod LandRegistryContract {
    use starknet::{get_caller_address, get_block_timestamp, ContractAddress};
    use land_registry::interface::{ILandRegistry, Land, LandUse};
    use core::array::ArrayTrait;
    use core::array::SpanTrait;
    use starknet::storage::{Map, StorageMapWriteAccess};

    #[storage]
    struct Storage {
        lands: Map::<u256, Land>,
        owner_lands: Map::<ContractAddress, Span<u256>>,
        land_count: u256,
    }


    //lands

    //What are we storing?

    //lands, owners?

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        LandRegistered: LandRegistered,
        LandTransferred: LandTransferred,
        LandVerified: LandVerified,
        LandUpdated: LandUpdated,
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

    #[derive(Drop, starknet::Event)]
    struct LandVerified {
        land_id: u256,
    }
    #[derive(Drop, Copy, starknet::Event)]
    struct LandUpdated {
        land_id: u256,
        land_use: felt252,
        area: u256
    }

    #[abi(embed_v0)]
    impl LandRegistry of ILandRegistry<ContractState> {
        fn register_land(
            ref self: ContractState, location: felt252, area: u256, land_use: LandUse,
        ) -> u256 {
            let caller = get_caller_address();
            let timestamp = get_block_timestamp();
            let land_id = timestamp.into() + 1;

            let new_land = Land {
                owner: caller,
                location: location,
                area: area,
                land_use: land_use,
                last_transaction_timestamp: timestamp,
            };

            self.lands.write(land_id, new_land);
            self.land_count.write(land_id);

            self
                .emit(
                    LandRegistered {
                        land_id: land_id,
                        owner: caller,
                        location: location,
                        area: area,
                        land_use: land_use.into(),
                    }
                );

            land_id
        }

        fn get_land(self: @ContractState, land_id: u256) -> Land {
            self.lands.read(land_id)
        }

        fn update_land(ref self: ContractState, land_id: u256, area: u256, land_use: LandUse) {
            self.lands.write(land_id, Land { area, land_use, ..self.lands.read(land_id) });

            self.emit(LandUpdated { land_id: land_id, area: area, land_use: land_use.into(), });
        }

        fn transfer_land(ref self: ContractState, land_id: u256, new_owner: ContractAddress) {
            let land = self.lands.read(land_id);
            self.lands.write(land_id, Land { owner: new_owner, ..land });
        }
    }
}
