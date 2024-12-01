const { ethers } = require('ethers');
const LandRegistryABI = require('../abis/LandRegistry.json');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey || !privateKey.startsWith('0x')) {
  throw new Error('Invalid private key format in .env. Must start with 0x');
}

const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);
const contractAddress = process.env.LAND_REGISTRY_CONTRACT_ADDRESS;
if (!contractAddress || !contractAddress.startsWith('0x')) {
  throw new Error('Invalid or missing LAND_REGISTRY_CONTRACT_ADDRESS in .env');
}
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

module.exports = {
  registerLand,
  getLandDetails,
  verifyLand
};