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

    // Ensure area is a BigNumber
    let areaBigNumber;
    try {
      if (typeof area === 'string' && area.trim() !== '') {
        areaBigNumber = ethers.parseUnits(area.trim(), 0); // Use parseUnits with 0 decimals for whole numbers
      } else if (typeof area === 'number') {
        areaBigNumber = ethers.parseUnits(Math.floor(area).toString(), 0);
      } else {
        throw new Error('Invalid area value');
      }
    } catch (error) {
      console.error('Error converting area to BigNumber:', error);
      throw new Error(`Invalid area value: ${area}`);
    }

    console.log('Calling contract.registerLand with parameters:', landId, owner, location, areaBigNumber.toString(), landUse, documentHash);
    const tx = await contract.registerLand(landId, owner, location, areaBigNumber, landUse, documentHash);
    console.log('Transaction sent:', tx.hash);
    
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.transactionHash);
    
    return { success: true, landId };
  } catch (error) {
    console.error('Error registering land on blockchain:', error);
    return { success: false, error: error.message, stack: error.stack };
  }
}

// ... (other functions remain the same)

module.exports = {
  registerLand,
  // ... (other exported functions)
};