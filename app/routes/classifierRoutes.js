const express = require('express');
const router = express.Router();
const classifierController = require('../controllers/classifierController');

// Routes for classifiers
router.get('/', classifierController.getAllClassifiers);
router.get('/:id', classifierController.getClassifierById);

module.exports = router;
