const express = require('express');
const router = express.Router();
const eventHasAttributeController = require('../controllers/eventHasAttributeController');

// Routes for event_has_attribute
router.get('/', eventHasAttributeController.getAllEventHasAttributes);
router.get('/:id', eventHasAttributeController.getEventHasAttributeById);

module.exports = router;
