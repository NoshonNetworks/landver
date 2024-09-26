pub trait LandHolderTrait {
    /// Retrieve a registered land by its ID and document hash
    fn get_registered_land(&mut self, land_id: u256, document_hash: felt252) -> Option<LandRegistered>;

    /// Retrieve all registered lands for a specific owner
    fn get_all_registered_lands(&mut self, owner: ContractAddress) -> Vec<LandRegistered>;

    /// Check if an address owns a specific land
    fn check_land_ownership(&mut self, land_id: u256, owner: ContractAddress) -> bool;

    /// Update the document hash for a registered land
    fn update_land_document(&mut self, land_id: u256, new_document_hash: felt252);

    /// Remove a registered land
    fn remove_registered_land(&mut self, land_id: u256);
}
