const express = require('express');
const router = express.Router();
const landController = require('../controllers/landController');

// Remove any authentication middleware for these routes
router.post('/register', landController.registerLand);
router.post('/verify', landController.verifyLand);
router.get('/all', landController.getAllLands);

// ... rest of your code ...