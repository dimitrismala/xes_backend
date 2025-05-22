const TraceHasEvent = require('../models/traceHasEventModel');

// Controller functions
const getAllTraceHasEvents = async (req, res) => {
    try {
        const traceHasEvents = await TraceHasEvent.findAll();
        res.json(traceHasEvents);
    } catch (error) {
        console.error('Error fetching trace-has-event records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getTraceHasEventById = async (req, res) => {
    const { trace_id, event_id } = req.params;
    try {
        const traceHasEvent = await TraceHasEvent.findOne({ where: { trace_id, event_id } });
        if (!traceHasEvent) {
            return res.status(404).json({ message: 'Trace-has-event record not found' });
        }
        res.json(traceHasEvent);
    } catch (error) {
        console.error('Error fetching trace-has-event record by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllTraceHasEvents,
    getTraceHasEventById
};
