const express = require('express')
const router = express.Router()
const logHasTraceController = require('../controllers/logHasTraceController')

// define routes
router.get('/', logHasTraceController.getAllLogHasTraces)

module.exports = router
