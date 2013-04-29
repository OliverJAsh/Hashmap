var _ = require('lodash')

var basePort = +(process.env.PORT || 4000)

var properties = {
  projectName: 'Sbscribe',
  projectId: 'sbscribe',
  domain: 'localhost',
  publicSiteUrl: 'http://localhost:' + basePort,
  basePort: basePort
}

var environmentProperties = {
  development: {},
  production: {
    domain: 'hashmap.oliverjash.me',
    publicSiteUrl: 'http://hashmap.oliverjash.me'
  }
}

module.exports = function getProperties(environment) {

  properties.env = environment = environment || process.env.NODE_ENV || 'development'

  if (environmentProperties[environment] === undefined) {
    throw new RangeError('No properties for environment \'' + environment + '\'')
  }
  return _.merge({}, properties, environmentProperties[environment])
}
