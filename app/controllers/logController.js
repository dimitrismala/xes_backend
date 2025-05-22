const { Sequelize, Op, literal } = require("sequelize");

const Attribute = require("../models/attributeModel");
const Log = require("../models/logModel");
const Trace = require("../models/traceModel");
const Event = require("../models/eventModel");
const Extension = require("../models/extensionModel");
const Classifier = require("../models/classifierModel");

// Επιστρέφει όλα τα logs
// http://localhost:8080/api/logs/
// exports.getAllLogs = async (req, res) => {
//     try {
//         const logs = await Log.findAll()
//         res.json(logs)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: err.message })
//     }
// }

// Επιστρεφει το log με συγκεκριμενο log_id
// cjm → log
// http://localhost:8080/api/logs/:logId
exports.getLog = async (req, res) => {
  const logId = req.params.logId;

  try {
    const logs = await Log.findByPk(logId, {});

    res.json(logs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Δίνεις το log_id και επιστρεφει τα global attributes του log
// http://localhost:8080/api/logs/:logId/attributes/globalscope
exports.getGlobalScopeAttributesForLog = async (req, res) => {
  const logId = req.params.logId;

  try {
    const attributes = await Log.findAll({
      where: {
        id: logId,
      },
      include: [
        {
          model: Attribute,
          through: {
            where: {
              trace_global: 0,
              event_global: 0,
            },
            attributes: ["value", "trace_global", "event_global"],
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

// Επιστρεφει το concept:name απο τα global attributes όλων των log
// cjm:goal → concept:name
// http://localhost:8080/api/logs/conceptname/all
exports.getConceptNameForAllLogs = async (req, res) => {
  try {
    const attributes = await Log.findAll({
      include: [
        {
          model: Attribute,
          through: {
            where: {
              trace_global: 0,
              event_global: 0,
            },
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

// Επιστρεφει το concept:name απο τα global attributes συγκεκριμένου log
// cjm:goal → concept:name
// http://localhost:8080/api/logs/:logId/conceptname
exports.getConceptNameForLog = async (req, res) => {
  const logId = req.params.logId;

  try {
    const attributes = await Log.findAll({
      where: {
        id: logId,
      },
      include: [
        {
          model: Attribute,
          through: {
            where: {
              trace_global: 0,
              event_global: 0,
            },
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

// Δίνεις το log_id και επιστρεφει τα trace scope attributes του log
// http://localhost:8080/api/logs/:logId/attributes/tracescope
exports.getTraceScopeAttributesForLog = async (req, res) => {
  const logId = req.params.logId;

  try {
    const attributes = await Log.findAll({
      where: {
        id: logId,
      },
      include: [
        {
          model: Attribute,
          through: {
            where: {
              trace_global: 1,
              event_global: 0,
            },
            attributes: ["value", "trace_global", "event_global"],
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

// Δίνεις το log_id και επιστρεφει τα event scope attributes του log
// http://localhost:8080/api/logs/:logId/attributes/eventscope
exports.getEventScopeAttributesForLog = async (req, res) => {
  const logId = req.params.logId;

  try {
    const attributes = await Log.findAll({
      where: {
        id: logId,
      },
      include: [
        {
          model: Attribute,
          through: {
            where: {
              trace_global: 0,
              event_global: 1,
            },
            attributes: ["value", "trace_global", "event_global"],
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

// Δίνεις το log_id και επιστρεφει τα trace_id του log
// journey → trace
// http://localhost:8080/api/logs/:logId/traces
// exports.getLogWithTraces = async (req, res) => {
//     const logId = req.params.logId;

//     try {
//         const logs = await Log.findAll({
//             where: {
//                 id: logId
//             },
//             include: [
//                 { model: Trace, through: { attributes: [] } }
//             ],
//         })
//         res.json(logs)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: err.message })
//     }
// }

// Δίνεις log_id και επιστρέφει όλα τα attributes του log που έχουν extension
// http://localhost:8080/api/logs/:logId/extensions
exports.getLogWithExtensions = async (req, res) => {
  const logId = req.params.logId;

  try {
    const attributes = await Log.findByPk(logId, {
      include: [
        {
          model: Attribute,
          where: {
            extension_id: { [Op.not]: null },
          },
          through: {
            attributes: ["value", "trace_global", "event_global"],
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

// Επιστρέφει το log με τα περισσότερα traces
// http://localhost:8080/api/logs/mostTraces
exports.getLogWithMostTraces = async (req, res) => {
  try {
    const log = await Log.findOne({
      attributes: [
        "id",
        "name",
        [Sequelize.literal("COUNT(traces.id)"), "num_of_traces"],
      ],
      include: [
        {
          model: Trace,
          through: { attributes: [] },
          attributes: [],
          duplicating: false,
        },
      ],
      group: ["Log.id"],
      order: [[Sequelize.literal("COUNT(`traces`.`id`)"), "DESC"]],
      limit: 1,
    });

    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// // Επιστρέφει το log με τα λιγότερα traces
// http://localhost:8080/api/logs/leastTraces
exports.getLogWithLeastTraces = async (req, res) => {
  try {
    const log = await Log.findOne({
      attributes: [
        "id",
        "name",
        [Sequelize.literal("COUNT(traces.id)"), "num_of_traces"],
      ],
      include: [
        {
          model: Trace,
          through: { attributes: [] },
          attributes: [],
          duplicating: false,
        },
      ],
      group: ["Log.id"],
      order: [[Sequelize.literal("COUNT(`traces`.`id`)"), "ASC"]],
      limit: 1,
    });

    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Επιστρέφει τα logs που έχουν ίσο αριθμό ή περισσότερα traces
// http://localhost:8080/api/logs/traces/minimum?numTraces=3
exports.getLogsWithMinimumTraces = async (req, res) => {
  try {
    const { numTraces } = req.query;

    const logs = await Log.findAll({
      include: [{ model: Trace, through: { attributes: [] } }],
      group: ["log.id"],
      having: Sequelize.literal(
        `COUNT(DISTINCT \`traces.id\`) >= ${numTraces || 0}`
      ),
      raw: true,
    });

    res.json(logs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Επιστρέφει τα logs που έχουν x ή λιγότερα traces
// http://localhost:8080/api/logs/traces/maximum?numTraces=2
exports.getLogsWithMaximumTraces = async (req, res) => {
  try {
    const { numTraces } = req.query;

    const logs = await Log.findAll({
      include: [{ model: Trace, through: { attributes: [] } }],
      group: ["log.id"],
      having: Sequelize.literal(
        `COUNT(DISTINCT \`traces.id\`) <= ${numTraces || 0}`
      ),
      raw: true,
    });

    res.json(logs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Δίνεις log_id και επιστρέφει το trace_id με τα περισσότερα sequence
// Σε επόμενο βήμα μπορεί να χρησιμοποιηθεί το trace_id για να βρεθεί το concept:name
// http://localhost:8080/api/logs/:logId/getTraceWithMaxSequence
exports.getTraceWithMaxSequence = async (req, res) => {
  const logId = req.params.logId;

  try {
    const log = await Log.findOne({
      where: { id: logId },
      attributes: ["id", "name"],
      include: [
        {
          model: Trace,
          through: { attributes: ["sequence"] },
          attributes: ["id"],
          duplicating: false,
        },
      ],
      order: [[Sequelize.literal("sequence"), "DESC"]],
      limit: 1,
    });

    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//////////////////////////
//  Fronted endpoints  //
////////////////////////

// Main View
// Επιστρέφει όλα τα logs
// http://localhost:8080/api/logs/
// exports.getAllLogs = async (req, res) => {
//     try {
//         const logs = await Log.findAll({
//             include: [
//                 {
//                     model: Attribute,
//                     through: {
//                         where: {
//                             trace_global: 0,
//                             event_global: 0
//                         },
//                         attributes: ['value']
//                     },
//                     where: {
//                         attr_key: 'concept:name'
//                     },
//                     attributes: ['attr_key'] // Specify attributes to exclude
//                 }
//             ]
//         });

//         res.json(logs);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: err.message });
//     }
// }

// exports.getAllLogs = async (req, res) => {
//     try {
//         const traceCounts = await Log.findAll({
//             attributes: [
//                 'id', // Select the log ID
//                 [Sequelize.fn('COUNT', Sequelize.col('traces.id')), 'trace_count'] // Count the number of associated traces
//             ],
//             include: [
//                 {
//                     model: Trace,
//                     as: 'traces', // Specify the alias for the association
//                     attributes: [] // Do not select any attributes from the Trace model
//                 }
//             ],
//             group: ['log.id'] // Group the results by the log ID
//         });

//         res.json(traceCounts);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: err.message });
//     }
// };

// Main View
// Επιστρέφει όλα τα logs
// http://localhost:8080/api/logs/

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({
      attributes: [
        "id",
        "name",
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM log_has_trace WHERE log.id = log_has_trace.log_id)"
          ),
          "trace_count",
        ],
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM trace_has_event INNER JOIN trace ON trace_has_event.trace_id = trace.id INNER JOIN log_has_trace ON trace.id = log_has_trace.trace_id WHERE log.id = log_has_trace.log_id)"
          ),
          "event_count",
        ],
      ],
      include: [
        {
          model: Attribute,
          through: {
            where: {
              trace_global: 0,
              event_global: 0,
            },
            attributes: ["value"],
          },
          where: {
            attr_key: "concept:name",
          },
          attributes: ["attr_key"],
        },
      ],
    });

    res.json(logs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Log - Traces
// Δίνεις το log_id και επιστρεφει τα trace_id του log
// journey → trace
// http://localhost:8080/api/logs/:logId/traces

exports.getLogWithTraces = async (req, res) => {
  const logId = req.params.logId;

  try {
    const logs = await Log.findByPk(logId, {
      attributes: [
        "id",
        "name",
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM log_has_trace WHERE log.id = log_has_trace.log_id)"
          ),
          "trace_count",
        ],
      ],
      include: [
        {
          model: Trace,
          as: "traces",
          attributes: [
            "id",
            [
              Sequelize.literal(
                "(SELECT COUNT(*) FROM trace_has_event WHERE trace_has_event.trace_id = traces.id)" // Use the alias 'traces'
              ),
              "event_count",
            ],
          ],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Attribute,
              through: {
                attributes: ["value"],
              },
              where: {
                [Op.or]: [
                  { attr_key: "concept:name" },
                  { attr_key: "time:timestamp" },
                ],
              },
              attributes: ["attr_key"],
            },
          ],
        },
      ],
    });
    res.json(logs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Logs - Attributes
// Δίνεις το log_id και επιστρεφει όλα τα attributes του log (global, trace scope, event scope)
// http://localhost:8080/api/logs/:logId/attributes
exports.getLogWithAttributes = async (req, res) => {
  const logId = req.params.logId;

  try {
    const attributes = await Log.findAll({
      where: { id: logId },
      include: [
        {
          model: Attribute,
          through: {
            attributes: ["value", "trace_global", "event_global"],
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

// Δίνεις log_id και σου επιστρεφει όλα τα classifiers του log
// http://localhost:8080/api/logs/:logId/classifiers
exports.getLogWithClassifiers = async (req, res) => {
  const logId = req.params.logId;

  try {
    const logs = await Log.findAll({
      where: {
        id: logId,
      },
      include: [
        {
          model: Classifier,
          attributes: ["id", "name", "attr_keys"],
        },
      ],
    });
    res.json(logs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Θα γίνει απο το traceController.js
// Logs - Traces - Time Range
// Επιστρέφει τα traces που το time:timestamps τους βρίσκεται εντός ενός εύρους ημερομηνιών
// localhost:8080/api/traces/timeRange?startTimestamp=2015-01&endTimestamp=2015-07

// exports.getTracesByTimestampRange = async (req, res) => {
//     const logId = req.params.logId;
//     const { startTimestamp, endTimestamp } = req.query;

//     try {
//         const logs = await Log.findByPk(logId, {
//             include: [
//                 {
//                     model: Trace,
//                     through: {
//                         attributes: []
//                     },
//                     include: {
//                         model: Attribute,
//                         as: 'attributes',
//                         through: {
//                             attributes: ['value']
//                         },
//                         where: {
//                             attr_key: 'time:timestamp',
//                             '$attributes->trace_has_attribute.value$': {
//                                 [Op.between]: [startTimestamp, endTimestamp]
//                             }
//                         },
//                         attributes: ['attr_key'],
//                     }
//                 }
//             ],
//         });

//         res.json(logs)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: err.message })
//     }
// }
