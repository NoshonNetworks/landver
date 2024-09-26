#[starknet::contract]
mod ModelLandHolder {
    use starknet::get_caller_address;
    use starknet::ContractAddress;

    use ModelLandRegistry::{LandRegistered};
    
    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        LandHolder: LandHolder
    }
    
    #[derive(Drop, starknet::Event)]
    pub struct LandHolder {
        pub owner: ContractAddress,
        pub land: LandRegistered,
        pub document_hash: felt252
    }
}