#[starknet::contract]
mod LandInspector {
    use super::{ILandInspector, LandDetails, ContractAddress, ArrayTrait};
    use starknet::get_caller_address;

    #[storage]
    struct Storage {
        land_registry: ContractAddress,
        inspectors: LegacyMap<ContractAddress, bool>,
        pending_requests: Array<u256>,
        land_details: LegacyMap<u256, LandDetails>,
        request_status: LegacyMap<u256, felt252>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, land_registry: ContractAddress, initial_inspector: ContractAddress) {
        self.land_registry.write(land_registry);
        self.inspectors.write(initial_inspector, true);
    }

    #[external(v0)]
    impl LandInspectorImpl of super::ILandInspector<ContractState> {
        fn receive_land_request(ref self: ContractState, land_id: u256) {
            // Only land registry can submit requests
            assert(get_caller_address() == self.land_registry.read(), 'Unauthorized');
            self.pending_requests.write(self.pending_requests.read() + 1);
            self.request_status.write(land_id, 'pending');
        }

        fn view_land(self: @ContractState, land_id: u256) -> LandDetails {
            assert(self.inspectors.read(get_caller_address()), 'Not an inspector');
            self.land_details.read(land_id)
        }

        fn approve_land_request(ref self: ContractState, land_id: u256) {
            assert(self.inspectors.read(get_caller_address()), 'Not an inspector');
            assert(self.request_status.read(land_id) == 'pending', 'Not pending');
            self.request_status.write(land_id, 'approved');
            self._remove_from_pending(land_id);
            // TODO: Notify land registry of approval
        }

        fn reject_land_request(ref self: ContractState, land_id: u256, reason: felt252) {
            assert(self.inspectors.read(get_caller_address()), 'Not an inspector');
            assert(self.request_status.read(land_id) == 'pending', 'Not pending');
            self.request_status.write(land_id, 'rejected');
            // TODO: Store rejection reason
            self._remove_from_pending(land_id);
            // TODO: Notify land registry of rejection
        }

        fn delete_land_request(ref self: ContractState, land_id: u256) {
            assert(get_caller_address() == self.land_registry.read(), 'Unauthorized');
            self.request_status.write(land_id, 'deleted');
            self._remove_from_pending(land_id);
        }

        fn get_pending_requests(self: @ContractState) -> Array<u256> {
            self.pending_requests.read()
        }

        fn is_inspector(self: @ContractState, address: ContractAddress) -> bool {
            self.inspectors.read(address)
        }
    }
}