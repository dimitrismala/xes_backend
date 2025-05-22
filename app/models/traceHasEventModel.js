const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Trace = require('./traceModel');
const Event = require('./eventModel');
const LogHasTrace = require('./logHasTraceModel');

const TraceHasEvent = sequelize.define('trace_has_event', {
    trace_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Trace,
            key: 'id'
        }
    },
    event_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Event,
            key: 'id'
        }
    },
    sequence: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'trace_has_event',
    timestamps: false
});

// Define associations
TraceHasEvent.belongsTo(Trace, { foreignKey: 'trace_id' });
TraceHasEvent.belongsTo(Event, { foreignKey: 'event_id' });
//TraceHasEvent.hasMany(LogHasTrace, { foreignKey: 'trace_id' });

module.exports = TraceHasEvent;
