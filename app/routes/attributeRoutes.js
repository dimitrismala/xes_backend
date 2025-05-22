const express = require('express');
const router = express.Router();
const attributeController = require('../controllers/attributeController');

// Routes for attributes
router.get('/', attributeController.getAllAttributes);
router.get('/:id', attributeController.getAttributeById);

module.exports = router;
