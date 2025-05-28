const { Sequelize, Op } = require("sequelize");

const Trace = require("../models/traceModel");
const Attribute = require("../models/attributeModel");
const Extension = require("../models/extensionModel");
const Event = require("../models/eventModel");
const Log = require("../models/logModel");

// Επιστρεφει όλα τα traces
// journey → trace
// http://localhost:8080/api/traces
exports.getAllTraces = async (req, res) => {
  try {
    const traces = await Trace.findAll();
    res.json(traces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Επιστρέφει όλα τα attributes όλων των traces απο όλα τα logs
// http://localhost:8080/api/traces/attributes
exports.getAttributesForTraces = async (req, res) => {
  try {
    const attributes = await Trace.findAll({
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

// Επιστρεφει το concept:name απο όλα τα traces όλων των log
// customer:name → concept:name
// http://localhost:8080/api/traces/conceptname
exports.getConceptNameForAllTraces = async (req, res) => {
  try {
    const attributes = await Trace.findAll({
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

// Επιστρεφει το concept:name απο συγκεκριμενο trace
// customer:name → concept:name
// http://localhost:8080/api/traces/:traceId/conceptname
exports.getConceptNameForTrace = async (req, res) => {
  const traceId = req.params.traceId;

  try {
    const attributes = await Trace.findByPk(traceId, {
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

// Δίνεις trace_id και σου επιστρεφει όλα τα attributes του trace
// http://localhost:8080/api/traces/:traceId/attributes
// exports.getTraceWithAttributes = async (req, res) => {
//     const traceId = req.params.traceId;

//     try {
//         const attributes = await Trace.findByPk(traceId, {
//             include: [
//                 {
//                     model: Attribute,
//                     through: {
//                         attributes: ['value']
//                     },
//                     include: [{
//                         model: Extension,
//                         attributes: ['prefix']
//                     }]
//                 }
//             ]
//         });

//         res.json(attributes);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: err.message });
//     }
// }

// Δίνεις trace_id και σου επιστρεφει όλα τα events του trace
// touchpoint → event
// http://localhost:8080/api/traces/:traceId/events
// exports.getEventsForTrace = async (req, res) => {
//     const traceId = req.params.traceId;

//     try {
//         const traces = await Trace.findByPk(traceId, {
//             include: [
//                 { model: Event, through: { attributes: [] } }
//             ],
//         })
//         res.json(traces)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: err.message })
//     }
// }

// Επιστρέφει το trace με τα περισσότερα events
// http://localhost:8080/api/traces/mostEvents
exports.getTraceWithMostEvents = async (req, res) => {
  try {
    const trace = await Trace.findOne({
      attributes: [
        "id",
        [Sequelize.literal("COUNT(events.id)"), "num_of_events"],
      ],
      include: [
        {
          model: Event,
          through: { attributes: [] },
          attributes: [],
          duplicating: false,
        },
      ],
      group: ["Trace.id"],
      order: [[Sequelize.literal("COUNT(`events`.`id`)"), "DESC"]],
      limit: 1,
    });

    res.json(trace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Επιστρέφει το trace με τα λιγότερα events
// http://localhost:8080/api/traces/leastEvents
exports.getTraceWithLeastEvents = async (req, res) => {
  try {
    const trace = await Trace.findOne({
      attributes: [
        "id",
        [Sequelize.literal("COUNT(events.id)"), "num_of_events"],
      ],
      include: [
        {
          model: Event,
          through: { attributes: [] },
          attributes: [],
          duplicating: false,
        },
      ],
      group: ["Trace.id"],
      order: [[Sequelize.literal("COUNT(`events`.`id`)"), "ASC"]],
      limit: 1,
    });

    res.json(trace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Επιστρέφει τα traces που έχουν x ή περισσότερα events
// http://localhost:8080/api/traces/events/minimum?numEvents=3
exports.getTracesWithMinimumEvents = async (req, res) => {
  try {
    const { numEvents } = req.query;

    const traces = await Trace.findAll({
      include: [{ model: Event, through: { attributes: [] } }],
      group: ["trace.id"],
      having: Sequelize.literal(
        `COUNT(DISTINCT \`events.id\`) >= ${numEvents || 0}`
      ),
      raw: true,
    });

    res.json(traces);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Επιστρέφει τα traces που έχουν x ή λιγότερα events
// http://localhost:8080/api/traces/events/maximum?numEvents=11
exports.getTracesWithMaximumEvents = async (req, res) => {
  try {
    const { numEvents } = req.query;

    const traces = await Trace.findAll({
      include: [{ model: Event, through: { attributes: [] } }],
      group: ["trace.id"],
      having: Sequelize.literal(
        `COUNT(DISTINCT \`events.id\`) <= ${numEvents || 0}`
      ),
      raw: true,
    });

    res.json(traces);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Επιστρέφει όλα τα traces που το concept:name τους έχει value x
// http://localhost:8080/api/traces/hasConceptName?conceptName=x
exports.getTracesByConceptName = async (req, res) => {
  const { conceptName } = req.query;

  try {
    const traces = await Trace.findAll({
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
            "$attributes.trace_has_attribute.value$": {
              [Op.like]: `%${conceptName}%`,
            },
          },
        },
      ],
    });

    res.json(traces);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Δίνεις trace_id και επιστρέφει το event_id με τα περισσότερα sequence
// Σε επόμενο βήμα μπορεί να χρησιμοποιηθεί το event_id για να βρεθεί το concept:name
// http://localhost:8080/api/traces/:logId/getEventWithMaxSequence
exports.getEventWithMaxSequence = async (req, res) => {
  const traceId = req.params.traceId;

  try {
    const trace = await Trace.findByPk(traceId, {
      attributes: ["id"],
      include: [
        {
          model: Event,
          through: { attributes: ["sequence"] },
          attributes: ["id"],
          duplicating: false,
        },
      ],
      order: [[Sequelize.literal("sequence"), "DESC"]],
      limit: 1,
    });

    res.json(trace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Επιστρέφει τα traces που το time:timestamp τους εμπεριέχει το x
// http://localhost:8080/api/traces/time?timestamp=x
exports.getTracesByTimestamp = async (req, res) => {
  const { timestamp } = req.query;

  try {
    if (!timestamp) {
      return res
        .status(400)
        .json({ message: "Timestamp parameter is missing" });
    }

    const traces = await Trace.findAll({
      include: {
        model: Attribute,
        as: "attributes",
        through: {
          attributes: ["value"],
        },
        where: {
          attr_key: "time:timestamp",
          "$attributes->trace_has_attribute.value$": {
            [Op.like]: `%${timestamp}%`,
          },
        },
      },
    });

    res.json(traces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Επιστρέφει τα traces που το time:timestamps τους βρίσκεται εντός ενός εύρους ημερομηνιών
// localhost:8080/api/traces/timeRange?startTimestamp=2015-01&endTimestamp=2015-07
// exports.getTracesByTimestampRange = async (req, res) => {
//     const { startTimestamp, endTimestamp } = req.query;

//     try {
//         if (!startTimestamp || !endTimestamp) {
//             return res.status(400).json({ message: 'Start or end timestamp parameter is missing' });
//         }

//         const traces = await Trace.findAll({
//             include: {
//                 model: Attribute,
//                 as: 'attributes',
//                 through: {
//                     attributes: ['value']
//                 },
//                 where: {
//                     attr_key: 'time:timestamp',
//                     '$attributes->trace_has_attribute.value$': {
//                         [Op.between]: [startTimestamp, endTimestamp]
//                     }
//                 }
//             }
//         });

//         res.json(traces);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

//////////////////////////
//  Fronted endpoints  //
////////////////////////

// Trace - Events
// Δίνεις trace_id και σου επιστρεφει όλα τα events του trace
// touchpoint → event
// http://localhost:8080/api/traces/:traceId/events
exports.getEventsForTrace = async (req, res) => {
  const traceId = req.params.traceId;

  try {
    const trace = await Trace.findByPk(traceId, {
      include: [
        {
          model: Event,
          through: { attributes: [] },
          include: [
            {
              model: Attribute,
              where: {
                [Op.or]: [
                  { attr_key: "concept:name" },
                  { attr_key: "time:timestamp" },
                ],
              },
              attributes: ["attr_key"],
              through: { attributes: ["value"] },
            },
          ],
        },
      ],
    });

    res.json(trace);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Traces - Attributes
// Δίνεις trace_id και σου επιστρεφει όλα τα attributes του trace
// http://localhost:8080/api/traces/:traceId/attributes
exports.getTraceWithAttributes = async (req, res) => {
  const traceId = req.params.traceId;

  try {
    const attributes = await Trace.findByPk(traceId, {
      attributes: [
        "id",
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM trace_has_attribute WHERE trace.id = trace_has_attribute.trace_id)"
          ),
          "attribute_count",
        ],
      ],
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

// Επιστρέφει τα traces ενός log που το time:timestamps τους βρίσκεται εντός ενός εύρους ημερομηνιών
// http://localhost:8080/api/traces/timeRange?from=2017-05-17&to=2025-05-14&logId=431a7333-ac03-421a-81b0-c599f7dc86dc
exports.getTracesByTimestampRange = async (req, res) => {
  const { from, to, logId } = req.query;

  try {
    if (!from || !to) {
      return res
        .status(400)
        .json({ message: "Start or end timestamp parameter is missing" });
    }

    const traces = await Trace.findAll({
      attributes: [
        "id",
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM trace_has_event WHERE trace.id = trace_has_event.trace_id)"
          ),
          "event_count",
        ],
      ],
      include: [
        {
          model: Attribute,
          as: "attributes",
          through: {
            attributes: ["value"],
          },
          where: {
            attr_key: {
              [Op.in]: ["time:timestamp", "concept:name"],
            },
          },
          attributes: ["attr_key"],
          required: true,
        },
        {
          model: Log,
          as: "logs",
          where: { id: logId },
          through: { attributes: [] },
        },
      ],
    });

    res.json(traces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
