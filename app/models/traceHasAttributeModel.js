const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Trace = require('./traceModel');
const Attribute = require('./attributeModel');

const TraceHasAttribute = sequelize.define('trace_has_attribute', {
    trace_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Trace,
            key: 'id'
        }
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
    tableName: 'trace_has_attribute',
    timestamps: false
});

// Define associations
TraceHasAttribute.belongsTo(Trace, { foreignKey: 'trace_id' });
TraceHasAttribute.belongsTo(Attribute, { foreignKey: 'attribute_id' });

module.exports = TraceHasAttribute;
