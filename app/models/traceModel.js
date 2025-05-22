const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Attribute = require("./attributeModel");
const Event = require("./eventModel");
const Log = require("./logModel");

const Trace = sequelize.define(
  "trace",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "trace",
    timestamps: false,
  }
);

// Define associations
Trace.belongsToMany(Attribute, {
  through: "trace_has_attribute",
  timestamps: false,
  foreignKey: "trace_id",
  otherKey: "attribute_id",
});

Trace.belongsToMany(Event, {
  through: "trace_has_event",
  timestamps: false,
  foreignKey: "trace_id",
  otherKey: "event_id",
});

Event.belongsToMany(Trace, {
  through: "trace_has_event",
  timestamps: false,
  foreignKey: "event_id",
  otherKey: "trace_id",
});

module.exports = Trace;
