const express = require('express');
const router = express.Router();

// import route files 
const logRoutes = require('./logRoutes');
const traceRoutes = require('./traceRoutes');
const logHasTraceRoutes = require('./logHasTraceRoutes')
const eventRoutes = require('./eventRoutes');
const classifierRoutes = require('./classifierRoutes');
const traceHasEventRoutes = require('./traceHasEventRoutes');
const extensionRoutes = require('./extensionRoutes');
const attributeRoutes = require('./attributeRoutes');
const logHasAttributeRoutes = require('./logHasAttributeRoutes');
const eventHasAttributeRoutes = require('./eventHasAttributeRoutes');

// use route files
router.use('/logs', logRoutes);
router.use('/traces', traceRoutes);
router.use('/loghastraces', logHasTraceRoutes);
router.use('/events', eventRoutes);
router.use('/classifiers', classifierRoutes);
router.use('/tracehasevents', traceHasEventRoutes);
router.use('/extensions', extensionRoutes);
router.use('/attributes', attributeRoutes);
router.use('/loghasattributes', logHasAttributeRoutes);
router.use('/eventhasattributes', eventHasAttributeRoutes);

module.exports = router
