use core::starknet::ContractAddress;
use super land_registry::LandDetails;

#[starknet::interface]

pub trait ILandNFT<TContractState> {
    fn mint_land(
        ref self: TContractState,
        to: ContractAddress,
        token_id: u256,
        location: felt252,
        area: u256,
        land_use: felt252,
        document_hash: felt252
    );
    fn verify_land(ref self: TContractState, token_id: u256, verifier: ContractAddress);
    fn get_land_details(self: @TContractState, token_id: u256) -> LandDetails;
    fn get_owner_lands(self: @TContractState, owner: ContractAddress) -> Array<u256>;
}

#[starknet::contract]
pub mod LandNFT {
    use starknet::ContractAddress;
    use openzeppelin::token::erc721::ERC721;
    use openzeppelin::access::ownable::OwnableComponent;
    use starknet::storage::Map;

    #[storage]
    struct Storage {
        land_registry: ContractAddress,
        land_details: Map<u256, LandDetails>,
        owner_lands: Map<ContractAddress, Array<u256>>,
    }

    #[derive(Drop, Serde, starknet::Store)]
    pub struct LandDetails {
        location: felt252,
        area: u256,
        land_use: felt252,
        is_verified: bool,
        document_hash: felt252,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        LandMinted: LandMinted,
        LandVerified: LandVerified,
    }

    #[derive(Drop, starknet::Event)]
    struct LandMinted {
        token_id: u256,
        owner: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct LandVerified {
        token_id: u256,
        verifier: ContractAddress,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        name: felt252,
        symbol: felt252,
        land_registry: ContractAddress
    ) {
        self.initializer(name, symbol);
        self.land_registry.write(land_registry);
        self._transfer_ownership(land_registry);
    }

    #[external(v0)]

    impl LandNFTImpl of ILandNFT<ContractState> {
        fn mint_land(
            ref self: ContractState,
            to: ContractAddress,
            token_id: u256,
            location: felt252,
            area: u256,
            land_use: felt252,
            document_hash: felt252
        ) {
            self.assert_only_owner();

            self._mint(to, token_id);

            let land_details = LandDetails {
                location,
                area,
                land_use,
                is_verified: false,
                document_hash,
            };
            self.land_details.write(token_id, land_details);

            let mut owner_lands = self.owner_lands.read(to);
            owner_lands.append(token_id);
            self.owner_lands.write(to, owner_lands);

            self.emit(LandMinted { token_id, owner: to });
        }

        fn verify_land(ref self: ContractState, token_id: u256, verifier: ContractAddress) {
            self.assert_only_owner();

            let mut land_details = self.land_details.read(token_id);
            land_details.is_verified = true;
            self.land_details.write(token_id, land_details);

            self.emit(LandVerified { token_id, verifier });
        }

        fn get_land_details(self: @ContractState, token_id: u256) -> LandDetails {
            self.land_details.read(token_id)
        }

        fn get_owner_lands(self: @ContractState, owner: ContractAddress) -> Array<u256> {
            self.owner_lands.read(owner)
        }
    }

    #[generate_trait]
    impl PrivateMethods of PrivateMethodsTrait {
        fn assert_only_owner(self: @ContractState) {
            let caller = starknet::get_caller_address();
            assert(caller == self.land_registry.read(), 'Only LandRegistry can call');
        }
    }
}
