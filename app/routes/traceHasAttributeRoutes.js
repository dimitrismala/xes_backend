const express = require('express');
const router = express.Router();
const traceHasAttributeController = require('../controllers/traceHasAttributeController');

// Routes for trace_has_attribute
router.get('/', traceHasAttributeController.getAllTraceHasAttributes);
router.get('/:id', traceHasAttributeController.getTraceHasAttributeById);

module.exports = router;
