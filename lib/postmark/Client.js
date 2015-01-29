var defaults = require('./clientDefaults.js');
var merge = require('merge');
var querystring = require('querystring');

function Client(apiKey, options) {
  if (!apiKey) {
    throw ("You must provide your postmark API key");
  }
  this.options = merge({}, defaults, options);
  this.options.apiKey = apiKey;
  this.options.authorizationHeader = "X-Postmark-Server-Token";
  this.processRequestWithBody = this.options.requestFactory(this.options);
}

function coalesceCallback(arg1, arg2) {
  var callback = arg2;
  if (!callback && typeof(arg1) === 'function') {
    callback = arg1;
  }
  return callback;
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

Client.prototype.sendEmail = function(message, callback) {
  this.processRequestWithBody('/email', 'POST', message, callback);
};

Client.prototype.sendEmailBatch = function(messages, callback) {
  this.processRequestWithBody('/email/batch', 'POST', messages, callback);
};

Client.prototype.getDeliveryStatistics = function(callback) {
  this.processRequestWithoutBody('/deliverystats', 'GET', null, callback);
};

Client.prototype.getBounces = function(query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);

  this.processRequestWithoutBody('/bounces', 'GET', query, callback);
};

Client.prototype.getBounce = function(id, callback) {
  this.processRequestWithoutBody('/bounces/' + id, 'GET', null, callback);
};

Client.prototype.getBounceDump = function(id, callback) {
  this.processRequestWithoutBody('/bounces/' + id + '/dump', 'GET', null, callback);
};

Client.prototype.activateBounce = function(id, callback) {
  this.processRequestWithBody('/bounces/' + id + '/activate', 'PUT', null, callback);
};

Client.prototype.getBounceTags = function(callback) {
  this.processRequestWithoutBody('/bounces/tags', 'GET', null, callback);
};

Client.prototype.getServer = function(callback) {
  this.processRequestWithoutBody('/server', 'GET', null, callback);
};

Client.prototype.editServer = function(options, callback) {
  this.processRequestWithBody('/server', 'PUT', options, callback);
};

Client.prototype.getOutboundMessages = function(query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);
  this.processRequestWithoutBody('/messages/outbound', 'GET', query, callback);
};

Client.prototype.getOutboundMessageDetails = function(id, callback) {
  this.processRequestWithoutBody('/messages/outbound/' + id + '/details', 'GET', null, callback);
};

Client.prototype.getMessageOpens = function(query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);
  this.processRequestWithoutBody('/messages/outbound/opens', 'GET', query, callback);
};

Client.prototype.getMessageOpensForSingleMessage = function(id, query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);
  this.processRequestWithoutBody('/messages/outbound/opens/' + id, 'GET', query, callback);
};

Client.prototype.getInboundMessages = function(query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);
  this.processRequestWithoutBody('/messages/inbound', 'GET', query, callback);
};

Client.prototype.getInboundMessageDetails = function(id, callback) {
  this.processRequestWithoutBody('/messages/inbound/' + id + '/details', 'GET', null, callback);
};

Client.prototype.bypassBlockedInboundMessage = function(id, callback) {
  this.processRequestWithBody('/messages/inbound/' + id + '/bypass', 'PUT', null, callback);
};

Client.prototype.getOuboundOverview = function(query, callback) {
  callback = coalesceCallback(query, callback);
  this.processRequestWithoutBody('/stats/outbound', 'GET', query, callback);
};

Client.prototype.getSentCounts = function(query, callback) {
  callback = coalesceCallback(query, callback);
  this.processRequestWithoutBody('/stats/outbound/sends', 'GET', query, callback);
};

Client.prototype.getBounceCounts = function(query, callback) {
  callback = coalesceCallback(query, callback);
  this.processRequestWithoutBody('/stats/outbound/bounces', 'GET', query, callback);
};

Client.prototype.getSpamComplaints = function(query, callback) {
  callback = coalesceCallback(query, callback);
  this.processRequestWithoutBody('/stats/outbound/spam', 'GET', query, callback);
};

Client.prototype.getTrackedEmailCounts = function(query, callback) {
  callback = coalesceCallback(query, callback);
  this.processRequestWithoutBody('/stats/outbound/tracked', 'GET', query, callback);
};

Client.prototype.getEmailOpenCounts = function(query, callback) {
  callback = coalesceCallback(query, callback);
  this.processRequestWithoutBody('/stats/outbound/opens', 'GET', query, callback);
};

Client.prototype.getEmailPlatformUsage = function(query, callback) {
  callback = coalesceCallback(query, callback);
  this.processRequestWithoutBody('/stats/outbound/opens/platforms', 'GET', query, callback);
};

Client.prototype.getEmailClientUsage = function(query, callback) {
  callback = coalesceCallback(query, callback);
  this.processRequestWithoutBody('/stats/outbound/opens/emailclients', 'GET', query, callback);
};

Client.prototype.getEmailReadTimes = function(query, callback) {
  callback = coalesceCallback(query, callback);
  this.processRequestWithoutBody('/stats/outbound/opens/readtimes', 'GET', query, callback);
};

Client.prototype.createTagTrigger = function(options, callback) {
  this.processRequestWithBody('/triggers/tags', 'POST', options, callback);
};

Client.prototype.editTagTrigger = function(id, options, callback) {
  this.processRequestWithBody('/triggers/tags/' + id, 'PUT', options, callback);
};

Client.prototype.deleteTagTrigger = function(id, callback) {
  this.processRequestWithoutBody('/triggers/tags/' + id, 'DELETE', null, callback);
};

Client.prototype.getTagTrigger = function(id, callback) {
  this.processRequestWithoutBody('/triggers/tags/' + id, 'GET', null, callback);
};

Client.prototype.getTagTriggers = function(query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);
  this.processRequestWithoutBody('/triggers/tags/', 'GET', query, callback);
};

Client.prototype.createInboundRuleTrigger = function(options, callback) {
  this.processRequestWithBody('/triggers/inboundrules', 'POST', options, callback);
};

Client.prototype.deleteInboundRuleTrigger = function(id, callback) {
  this.processRequestWithoutBody('/triggers/inboundrules/' + id, 'DELETE', null, callback);
};

Client.prototype.getInboundRuleTriggers = function(query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);
  this.processRequestWithoutBody('/triggers/inboundrules', 'GET', query, callback);
};

module.exports = Client;