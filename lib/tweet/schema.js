var schemata = require('schemata');

var schema = schemata({
  _id: { type: String },
  text: { type: String },
  hashtag: { type: String }
});

module.exports = schema;
