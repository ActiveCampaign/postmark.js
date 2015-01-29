var defaults = require('./clientDefaults.js');
var merge = require('merge');
var querystring = require('querystring');

function AdminClient(apiKey, options) {
  if (!apiKey) {
    throw ("You must provide your Postmark Account API token.");
  }
  this.options = merge({}, defaults, options);
  this.options.apiKey = apiKey;
  this.options.authorizationHeader = "X-Postmark-Account-Token";
  this.processRequestWithBody = this.options.requestFactory(this.options);
}

AdminClient.prototype.processRequestWithoutBody = function(path, type, query, callback) {
  if (query) {
    path += '?' + querystring.stringify(query);
  }
  this.processRequestWithBody(path, type, null, callback);
}

AdminClient.prototype.listSenderSignatures = function(query, callback) {
  this.processRequestWithoutBody('/senders', 'GET', query, callback);
};

AdminClient.prototype.getSenderSignature = function(id, callback) {
  this.processRequestWithoutBody('/senders/' + id, 'GET', null, callback);
};

AdminClient.prototype.createSenderSignature = function(options, callback) {
  this.processRequestWithBody('/senders/', 'POST', options, callback);
};

AdminClient.prototype.editSenderSignature = function(id, options, callback) {
  this.processRequestWithBody('/senders/' + id, 'PUT', options, callback);
};

AdminClient.prototype.deleteSenderSignature = function(id, callback) {
  this.processRequestWithoutBody('/senders/' + id, 'DELETE', null, callback);
};

AdminClient.prototype.resendSenderSignatureConfirmation = function(id, callback) {
  this.processRequestWithBody('/senders/' + id + '/resend', 'POST', null, callback);
};

AdminClient.prototype.verifySenderSignatureSPF = function(id, callback) {
  this.processRequestWithBody('/senders/' + id + '/verifyspf', 'POST', null, callback);
};

AdminClient.prototype.requestNewDKIMForSenderSignature = function(id, callback) {
  this.processRequestWithBody('/senders/' + id + '/requestnewdkim', 'POST', null, callback);
};

AdminClient.prototype.getServer = function(id, callback) {
  this.processRequestWithoutBody('/servers/' + id, 'GET', null, callback);
};

AdminClient.prototype.createServer = function(options, callback) {
  this.processRequestWithBody('/servers/', 'POST', options, callback);
};

AdminClient.prototype.editServer = function(id, options, callback) {
  this.processRequestWithBody('/servers/' + id, 'PUT', options, callback);
};

AdminClient.prototype.deleteServer = function(id, callback) {
  this.processRequestWithoutBody('/servers/' + id, 'DELETE', null, callback);
};

AdminClient.prototype.listServers = function(query, callback) {
  this.processRequestWithoutBody('/servers/', 'GET', query, callback);
};

module.exports = AdminClient;