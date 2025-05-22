const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Log = require('./logModel');
const Attribute = require('./attributeModel');

const LogHasAttribute = sequelize.define('log_has_attribute', {
    log_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Log,
            key: 'id'
        }
    },
    trace_global: {
        type: DataTypes.BOOLEAN,
        primaryKey: true,
        allowNull: false,
    },
    event_global: {
        type: DataTypes.BOOLEAN,
        primaryKey: true,
        allowNull: false,
    },
    attribute_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Attribute,
            key: 'id'
        }
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    }
}, {
    tableName: 'log_has_attribute',
    timestamps: false
});

// Define associations
LogHasAttribute.belongsToMany(Log, { foreignKey: 'log_id', through: 'LogHasAttribute', timestamps: false });
LogHasAttribute.belongsToMany(Attribute, { foreignKey: 'attribute_id', through: 'LogHasAttribute', timestamps:false });

module.exports = LogHasAttribute;
