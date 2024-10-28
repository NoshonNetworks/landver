const LandOwner = require('../models/LandOwner');
const blockchainService = require('../services/blockchainService');
const CustomError = require('../errors/CustomError');

exports.registerLandOwner = async (req, res, next) => {
  try {
    const newLandOwner = new LandOwner(req.body);
    await newLandOwner.save();
    res.status(201).json({ message: 'Land owner registered successfully', landOwner: newLandOwner });
  } catch (error) {
    next(new CustomError('Error registering land owner', 400, 'LAND_OWNER_REGISTRATION_ERROR', error.message));
  }
};

exports.getAllLandOwners = async (req, res, next) => {
  try {
    const landOwners = await LandOwner.find().populate('ownedLands');
    res.status(200).json(landOwners);
  } catch (error) {
    next(new CustomError('Error fetching land owners', 500, 'FETCH_LAND_OWNERS_ERROR', error.message));
  }
};

exports.getLandOwner = async (req, res, next) => {
  try {
    const landOwner = await LandOwner.findById(req.params.id).populate('ownedLands');
    if (!landOwner) {
      throw new CustomError('Land owner not found', 404, 'LAND_OWNER_NOT_FOUND');
    }

    // Get owner's lands from blockchain
    const blockchainLands = await blockchainService.getOwnerLands(landOwner.walletAddress);

    // Combine database and blockchain data
    const combinedLandOwnerDetails = {
      ...landOwner.toObject(),
      blockchainLands
    };

    res.status(200).json(combinedLandOwnerDetails);
  } catch (error) {
    next(error instanceof CustomError ? error : new CustomError('Error fetching land owner', 500));
  }
};

exports.updateLandOwner = async (req, res, next) => {
  try {
    const updatedLandOwner = await LandOwner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLandOwner) {
      throw new CustomError('Land owner not found', 404, 'LAND_OWNER_NOT_FOUND');
    }
    res.status(200).json({ message: 'Land owner updated successfully', landOwner: updatedLandOwner });
  } catch (error) {
    next(new CustomError('Error updating land owner', 500, 'UPDATE_LAND_OWNER_ERROR', error.message));
  }
};

exports.deleteLandOwner = async (req, res, next) => {
  try {
    const deletedLandOwner = await LandOwner.findByIdAndDelete(req.params.id);
    if (!deletedLandOwner) {
      throw new CustomError('Land owner not found', 404, 'LAND_OWNER_NOT_FOUND');
    }
    res.status(200).json({ message: 'Land owner deleted successfully' });
  } catch (error) {
    next(new CustomError('Error deleting land owner', 500, 'DELETE_LAND_OWNER_ERROR', error.message));
  }
};
