const Log = require('../models/logModel')
const Trace = require('../models/traceModel')

const LogHasTrace = require("../models/logHasTraceModel")

exports.getAllLogHasTraces = async (req, res) => {
    try {
        const logHasTraces = await LogHasTrace.findAll({
            include: [
                { model: Log },
                { model: Trace }
            ]
        }
        )
        res.json(logHasTraces)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}