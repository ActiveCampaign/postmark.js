var defaults = require('./clientDefaults.js');
var merge = require('merge');

function Client(apiKey, options) {
  if (!apiKey) {
    throw ("You must provide your postmark API key");
  }
  //TODO: merge with the "global" options.
  this.options = options || {};
  this.options = merge(this.options, defaults);
  this.options.apiKey = apiKey;
  this.processRequestWithBody = this.options.requestFactory(this.options);
}

Client.prototype.processRequestWithoutBody = function(path, type, query, callback) {
  //this should translate the query to a query string and append it to the 
  //path, then forward it to the processRequestWithBody function.
  callback("Requests without a body are not supported, yet.");
}

Client.prototype.send = function(message, callback) {
  this.processRequestWithBody('/email', 'POST', message, callback);
};

Client.prototype.batch = function(messages, callback) {
  this.processRequestWithBody('/email/batch', 'POST', messages, callback);
};

module.exports = Client;