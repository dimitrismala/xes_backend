const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Log = require('./logModel');
const Trace = require('./traceModel');
const TraceHasEvent = require('./traceHasEventModel');

const LogHasTrace = sequelize.define('log_has_trace', {
    log_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Log,
            key: 'id'
        }
    },
    trace_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Trace,
            key: 'id'
        }
    },
    sequence: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'log_has_trace',
    timestamps: false
})

// Define associations
LogHasTrace.belongsTo(Log, { foreignKey: 'log_id' })
LogHasTrace.belongsTo(Trace, { foreignKey: 'trace_id' })
LogHasTrace.belongsTo(TraceHasEvent, { foreignKey: 'trace_id' });

module.exports = LogHasTrace
