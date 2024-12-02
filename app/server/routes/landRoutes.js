const express = require('express');
const router = express.Router();
const landController = require('../controllers/landController');

// Base land routes
router.get('/', landController.getAllLands);
router.get('/inspectors', landController.getInspectors);
router.get('/approved', landController.getApprovedLands);
router.get('/transfer-history/:landId', landController.getTransferHistory);

// Land verification and details
router.get('/:id', landController.getLandById);
router.get('/:id/verify', landController.verifyLandStatus);

module.exports = router;
