const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Attribute = require("./attributeModel");
const Trace = require("./traceModel");
const Classifier = require("./classifierModel");

const Log = sequelize.define(
  "log",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "log",
    timestamps: false,
  }
);

// Define associations
Log.belongsToMany(Attribute, {
  through: "log_has_attribute",
  timestamps: false,
  foreignKey: "log_id",
  otherKey: "attribute_id",
});

Log.belongsToMany(Trace, {
  through: "log_has_trace",
  timestamps: false,
  foreignKey: "log_id",
  otherKey: "trace_id",
});

Trace.belongsToMany(Log, {
  through: "log_has_trace",
  timestamps: false,
  foreignKey: "trace_id",
  otherKey: "log_id",
});

Log.hasMany(Classifier, { foreignKey: "log_id", sourceKey: "id" });

module.exports = Log;
