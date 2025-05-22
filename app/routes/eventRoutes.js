const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Routes for events
router.get('/', eventController.getAllEvents)

router.get('/:eventId/attributes', eventController.getEventAttributes)

router.get('/conceptName', eventController.getConceptNameForAllEvents)
router.get('/:eventId/conceptName', eventController.getConceptNameForEvent)
router.get('/hasConceptName', eventController.getEventsByConceptName)

router.get('/timeStamps', eventController.getTimeStampForAllEvents)
router.get('/:eventId/timeStamp', eventController.getTimeStampForEvent)
router.get('/time', eventController.getEventsByTimestamp)
router.get('/timeRange', eventController.getEventsByTimestampRange)


module.exports = router;
