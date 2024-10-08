use starknet::ContractAddress;

#[starknet::interface]
trait ILandRegistry<TContractState> {
    fn register_land(
        ref self: TContractState,
        owner: ContractAddress,
        location: felt252,
        area: u256,
        land_use: felt252,
        document_hash: felt252
    ) -> u256;
    fn transfer_land(ref self: TContractState, land_id: u256, new_owner: ContractAddress);
    fn verify_land(ref self: TContractState, land_id: u256, verifier: ContractAddress);
    fn get_land_details(self: @TContractState, land_id: u256) -> Land;
    fn get_owner_lands(self: @TContractState, owner: ContractAddress) -> Array<u256>;
}

#[derive(Drop, Serde, starknet::Store)]
struct Land {
    owner: ContractAddress,
    location: felt252,
    area: u256,
    land_use: felt252,
    is_verified: bool,
    last_transaction_timestamp: u64,
    document_hash: felt252,
}

#[starknet::contract]
mod LandRegistry {
    use super::{ILandRegistry, Land, ContractAddress};
    use starknet::{get_caller_address, get_block_timestamp};
    use land_registry::contracts::LandNFT::{ILandNFTDispatcher, ILandNFTDispatcherTrait};
    use starknet::storage::Map;

    #[storage]
    struct Storage {
        land_nft: ILandNFTDispatcher,
        verifiers: Map<ContractAddress, bool>,
        next_land_id: u256,
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

    #[derive(Drop, starknet::Event)]
    struct LandVerified {
        land_id: u256,
        verifier: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, initial_verifier: ContractAddress, land_nft_address: ContractAddress) {
        self.verifiers.write(initial_verifier, true);
        self.land_nft.write(ILandNFTDispatcher { contract_address: land_nft_address });
        self.next_land_id.write(1);
    }

    #[external(v0)]
    #abi_embedV0
    impl LandRegistryImpl of ILandRegistry<ContractState> {
        fn register_land(
            ref self: ContractState,
            owner: ContractAddress,
            location: felt252,
            area: u256,
            land_use: felt252,
            document_hash: felt252
        ) -> u256 {
            let land_id = self.next_land_id.read();
            self.next_land_id.write(land_id + 1);

            self.land_nft.read().mint_land(owner, land_id, location, area, land_use, document_hash);

            self.emit(LandRegistered { land_id, owner, location, area, land_use });

            land_id
        }

        fn transfer_land(ref self: ContractState, land_id: u256, new_owner: ContractAddress) {
            let caller = get_caller_address();
            let current_owner = self.land_nft.read().owner_of(land_id);
            assert(current_owner == caller, 'Only the current owner can transfer');

            self.land_nft.read().transfer_from(caller, new_owner, land_id);

            self.emit(LandTransferred { land_id, from_owner: caller, to_owner: new_owner });
        }

        fn verify_land(ref self: ContractState, land_id: u256, verifier: ContractAddress) {
            assert(self.verifiers.read(verifier), 'Not an authorized verifier');
            
            self.land_nft.read().verify_land(land_id, verifier);

            self.emit(LandVerified { land_id, verifier });
        }

        fn get_land_details(self: @ContractState, land_id: u256) -> Land {
            self.land_nft.read().get_land_details(land_id)
        }

        fn get_owner_lands(self: @ContractState, owner: ContractAddress) -> Array<u256> {
            self.land_nft.read().get_owner_lands(owner)
        }
    }
}