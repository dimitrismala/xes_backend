const express = require('express');
const router = express.Router();
const extensionController = require('../controllers/extensionController');

// Routes for extensions
router.get('/', extensionController.getAllExtensions);
router.get('/:id', extensionController.getExtensionById);
//router.get('/distinct/:logId', extensionController.getDistinctExtensionsForLog);


module.exports = router;
