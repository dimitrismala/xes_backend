const Classifier = require('../models/classifierModel');
const Log = require('../models/logModel')

// Controller functions
const getAllClassifiers = async (req, res) => {
    try {
        const classifiers = await Classifier.findAll();
        res.json(classifiers);
    } catch (error) {
        console.error('Error fetching classifiers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getClassifierById = async (req, res) => {
    const classifierId = req.params.id;
    try {
        const classifier = await Classifier.findByPk(classifierId);
        if (!classifier) {
            return res.status(404).json({ message: 'Classifier not found' });
        }
        res.json(classifier);
    } catch (error) {
        console.error('Error fetching classifier by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllClassifiers,
    getClassifierById
};
