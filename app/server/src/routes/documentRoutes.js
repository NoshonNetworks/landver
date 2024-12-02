const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/upload', auth, upload.single('document'), documentController.uploadDocument);
router.get('/:id', auth, documentController.getDocument);
router.put('/:id/status', auth, documentController.updateDocumentStatus);

module.exports = router;