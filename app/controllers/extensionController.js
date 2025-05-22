const Extension = require('../models/extensionModel');
const Attribute = require('../models/attributeModel');
const LogHasAttribute = require('../models/logHasAttributeModel');


// Controller functions

// Επιστρέφει όλα τα extensions που υπάρχουν
// http://localhost:8080/api/extensions/
exports.getAllExtensions = async (req, res) => {
    try {
        const extensions = await Extension.findAll()
        res.json(extensions)
    } catch (error) {
        console.error('Error fetching extensions:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Δίνεις id και σου επιστρέφει το extension
// http://localhost:8080/api/extensions/:id
exports.getExtensionById = async (req, res) => {
    const extensionId = req.params.id;

    try {
        const extension = await Extension.findByPk(extensionId)
        if (!extension) {
            return res.status(404).json({ message: 'Extension not found' })
        }
        res.json(extension);
    } catch (error) {
        console.error('Error fetching extension by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/*
exports.getDistinctExtensionsForLog = async (req, res) => {
    const logId = req.params.logId;

    try {
        const extensions = await Extension.findAll({
            attributes: [
                'id', 'name', 'prefix', 'uri'
            ],
            include: [
                {
                    model: Attribute,
                    through: {
                        model: LogHasAttribute,
                        where: {
                            log_id: logId
                        },
                        attributes: []
                    }
                }
            ],
            raw: true,
            nest: true
        });

        res.json(extensions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
} */