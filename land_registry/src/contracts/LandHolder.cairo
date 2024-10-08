#[starknet::contract]
mod LandHolder {
    use super::{ILandHolder, LandRegistered, ContractAddress};
    use core::starknet::get_caller_address;

    #[storage]
    struct Storage {
        lands: Map<u256, LandRegistered>,
        owner_lands: Map<ContractAddress, Array<u256>>,
    }

    #[constructor]
    fn constructor(ref self: ContractState) { // Initialize any necessary state
    }

    #[external(v0)]
    impl LandHolderImpl of ILandHolder<ContractState> {
        fn get_registered_land(
            self: @ContractState, land_id: u256, document_hash: felt252
        ) -> Option<LandRegistered> {
            let land = self.lands.read(land_id);
            if land.document_hash == document_hash {
                Option::Some(land)
            } else {
                Option::None
            }
        }

        fn get_all_registered_lands(
            self: @ContractState, owner: ContractAddress
        ) -> Array<LandRegistered> {
            let mut result = ArrayTrait::new();
            let land_ids = self.owner_lands.read(owner);
            let mut i = 0;
            loop {
                if i >= land_ids.len() {
                    break;
                }
                let land_id = *land_ids.at(i);
                let land = self.lands.read(land_id);
                result.append(land);
                i += 1;
            };
            result
        }

        fn check_land_ownership(
            self: @ContractState, land_id: u256, owner: ContractAddress
        ) -> bool {
            let land = self.lands.read(land_id);
            land.owner == owner
        }

        fn update_land_document(
            ref self: ContractState, land_id: u256, new_document_hash: felt252
        ) {
            let mut land = self.lands.read(land_id);
            assert(land.owner == get_caller_address(), 'Only owner can update');
            land.document_hash = new_document_hash;
            self.lands.write(land_id, land);
        }

        fn remove_registered_land(ref self: ContractState, land_id: u256) {
            let land = self.lands.read(land_id);
            assert(land.owner == get_caller_address(), 'Only owner can remove');

            // Remove from lands mapping
            self
                .lands
                .write(
                    land_id,
                    LandRegistered { land_id: 0, owner: ContractAddress::from(0), document_hash: 0 }
                );

            // Remove from owner_lands array
            let mut owner_lands = self.owner_lands.read(land.owner);
            let mut i = 0;
            loop {
                if i >= owner_lands.len() {
                    break;
                }
                if *owner_lands.at(i) == land_id {
                    owner_lands.pop_front();
                    break;
                }
                i += 1;
            };
            self.owner_lands.write(land.owner, owner_lands);
        }
    }
}
