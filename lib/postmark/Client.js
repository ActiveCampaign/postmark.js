var defaults = require('./clientDefaults.js');
var merge = require('merge');
var querystring = require('querystring');

function Client(apiKey, options) {
  if (!apiKey) {
    throw ("You must provide your postmark API key");
  }
  //TODO: merge with the "global" options.
  this.options = options || {};
  this.options = merge(this.options, defaults);
  this.options.apiKey = apiKey;
  this.options.authorizationHeader = "X-Postmark-Server-Token";
  this.processRequestWithBody = this.options.requestFactory(this.options);
}

Client.prototype.processRequestWithoutBody = function(path, type, query, callback) {
  if (query) {
    path += '?' + querystring.stringify(query);
  }
  this.processRequestWithBody(path, type, null, callback);
}

Client.prototype.send = function(message, callback) {
  this.processRequestWithBody('/email', 'POST', message, callback);
};

Client.prototype.batch = function(messages, callback) {
  this.processRequestWithBody('/email/batch', 'POST', messages, callback);
};

Client.prototype.getDeliveryStatistics = function(callback) {
  this.processRequestWithoutBody('/deliverystats', 'GET', null, callback);
};

Client.prototype.getBounces = function(query, callback) {
  this.processRequestWithoutBody('/bounces', 'GET', query, callback);
};

Client.prototype.getBounce = function(id, callback) {
  this.processRequestWithoutBody('/bounces' + id, 'GET', null, callback);
};

Client.prototype.getBounceDump = function(id, callback) {
  this.processRequestWithoutBody('/bounces/' + id + '/dump', 'GET', null, callback);
};

Client.prototype.activateBounceDump = function(id, callback) {
  this.processRequestWithBody('/bounces/' + id + '/activate', 'PUT', null, callback);
};

Client.prototype.getBounceTags = function(id, callback) {
  this.processRequestWithoutBody('/bounces/tags', 'GET', null, callback);
};

Client.prototype.getServer = function(callback) {
  this.processRequestWithoutBody('/server', 'GET', null, callback);
};

Client.prototype.editServer = function(options, callback) {
  this.processRequestWithBody('/server', 'PUT', options, callback);
};

Client.prototype.getOutboundMessages = function(query, callback) {
  this.processRequestWithoutBody('/messages/outbound', 'GET', query, callback);
};

Client.prototype.getOutboundMessageDetails = function(id, callback) {
  this.processRequestWithoutBody('/messages/outbound/' + id + '/details', 'GET', null, callback);
};

Client.prototype.getMessageOpens = function(query, callback) {
  this.processRequestWithoutBody('/messages/outbound/opens', 'GET', query, callback);
};

Client.prototype.getMessageOpensForSingleMessage = function(id, callback) {
  this.processRequestWithoutBody('/messages/outbound/opens' + id, 'GET', null, callback);
};

Client.prototype.getInboundMessages = function(query, callback) {
  this.processRequestWithoutBody('/messages/inbound', 'GET', query, callback);
};

Client.prototype.getInboundMessages = function(query, callback) {
  this.processRequestWithoutBody('/messages/inbound', 'GET', query, callback);
};

Client.prototype.getInboundMessageDetails = function(id, callback) {
  this.processRequestWithoutBody('/messages/inbound/' + id + '/details', 'GET', null, callback);
};

Client.prototype.bypassBlockedInboundMessage = function(id, callback) {
  this.processRequestWithBody('/messages/inbound/' + id + '/bypass', 'PUT', null, callback);
};

module.exports = Client;