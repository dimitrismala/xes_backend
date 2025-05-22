const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Log = require('./logModel');

const Classifier = sequelize.define('classifier', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    attr_keys: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        get() {
            const rawValue = this.getDataValue('attr_keys');
            return rawValue ? rawValue.split(',') : null;
        },
        set(value) {
            this.setDataValue('attr_keys', value ? value.join(',') : null);
        }
    },
    log_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Log,
            key: 'id'
        }
    }
}, {
    tableName: 'classifier',
    timestamps: false
});

// Define associations
// Classifier.belongsTo(Log, { foreignKey: 'log_id', targetKey: 'id' });

module.exports = Classifier;
