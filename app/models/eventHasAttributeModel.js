const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./eventModel');
const Attribute = require('./attributeModel');

const EventHasAttribute = sequelize.define('event_has_attribute', {
    event_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Event,
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
    tableName: 'event_has_attribute',
    timestamps: false
});

// Define associations
EventHasAttribute.belongsTo(Event, { foreignKey: 'event_id' });
EventHasAttribute.belongsTo(Attribute, { foreignKey: 'attribute_id' });

module.exports = EventHasAttribute;
