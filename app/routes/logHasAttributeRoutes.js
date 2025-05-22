const express = require('express');
const router = express.Router();
const logHasAttributeController = require('../controllers/logHasAttributeController');

// Routes for log_has_attribute
router.get('/', logHasAttributeController.getAllLogHasAttributes);
router.get('/:id', logHasAttributeController.getLogHasAttributeById);

module.exports = router;
