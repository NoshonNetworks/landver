const express = require('express');
const router = express.Router();
const landController = require('../controllers/landController');
const upload = require('../middleware/upload');

router.post('/register', upload.single('document'), landController.addLand);
router.get('/', landController.getAllLands);
router.get('/:id', landController.getLandById);
router.get('/:id/verify', landController.verifyLand);

module.exports = router;