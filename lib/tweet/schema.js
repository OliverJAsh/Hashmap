var schemata = require('schemata');

var schema = schemata({
  _id: { type: String },
  text: { type: String },
  geo: { type: Object },
  place: { type: Object },
  hashtag: { type: String },
  user: { type: Object }
});

module.exports = schema;
