const express = require('express')
const router = express.Router()
const traceController = require('../controllers/traceController')

// define routes
router.get('/', traceController.getAllTraces)

router.get('/attributes', traceController.getAttributesForTraces)
router.get('/:traceId/attributes', traceController.getTraceWithAttributes)

router.get('/mostEvents', traceController.getTraceWithMostEvents)
router.get('/leastEvents', traceController.getTraceWithLeastEvents)

router.get('/events/minimum', traceController.getTracesWithMinimumEvents)
router.get('/events/maximum', traceController.getTracesWithMaximumEvents ) 
router.get('/:traceId/events', traceController.getEventsForTrace)

router.get('/conceptName', traceController.getConceptNameForAllTraces)
router.get('/:traceId/conceptName', traceController.getConceptNameForTrace)

router.get('/hasConceptName', traceController.getTracesByConceptName)

router.get('/:traceId/getEventWithMaxSequence', traceController.getEventWithMaxSequence)

router.get('/time', traceController.getTracesByTimestamp)
router.get('/timeRange', traceController.getTracesByTimestampRange)


module.exports = router
