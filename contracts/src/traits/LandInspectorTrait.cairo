use super::LandRegistry;

pub trait LandInsspectorTrait {

    fn recive_land_request(&mut self, land_id: u256);

    fn view_land(&mut self, land_id: u256);

    fn approve_land_request(&mut self, land_id: u256);

    fn reject_land_request(&mut self, land_id: u256);

    fn delete_land_request(&mut self, land_id: u256);
}