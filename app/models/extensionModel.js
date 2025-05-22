const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Attribute = require('./attributeModel');


const Extension = sequelize.define('extension', {
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
    prefix: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    uri: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    }
}, {
    tableName: 'extension',
    timestamps: false
});


// Define associations
//Extension.hasMany(Attribute, { timestamps: false, foreignKey: 'extension_id'});


module.exports = Extension;
