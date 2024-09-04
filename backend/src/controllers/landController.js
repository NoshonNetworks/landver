const Land = require('../models/Land');
const blockchainService = require('../services/blockchainService');
const crypto = require('crypto');
const fs = require('fs');

exports.addLand = async (req, res) => {
    try {
        console.log('Received land registration request:', req.body);
        const { location, area, landUse, owner } = req.body;
        const document = req.file;

        if (!document) {
            return res.status(400).json({ message: 'Document is required' });
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
            area, // Pass area as is, blockchainService will handle conversion
            landUse,
            documentHash
        );

        console.log('Blockchain registration result:', blockchainResult);

        if (!blockchainResult.success) {
            console.error('Blockchain registration failed:', blockchainResult.error);
            return res.status(500).json({ message: 'Failed to register land on blockchain', error: blockchainResult.error });
        }

        console.log('Land registered on blockchain. Creating database entry...');
        const newLand = new Land({
            landId: blockchainResult.landId,
            owner,
            location,
            area: parseFloat(area), // Convert to number for database storage
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
        res.status(500).json({ message: 'Error adding land', error: error.message, stack: error.stack });
    }
};

exports.getAllLands = async (req, res) => {
    try {
        const lands = await Land.find();
        res.status(200).json(lands);
    } catch (error) {
        console.error('Error fetching lands:', error);
        res.status(500).json({ message: 'Error fetching lands', error: error.message });
    }
};

exports.getLandById = async (req, res) => {
    try {
        const land = await Land.findOne({ landId: req.params.id });
        if (!land) {
            return res.status(404).json({ message: 'Land not found' });
        }

        // Get land details from blockchain
        const blockchainLandDetails = await blockchainService.getLandDetails(land.landId);

        // Combine database and blockchain data
        const combinedLandDetails = {
            ...land.toObject(),
            blockchainDetails: blockchainLandDetails
        };

        res.status(200).json(combinedLandDetails);
    } catch (error) {
        console.error('Error fetching land:', error);
        res.status(500).json({ message: 'Error fetching land', error: error.message });
    }
};

exports.verifyLand = async (req, res) => {
    try {
        const { landId } = req.params;
        const land = await Land.findOne({ landId });

        if (!land) {
            return res.status(404).json({ message: 'Land not found' });
        }

        const blockchainLandDetails = await blockchainService.getLandDetails(landId);

        if (!blockchainLandDetails) {
            return res.status(404).json({ message: 'Land not found on blockchain' });
        }

        const isVerified = (
            land.owner.toLowerCase() === blockchainLandDetails.owner.toLowerCase() &&
            land.location === blockchainLandDetails.location &&
            land.area.toString() === blockchainLandDetails.area.toString() &&
            land.landUse === blockchainLandDetails.landUse &&
            land.documentHash === blockchainLandDetails.documentHash
        );

        res.status(200).json({
            isVerified,
            databaseDetails: land,
            blockchainDetails: blockchainLandDetails
        });
    } catch (error) {
        console.error('Error verifying land:', error);
        res.status(500).json({ message: 'Error verifying land', error: error.message });
    }
};