(function() {
  var defaults = require('./clientDefaults.js');
  var merge = require('merge');
  var querystring = require('querystring');

  /**
   * The constructor for the `Client` object.
   * This is the main entry point to the standard Postmark API.
   *
   * ```javascript
   * var client = new Client('<server key>');
   *
   * //You can now send mail with the client.
   * ```
   *
   * @class Client
   * @param {} apiKey
   * @param {} options
   * @return Client
   */
  function Client(apiKey, options) {
    if (!apiKey) {
      throw ("You must provide your postmark API key");
    }
    this.options = merge({}, defaults, options);
    this.options.apiKey = apiKey;
    this.options.authorizationHeader = "X-Postmark-Server-Token";
    this.processRequestWithBody = this.options.requestFactory(this.options);
  }

  Client.prototype = {};

  /**
   * Coalesces arguments to allow for easy method overloads.
   * @private
   * @method coalesceCallback
   * @param {} arg1
   * @param {} arg2
   * @return PostmarkCallback
   */
  function coalesceCallback(arg1, arg2) {
    var callback = arg2;
    if (!callback && typeof(arg1) === 'function') {
      callback = arg1;
    }
    return callback;
  }


  /**
   * Description
   * @memberof Client.prototype
   * @method processRequestWithoutBody
   * @param {} path
   * @param {} type
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.processRequestWithoutBody = function(path, type, query, callback) {
    if (query) {
      path += '?' + querystring.stringify(query);
    }
    this.processRequestWithBody(path, type, null, callback);
  }

  /**
   * Description
   * @memberof Client.prototype
   * @method send
   * @param {} message
   * @param {PostmarkCallback} callback
   */
  Client.prototype.send = function(message, callback) {
    this.processRequestWithBody('/email', 'POST', message, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method batch
   * @param {} messages
   * @param {PostmarkCallback} callback
   */
  Client.prototype.batch = function(messages, callback) {
    this.processRequestWithBody('/email/batch', 'POST', messages, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method sendEmail
   * @param {} message
   * @param {PostmarkCallback} callback
   */
  Client.prototype.sendEmail = function(message, callback) {
    this.processRequestWithBody('/email', 'POST', message, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method sendEmailBatch
   * @param {} messages
   * @param {PostmarkCallback} callback
   */
  Client.prototype.sendEmailBatch = function(messages, callback) {
    this.processRequestWithBody('/email/batch', 'POST', messages, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getDeliveryStatistics
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getDeliveryStatistics = function(callback) {
    this.processRequestWithoutBody('/deliverystats', 'GET', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getBounces
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getBounces = function(query, callback) {
    callback = coalesceCallback(query, callback);
    query = merge({
      count: 100,
      offset: 0
    }, query);

    this.processRequestWithoutBody('/bounces', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getBounce
   * @param {} id
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getBounce = function(id, callback) {
    this.processRequestWithoutBody('/bounces/' + id, 'GET', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getBounceDump
   * @param {} id
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getBounceDump = function(id, callback) {
    this.processRequestWithoutBody('/bounces/' + id + '/dump', 'GET', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method activateBounce
   * @param {} id
   * @param {PostmarkCallback} callback
   */
  Client.prototype.activateBounce = function(id, callback) {
    this.processRequestWithBody('/bounces/' + id + '/activate', 'PUT', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getBounceTags
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getBounceTags = function(callback) {
    this.processRequestWithoutBody('/bounces/tags', 'GET', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getServer
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getServer = function(callback) {
    this.processRequestWithoutBody('/server', 'GET', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method editServer
   * @param {} options
   * @param {PostmarkCallback} callback
   */
  Client.prototype.editServer = function(options, callback) {
    this.processRequestWithBody('/server', 'PUT', options, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getOutboundMessages
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getOutboundMessages = function(query, callback) {
    callback = coalesceCallback(query, callback);
    query = merge({
      count: 100,
      offset: 0
    }, query);
    this.processRequestWithoutBody('/messages/outbound', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getOutboundMessageDetails
   * @param {} id
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getOutboundMessageDetails = function(id, callback) {
    this.processRequestWithoutBody('/messages/outbound/' + id + '/details', 'GET', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getMessageOpens
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getMessageOpens = function(query, callback) {
    callback = coalesceCallback(query, callback);
    query = merge({
      count: 100,
      offset: 0
    }, query);
    this.processRequestWithoutBody('/messages/outbound/opens', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getMessageOpensForSingleMessage
   * @param {} id
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getMessageOpensForSingleMessage = function(id, query, callback) {
    callback = coalesceCallback(query, callback);
    query = merge({
      count: 100,
      offset: 0
    }, query);
    this.processRequestWithoutBody('/messages/outbound/opens/' + id, 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getInboundMessages
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getInboundMessages = function(query, callback) {
    callback = coalesceCallback(query, callback);
    query = merge({
      count: 100,
      offset: 0
    }, query);
    this.processRequestWithoutBody('/messages/inbound', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getInboundMessageDetails
   * @param {} id
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getInboundMessageDetails = function(id, callback) {
    this.processRequestWithoutBody('/messages/inbound/' + id + '/details', 'GET', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method bypassBlockedInboundMessage
   * @param {} id
   * @param {PostmarkCallback} callback
   */
  Client.prototype.bypassBlockedInboundMessage = function(id, callback) {
    this.processRequestWithBody('/messages/inbound/' + id + '/bypass', 'PUT', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getOuboundOverview
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getOuboundOverview = function(query, callback) {
    callback = coalesceCallback(query, callback);
    this.processRequestWithoutBody('/stats/outbound', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getSentCounts
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getSentCounts = function(query, callback) {
    callback = coalesceCallback(query, callback);
    this.processRequestWithoutBody('/stats/outbound/sends', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getBounceCounts
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getBounceCounts = function(query, callback) {
    callback = coalesceCallback(query, callback);
    this.processRequestWithoutBody('/stats/outbound/bounces', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getSpamComplaints
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getSpamComplaints = function(query, callback) {
    callback = coalesceCallback(query, callback);
    this.processRequestWithoutBody('/stats/outbound/spam', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getTrackedEmailCounts
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getTrackedEmailCounts = function(query, callback) {
    callback = coalesceCallback(query, callback);
    this.processRequestWithoutBody('/stats/outbound/tracked', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getEmailOpenCounts
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getEmailOpenCounts = function(query, callback) {
    callback = coalesceCallback(query, callback);
    this.processRequestWithoutBody('/stats/outbound/opens', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getEmailPlatformUsage
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getEmailPlatformUsage = function(query, callback) {
    callback = coalesceCallback(query, callback);
    this.processRequestWithoutBody('/stats/outbound/opens/platforms', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getEmailClientUsage
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getEmailClientUsage = function(query, callback) {
    callback = coalesceCallback(query, callback);
    this.processRequestWithoutBody('/stats/outbound/opens/emailclients', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getEmailReadTimes
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getEmailReadTimes = function(query, callback) {
    callback = coalesceCallback(query, callback);
    this.processRequestWithoutBody('/stats/outbound/opens/readtimes', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method createTagTrigger
   * @param {} options
   * @param {PostmarkCallback} callback
   */
  Client.prototype.createTagTrigger = function(options, callback) {
    this.processRequestWithBody('/triggers/tags', 'POST', options, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method editTagTrigger
   * @param {} id
   * @param {} options
   * @param {PostmarkCallback} callback
   */
  Client.prototype.editTagTrigger = function(id, options, callback) {
    this.processRequestWithBody('/triggers/tags/' + id, 'PUT', options, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method deleteTagTrigger
   * @param {} id
   * @param {PostmarkCallback} callback
   */
  Client.prototype.deleteTagTrigger = function(id, callback) {
    this.processRequestWithoutBody('/triggers/tags/' + id, 'DELETE', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getTagTrigger
   * @param {} id
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getTagTrigger = function(id, callback) {
    this.processRequestWithoutBody('/triggers/tags/' + id, 'GET', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getTagTriggers
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getTagTriggers = function(query, callback) {
    callback = coalesceCallback(query, callback);
    query = merge({
      count: 100,
      offset: 0
    }, query);
    this.processRequestWithoutBody('/triggers/tags/', 'GET', query, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method createInboundRuleTrigger
   * @param {} options
   * @param {PostmarkCallback} callback
   */
  Client.prototype.createInboundRuleTrigger = function(options, callback) {
    this.processRequestWithBody('/triggers/inboundrules', 'POST', options, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method deleteInboundRuleTrigger
   * @param {} id
   * @param {PostmarkCallback} callback
   */
  Client.prototype.deleteInboundRuleTrigger = function(id, callback) {
    this.processRequestWithoutBody('/triggers/inboundrules/' + id, 'DELETE', null, callback);
  };

  /**
   * Description
   * @memberof Client.prototype
   * @method getInboundRuleTriggers
   * @param {} query
   * @param {PostmarkCallback} callback
   */
  Client.prototype.getInboundRuleTriggers = function(query, callback) {
    callback = coalesceCallback(query, callback);
    query = merge({
      count: 100,
      offset: 0
    }, query);
    this.processRequestWithoutBody('/triggers/inboundrules', 'GET', query, callback);
  };

  module.exports = Client;
})();