const LogHasAttribute = require('../models/logHasAttributeModel');

// Controller functions
const getAllLogHasAttributes = async (req, res) => {
    try {
        const logHasAttributes = await LogHasAttribute.findAll();
        res.json(logHasAttributes);
    } catch (error) {
        console.error('Error fetching logHasAttributes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getLogHasAttributeById = async (req, res) => {
    const logHasAttributeId = req.params.id;
    try {
        const logHasAttribute = await LogHasAttribute.findByPk(logHasAttributeId);
        if (!logHasAttribute) {
            return res.status(404).json({ message: 'LogHasAttribute not found' });
        }
        res.json(logHasAttribute);
    } catch (error) {
        console.error('Error fetching logHasAttribute by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllLogHasAttributes,
    getLogHasAttributeById
};
