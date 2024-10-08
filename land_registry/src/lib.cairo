mod contracts {
    mod LandRegistry;
    mod LandNFT;
}

mod tests {
    mod test_land_registry;
}

use contracts::LandRegistry::{LandRegistry, ILandRegistry, ILandRegistryDispatcher, ILandRegistryDispatcherTrait};
use contracts::LandNFT::{LandNFT, ILandNFT, ILandNFTDispatcher, ILandNFTDispatcherTrait};

use contracts::LandRegistry::Land;
use contracts::LandNFT::LandDetails;

