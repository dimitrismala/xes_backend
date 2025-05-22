const Attribute = require('../models/attributeModel');

// Controller functions
const getAllAttributes = async (req, res) => {
    try {
        const attributes = await Attribute.findAll();
        res.json(attributes);
    } catch (error) {
        console.error('Error fetching attributes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAttributeById = async (req, res) => {
    const attributeId = req.params.id;
    try {
        const attribute = await Attribute.findByPk(attributeId);
        if (!attribute) {
            return res.status(404).json({ message: 'Attribute not found' });
        }
        res.json(attribute);
    } catch (error) {
        console.error('Error fetching attribute by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllAttributes,
    getAttributeById,
};
