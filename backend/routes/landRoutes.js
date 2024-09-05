const express = require('express');
const router = express.Router();
const landController = require('../controllers/landController');

// Remove any authentication middleware for these routes
router.post('/register', landController.registerLand);
router.get('/', landController.getAllLands);
router.get('/:id', landController.getLandById);
router.get('/:id/verify', landController.verifyLand);

module.exports = router;