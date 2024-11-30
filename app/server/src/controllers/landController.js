const Land = require('../models/Land');
const blockchainService = require('../services/blockchainService');
const crypto = require('crypto');
const fs = require('fs');
const CustomError = require('../errors/CustomError');

exports.addLand = async (req, res, next) => {
    try {
        console.log('Received land registration request:', req.body);
        const { location, area, landUse, owner } = req.body;
        const document = req.file;

        if (!document) {
            throw new CustomError('Document is required', 400, 'DOCUMENT_REQUIRED');
        }

        console.log('Document received:', document);

        // Calculate document hash
        const fileBuffer = fs.readFileSync(document.path);
        const hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);
        const documentHash = hashSum.digest('hex');

        console.log('Document hash calculated:', documentHash);

        console.log('Registering land on blockchain...');
        // Register land on blockchain
        const blockchainResult = await blockchainService.registerLand(
            owner,
            location,
            area,
            landUse,
            documentHash
        );

        console.log('Blockchain registration result:', blockchainResult);

        if (!blockchainResult.success) {
            console.error('Blockchain registration failed:', blockchainResult.error);
            throw new CustomError('Failed to register land on blockchain', 500, 'BLOCKCHAIN_REGISTRATION_FAILED', blockchainResult.error);
        }

        console.log('Land registered on blockchain. Creating database entry...');
        const newLand = new Land({
            landId: blockchainResult.landId,
            owner,
            location,
            area: parseFloat(area),
            landUse,
            documentHash,
            documentPath: document.path
        });

        await newLand.save();
        console.log('Land saved to database:', newLand);

        res.status(201).json({ 
            message: 'Land added successfully', 
            land: newLand,
            blockchainTransactionHash: blockchainResult.transactionHash
        });
    } catch (error) {
        console.error('Error adding land:', error);
        next(error instanceof CustomError ? error : new CustomError('Error adding land', 500));
    }
};

exports.getAllLands = async (req, res, next) => {
    try {
        console.log('Attempting to fetch all lands');
        const lands = await Land.find();
        console.log(`Successfully fetched ${lands.length} lands`);
        res.status(200).json(lands);
    } catch (error) {
        console.error('Error in getAllLands:', error);
        next(new CustomError('Error fetching lands', 500));
    }
};

exports.getLandById = async (req, res, next) => {
    try {
        console.log('Fetching land with ID:', req.params.id);
        const land = await Land.findOne({ landId: req.params.id });
        if (!land) {
            console.log('Land not found in database');
            throw new CustomError('Land not found', 404, 'LAND_NOT_FOUND');
        }

        console.log('Land found in database:', land);

        // Get land details from blockchain
        console.log('Fetching blockchain details for land ID:', land.landId);
        let blockchainLandDetails;
        try {
            blockchainLandDetails = await blockchainService.getLandDetails(land.landId);
            console.log('Blockchain details:', blockchainLandDetails);
        } catch (blockchainError) {
            console.error('Error fetching blockchain details:', blockchainError);
            blockchainLandDetails = { message: 'Blockchain details not available' };
        }

        // Combine database and blockchain data
        const combinedLandDetails = {
            ...land.toObject(),
            blockchainDetails: blockchainLandDetails
        };

        res.status(200).json(combinedLandDetails);
    } catch (error) {
        console.error('Error in getLandById:', error);
        next(new CustomError('Error fetching land', 500));
    }
};

exports.verifyLand = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log('Verifying land with ID:', id);

        if (!id) {
            console.log('Land ID is undefined or empty');
            throw new CustomError('Land ID is required', 400, 'LAND_ID_REQUIRED');
        }

        const land = await Land.findOne({ landId: id });
        if (!land) {
            console.log('Land not found in database for ID:', id);
            throw new CustomError('Land not found in the database', 404, 'LAND_NOT_FOUND');
        }

        console.log('Land found in database:', land);

        res.status(200).json({
            isVerified: true,
            message: 'This land is registered in the LandVer Registry',
            landDetails: land
        });
    } catch (error) {
        console.error('Error in verifyLand:', error);
        next(new CustomError('Error verifying land', 500));
    }
};
