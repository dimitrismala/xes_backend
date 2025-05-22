const EventHasAttribute = require('../models/eventHasAttributeModel');

// Controller functions
const getAllEventHasAttributes = async (req, res) => {
    try {
        const eventHasAttributes = await EventHasAttribute.findAll();
        res.json(eventHasAttributes);
    } catch (error) {
        console.error('Error fetching eventHasAttributes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getEventHasAttributeById = async (req, res) => {
    const eventHasAttributeId = req.params.id;
    try {
        const eventHasAttribute = await EventHasAttribute.findByPk(eventHasAttributeId);
        if (!eventHasAttribute) {
            return res.status(404).json({ message: 'EventHasAttribute not found' });
        }
        res.json(eventHasAttribute);
    } catch (error) {
        console.error('Error fetching eventHasAttribute by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllEventHasAttributes,
    getEventHasAttributeById,
};
