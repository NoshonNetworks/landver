const LandOwner = require('../models/LandOwner');
const blockchainService = require('../services/blockchainService');

exports.registerLandOwner = async (req, res) => {
  try {
    const newLandOwner = new LandOwner(req.body);
    await newLandOwner.save();
    res.status(201).json({ message: 'Land owner registered successfully', landOwner: newLandOwner });
  } catch (error) {
    res.status(400).json({ message: 'Error registering land owner', error: error.message });
  }
};

exports.getAllLandOwners = async (req, res) => {
  try {
    const landOwners = await LandOwner.find().populate('ownedLands');
    res.status(200).json(landOwners);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching land owners', error: error.message });
  }
};

exports.getLandOwner = async (req, res) => {
  try {
    const landOwner = await LandOwner.findById(req.params.id).populate('ownedLands');
    if (!landOwner) {
      return res.status(404).json({ message: 'Land owner not found' });
    }

    // Get owner's lands from blockchain
    const blockchainLands = await blockchainService.getOwnerLands(landOwner.walletAddress);

    // Combine database and blockchain data
    const combinedLandOwnerDetails = {
      ...landOwner.toObject(),
      blockchainLands: blockchainLands
    };

    res.status(200).json(combinedLandOwnerDetails);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching land owner', error: error.message });
  }
};

exports.updateLandOwner = async (req, res) => {
  try {
    const updatedLandOwner = await LandOwner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLandOwner) {
      return res.status(404).json({ message: 'Land owner not found' });
    }
    res.status(200).json({ message: 'Land owner updated successfully', landOwner: updatedLandOwner });
  } catch (error) {
    res.status(400).json({ message: 'Error updating land owner', error: error.message });
  }
};

exports.deleteLandOwner = async (req, res) => {
  try {
    const deletedLandOwner = await LandOwner.findByIdAndDelete(req.params.id);
    if (!deletedLandOwner) {
      return res.status(404).json({ message: 'Land owner not found' });
    }
    res.status(200).json({ message: 'Land owner deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting land owner', error: error.message });
  }
};