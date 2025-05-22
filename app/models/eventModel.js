const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Attribute = require('./attributeModel');
const Trace = require('./traceModel');
const Log = require('./logModel');

const Event = sequelize.define('event', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    }
}, {
    tableName: 'event',
    timestamps: false,
});

// Define associations
Event.belongsToMany(Attribute, { through: 'event_has_attribute', timestamps: false, foreignKey: 'event_id', otherKey: "attribute_id"});
//Event.belongsToMany(Trace, { through: 'trace_has_event', foreignKey: 'event_id' });

module.exports = Event;
