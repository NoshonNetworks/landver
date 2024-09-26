#[starknet::contract]
mod  ModelLandInspector { 
    use starknet::ContractAddress;
    use ModelLandRegistry::{LandRegistered, Land, LandVerified}

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        LandDelete: LandDelete,
        LandApprove: LandApprove,
        LandView: LandView,
        LandReject: LandReject
    }

    #[derive(Drop)]
    pub struct LandInspector {
        pub inspector_address: ContractAddress

    }

    #[derive(Drop)]
    pub struct LandDelete {
        land_id: u256,
        inspector_address: ContractAddress
    }

    #[derive(Drop)]
    pub struct LandApprove {
        land_id: u256,
        inspector_address: ContractAddress
    }

    #[derive(Drop)]
    pub struct LandView {
        land_id: u256,
        inspector_address: ContractAddress

    }

    #[derive(Drop)]
    pub struct LandReject {
        land_id: u256,
        inspector_address: ContractAddress
    }
}