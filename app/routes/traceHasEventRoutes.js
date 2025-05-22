const express = require('express');
const router = express.Router();
const traceHasEventController = require('../controllers/traceHasEventController');

// Routes for trace_has_event
router.get('/', traceHasEventController.getAllTraceHasEvents);
router.get('/:trace_id/:event_id', traceHasEventController.getTraceHasEventById);

module.exports = router;
