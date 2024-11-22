const { ethers } = require('ethers');
const LandRegistryABI = require('../abis/LandRegistry.json');
const dotenv = require('dotenv');
const crypto = require('crypto');


dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);
const contractAddress = process.env.LAND_REGISTRY_CONTRACT_ADDRESS;

const contract = new ethers.Contract(contractAddress, LandRegistryABI, signer);

function generateLandId() {
  return crypto.randomBytes(16).toString('hex');
}

async function registerLand(owner, location, area, landUse, documentHash) {
  try {
    console.log('Attempting to register land on blockchain...');
    console.log('Parameters:', { owner, location, area, landUse, documentHash });
    
    const landId = generateLandId();
    console.log('Generated landId:', landId);

    let areaBigNumber = ethers.parseUnits(area.toString(), 0);

    console.log('Calling contract.registerLand with parameters:', landId, owner, location, areaBigNumber.toString(), landUse, documentHash);
    const tx = await contract.registerLand(landId, owner, location, areaBigNumber, landUse, documentHash);
    console.log('Transaction sent:', tx.hash);
    
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.transactionHash);
    
    return { success: true, landId, transactionHash: receipt.transactionHash };
  } catch (error) {
    console.error('Error registering land on blockchain:', error);
    return { success: false, error: error.message, stack: error.stack };
  }
}

async function getLandDetails(landId) {
  try {
    console.log('Fetching land details from blockchain for landId:', landId);
    const landDetails = await contract.getLandDetails(landId);
    console.log('Raw land details fetched:', landDetails);
    
    if (!landDetails || !landDetails.landId) {
      console.log('Land details not found for landId:', landId);
      return null;
    }
    
    // Check if landDetails is an array (some contracts return arrays instead of objects)
    if (Array.isArray(landDetails)) {
      return {
        landId: landDetails[0],
        owner: landDetails[1],
        location: landDetails[2],
        area: ethers.formatUnits(landDetails[3], 0),
        landUse: landDetails[4],
        isRegistered: landDetails[5],
        isVerified: landDetails[6],
        documentHash: landDetails[7],
        lastTransactionTimestamp: Number(landDetails[8])
      };
    }
    
    return {
      landId: landDetails.landId,
      owner: landDetails.owner,
      location: landDetails.location,
      area: ethers.formatUnits(landDetails.area, 0),
      landUse: landDetails.landUse,
      isRegistered: landDetails.isRegistered,
      isVerified: landDetails.isVerified,
      documentHash: landDetails.documentHash,
      lastTransactionTimestamp: Number(landDetails.lastTransactionTimestamp)
    };
  } catch (error) {
    console.error('Error fetching land details from blockchain:', error);
    throw error;
  }
}

async function verifyLand(landId) {
  try {
    console.log('Verifying land on blockchain...');
    const tx = await contract.verifyLand(landId);
    console.log('Transaction sent:', tx.hash);
    
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.transactionHash);
    
    return { success: true, transactionHash: receipt.transactionHash };
  } catch (error) {
    console.error('Error verifying land on blockchain:', error);
    return { success: false, error: error.message, stack: error.stack };
  }
}

const getInspectors = async () => {
    try {
        console.log('Fetching inspectors from blockchain...');
        // Call the smart contract method to get inspectors
        const inspectors = await contract.getInspectors();
        
        // Transform the raw data into a more useful format
        return inspectors.map(inspector => ({
            address: inspector.addr,
            name: inspector.name,
            isActive: inspector.isActive,
            registrationDate: new Date(inspector.registrationDate * 1000).toISOString(),
            totalLandsInspected: inspector.landsInspected.toString()
        }));
    } catch (error) {
        console.error('Error fetching inspectors:', error);
        throw new Error('Failed to fetch inspectors from blockchain');
    }
};

const getApprovedLands = async () => {
    try {
        console.log('Fetching approved lands from blockchain...');
        // Get all approved lands from the contract
        const approvedLands = await contract.getApprovedLands();
        
        // Transform the raw blockchain data
        return approvedLands.map(land => ({
            id: land.id.toString(),
            owner: land.owner,
            location: land.location,
            area: ethers.utils.formatUnits(land.area, 'ether'), // If area is stored in wei
            landUse: land.landUse,
            approvalDate: new Date(land.approvalDate * 1000).toISOString(),
            inspectorAddress: land.inspector,
            status: land.status
        }));
    } catch (error) {
        console.error('Error fetching approved lands:', error);
        throw new Error('Failed to fetch approved lands from blockchain');
    }
};

const getLandTransferHistory = async (landId) => {
    try {
        console.log('Fetching transfer history for landId:', landId);
        // Get transfer events for the specific land
        const filter = contract.filters.LandTransferred(landId);
        const events = await contract.queryFilter(filter, 0, 'latest');
        
        // Transform the events into a readable format
        return events.map(event => ({
            transactionHash: event.transactionHash,
            blockNumber: event.blockNumber,
            timestamp: new Date(event.args.timestamp * 1000).toISOString(),
            previousOwner: event.args.from,
            newOwner: event.args.to,
            landId: event.args.landId.toString(),
            transferType: event.args.transferType
        }));
    } catch (error) {
        console.error('Error fetching transfer history:', error);
        throw new Error('Failed to fetch land transfer history');
    }
};

const verifyLandStatus = async (landId) => {
    try {
        console.log('Verifying land status on blockchain...');
        // Get land details from the contract
        const landDetails = await contract.getLand(landId);
        
        // Verify the land's status
        const isVerified = await contract.isLandVerified(landId);
        
        return {
            isVerified,
            details: {
                owner: landDetails.owner,
                status: landDetails.status,
                verificationDate: landDetails.verificationDate 
                    ? new Date(landDetails.verificationDate * 1000).toISOString()
                    : null,
                inspector: landDetails.inspector,
                lastUpdated: new Date(landDetails.lastUpdated * 1000).toISOString()
            }
        };
    } catch (error) {
        console.error('Error verifying land status:', error);
        throw new Error('Failed to verify land status');
    }
};

module.exports = {
  registerLand,
  getLandDetails,
  verifyLand,
  getInspectors,
  getApprovedLands,
  getLandTransferHistory,
  verifyLandStatus
};