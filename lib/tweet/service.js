var
  save = require('save'),
  crudService = require('crud-service');

var
  save = save('tweet'),
  schema = require('./schema'),
  service = crudService('Tweet', save, schema);

module.exports = service;
