const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Extension = require('./extensionModel');

const Attribute = sequelize.define('attribute', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    attr_key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    attr_type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    parent_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    extension_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        references: {
            model: Extension,
            key: 'id'
        }
    }
}, {
    tableName: 'attribute',
    timestamps: false
});

// Define associations
Attribute.belongsTo(Extension, { foreignKey: 'extension_id' });

module.exports = Attribute;
