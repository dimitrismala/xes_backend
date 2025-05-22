const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// Define routes
router.get('/', logController.getAllLogs)

router.get('/mostTraces', logController.getLogWithMostTraces)
router.get('/leastTraces', logController.getLogWithLeastTraces)

router.get('/:logId/getTraceWithMaxSequence', logController.getTraceWithMaxSequence)

router.get('/traces/minimum', logController.getLogsWithMinimumTraces)
router.get('/traces/maximum', logController.getLogsWithMaximumTraces)

router.get('/:logId/attributes', logController.getLogWithAttributes)
router.get('/:logId/attributes/globalScope', logController.getGlobalScopeAttributesForLog)
router.get('/:logId/attributes/traceScope', logController.getTraceScopeAttributesForLog)
router.get('/:logId/attributes/eventScope', logController.getEventScopeAttributesForLog)

router.get('/:logId/traces', logController.getLogWithTraces)
//router.get('/:logId/traces/timeRange', logController.getTracesByTimestampRange)

router.get('/:logId/classifiers', logController.getLogWithClassifiers)

router.get('/:logId/extensions', logController.getLogWithExtensions)

router.get('/conceptName/all', logController.getConceptNameForAllLogs)
router.get('/:logId/conceptName', logController.getConceptNameForLog)

router.get('/:logId', logController.getLog)


module.exports = router;
