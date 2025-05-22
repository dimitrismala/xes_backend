const TraceHasAttribute = require('../models/traceHasAttributeModel');

// Controller functions
const getAllTraceHasAttributes = async (req, res) => {
    try {
        const traceHasAttributes = await TraceHasAttribute.findAll();
        res.json(traceHasAttributes);
    } catch (error) {
        console.error('Error fetching traceHasAttributes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getTraceHasAttributeById = async (req, res) => {
    const traceHasAttributeId = req.params.id;
    try {
        const traceHasAttribute = await TraceHasAttribute.findByPk(traceHasAttributeId);
        if (!traceHasAttribute) {
            return res.status(404).json({ message: 'TraceHasAttribute not found' });
        }
        res.json(traceHasAttribute);
    } catch (error) {
        console.error('Error fetching traceHasAttribute by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllTraceHasAttributes,
    getTraceHasAttributeById,
};
