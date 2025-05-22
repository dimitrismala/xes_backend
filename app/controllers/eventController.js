const { Sequelize, Op, literal } = require("sequelize");

const Event = require("../models/eventModel");
const Attribute = require("../models/attributeModel");
const Extension = require("../models/extensionModel");
const Trace = require("../models/traceModel");

// Controller functions
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Επιστρεφει το concept:name όλων των events
// touchpoint:name → concept:name
// http://localhost:8080/api/events/conceptname
exports.getConceptNameForAllEvents = async (req, res) => {
  try {
    const attributes = await Event.findAll({
      include: [
        {
          model: Attribute,
          through: {
            attributes: ["value"],
          },
          include: [
            {
              model: Extension,
              attributes: ["prefix"],
            },
          ],
          where: {
            attr_key: "concept:name",
          },
          attributes: { exclude: ["parent_id"] },
        },
      ],
    });

    res.json(attributes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Επιστρεφει το concept:name ενός συγκεκριμένου event
// touchpoint:name → concept:name
// http://localhost:8080/api/events/:eventId/conceptname
exports.getConceptNameForEvent = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const attributes = await Event.findByPk(eventId, {
      include: [
        {
          model: Attribute,
          through: {
            attributes: ["value"],
          },
          include: [
            {
              model: Extension,
              attributes: ["prefix"],
            },
          ],
          where: {
            attr_key: "concept:name",
          },
        },
      ],
    });

    res.json(attributes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Επιστρεφει το time:timestamp όλων των events
// touchpoint:timestamp → timestamp:date
// http://localhost:8080/api/events/timestamps
exports.getTimeStampForAllEvents = async (req, res) => {
  try {
    const attributes = await Event.findAll({
      include: [
        {
          model: Attribute,
          through: {
            attributes: ["value"],
          },
          include: [
            {
              model: Extension,
              attributes: ["prefix"],
            },
          ],
          where: {
            attr_key: "time:timestamp",
          },
          attributes: { exclude: ["parent_id"] },
        },
      ],
    });

    res.json(attributes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Επιστρεφει το time:timestamp ενός συγκεκριμένου event
// touchpoint:timestamp → timestamp:date
// http://localhost:8080/api/events/:eventId/timestamp
exports.getTimeStampForEvent = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const attributes = await Event.findByPk(eventId, {
      include: [
        {
          model: Attribute,
          through: {
            attributes: ["value"],
          },
          include: [
            {
              model: Extension,
              attributes: ["prefix"],
            },
          ],
          where: {
            attr_key: "time:timestamp",
          },
        },
      ],
    });

    res.json(attributes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/// Επιστρέφει όλα τα events που το concept:name τους έχει value x
// http://localhost:8080/api/events/hasConceptName?conceptName=x
exports.getEventsByConceptName = async (req, res) => {
  const { conceptName } = req.query;

  try {
    const events = await Event.findAll({
      include: [
        {
          model: Attribute,
          through: {
            attributes: ["value"],
          },
          include: [
            {
              model: Extension,
              attributes: ["prefix"],
            },
          ],
          where: {
            attr_key: "concept:name", // filter by attribute key
            "$attributes.event_has_attribute.value$": {
              [Op.like]: `%${conceptName}%`,
            },
          },
        },
      ],
    });

    res.json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Επιστρέφει τα events που το time:timestamp τους εμπεριέχει το x
// http://localhost:8080/api/events/time?timestamp=x
exports.getEventsByTimestamp = async (req, res) => {
  const { timestamp } = req.query;

  try {
    if (!timestamp) {
      return res
        .status(400)
        .json({ message: "Timestamp parameter is missing" });
    }

    const events = await Event.findAll({
      include: {
        model: Attribute,
        as: "attributes",
        through: {
          attributes: ["value"],
        },
        where: {
          attr_key: "time:timestamp",
          "$attributes->event_has_attribute.value$": {
            [Op.like]: `%${timestamp}%`,
          },
        },
      },
    });

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Επιστρέφει τα events που το time:timestamps τους βρίσκεται εντός ενός εύρους ημερομηνιών
// localhost:8080/api/events/timeRange?startTimestamp=2015-01&endTimestamp=2015-07
// exports.getEventsByTimestampRange = async (req, res) => {
//     const { startTimestamp, endTimestamp } = req.query;

//     try {
//         if (!startTimestamp || !endTimestamp) {
//             return res.status(400).json({ message: 'Start or end timestamp parameter is missing' });
//         }

//         const events = await Event.findAll({
//             include: {
//                 model: Attribute,
//                 as: 'attributes',
//                 through: {
//                     attributes: ['value']
//                 },
//                 where: {
//                     attr_key: 'time:timestamp',
//                     '$attributes->event_has_attribute.value$': {
//                         [Op.between]: [startTimestamp, endTimestamp]
//                     }
//                 }
//             }
//         });

//         res.json(events);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

//////////////////////////
//  Fronted endpoints  //
////////////////////////

// Events - Attributes
// Δίνεις event_id και σου επιστρεφει τα attributes του event
// http://localhost:8080/api/events/:eventId/attributes
exports.getEventAttributes = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const attributes = await Event.findByPk(eventId, {
      include: [
        {
          model: Attribute,
          through: {
            attributes: ["value"],
          },
          include: [
            {
              model: Extension,
              attributes: ["prefix"],
            },
          ],
        },
      ],
    });

    res.json(attributes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Επιστρέφει τα events που το time:timestamps τους βρίσκεται εντός ενός εύρους ημερομηνιών
// localhost:8080/api/events/timeRange?startTimestamp=2015-01&endTimestamp=2015-07
exports.getEventsByTimestampRange = async (req, res) => {
  const { from, to, traceId } = req.query;

  try {
    if (!from || !to) {
      return res
        .status(400)
        .json({ message: "Start or end timestamp parameter is missing" });
    }

    const events = await Event.findAll({
      include: [
        {
          model: Attribute,
          as: "attributes",
          through: {
            attributes: ["value"],
          },
          where: {
            [Op.or]: [
              {
                attr_key: "time:timestamp",
                "$attributes->event_has_attribute.value$": {
                  [Op.between]: [from, to],
                },
              },
              { attr_key: "concept:name" },
            ],
          },
          attributes: ["attr_key"],
          required: true,
        },
        {
          model: Trace,
          as: "traces",
          where: { id: traceId },
          through: { attributes: [] },
        },
      ],
    });

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
