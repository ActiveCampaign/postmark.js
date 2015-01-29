var Client = require('./Client.js');
var AdminClient = require('./AdminClient.js');
var defaults = require('./clientDefaults.js');

//For backwards compatibility, we forward
//parameters to a new Client constructor.
var publicApi = function(api_key, options) {
  return new Client(api_key, options);
};

publicApi.defaults = defaults;
publicApi.Client = Client;
publicApi.AdminClient = AdminClient;

module.exports = publicApi;