var schemata = require('schemata');

var schema = schemata({
  _id: { type: String },
  text: { type: String },
  geo: { type: Object },
  hashtag: { type: String }
});

module.exports = schema;
