var schemata = require('schemata');

var schema = schemata({
  _id: { type: String },
  text: { type: String }
});

module.exports = schema;
