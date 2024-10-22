const express = require('express');
const router = express.Router();
const landOwnerController = require('../controllers/landOwnerController');
const auth = require('../middleware/auth');

router.post('/register', landOwnerController.registerLandOwner);
router.get('/', auth, landOwnerController.getAllLandOwners);
router.get('/:id', auth, landOwnerController.getLandOwner);
router.put('/:id', auth, landOwnerController.updateLandOwner);
router.delete('/:id', auth, landOwnerController.deleteLandOwner);
module.exports = router;
