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
            area,
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
        res.status(500).json({ message: 'Error adding land', error: error.message, stack: error.stack });
    }
};

exports.getAllLands = async (req, res) => {
    try {
        console.log('Attempting to fetch all lands');
        const lands = await Land.find();
        console.log(`Successfully fetched ${lands.length} lands`);
        res.status(200).json(lands);
    } catch (error) {
        console.error('Error in getAllLands:', error);
        res.status(500).json({ message: 'Error fetching lands', error: error.message });
    }
};

exports.getLandById = async (req, res) => {
    try {
        console.log('Fetching land with ID:', req.params.id);
        const land = await Land.findOne({ landId: req.params.id });
        if (!land) {
            console.log('Land not found in database');
            return res.status(404).json({ message: 'Land not found' });
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
            blockchainLandDetails = null;
        }

        // Combine database and blockchain data
        const combinedLandDetails = {
            ...land.toObject(),
            blockchainDetails: blockchainLandDetails || { message: 'Blockchain details not available' }
        };

        res.status(200).json(combinedLandDetails);
    } catch (error) {
        console.error('Error in getLandById:', error);
        res.status(500).json({ message: 'Error fetching land', error: error.message, stack: error.stack });
    }
};

exports.verifyLand = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Verifying land with ID:', id);

        if (!id) {
            console.log('Land ID is undefined or empty');
            return res.status(400).json({ message: 'Land ID is required' });
        }

        const land = await Land.findOne({ landId: id });
        if (!land) {
            console.log('Land not found in database for ID:', id);
            return res.status(404).json({ message: 'Land not found in the database' });
        }

        console.log('Land found in database:', land);

        res.status(200).json({
            isVerified: true,
            message: 'This land is registered in the LandVer Registry',
            landDetails: land
        });
    } catch (error) {
        console.error('Error in verifyLand:', error);
        res.status(500).json({ message: 'Error verifying land', error: error.message, stack: error.stack });
    }
};