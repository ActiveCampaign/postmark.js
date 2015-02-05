var defaults = require('./clientDefaults.js');
var merge = require('merge');
var querystring = require('querystring');

/**
 * Description
 * @class AdminClient
 * @param {string} apiKey
 * @param {ClientDetfaults} options
 * @return AdminClient
 */
function AdminClient(apiKey, options) {
  if (!apiKey) {
    throw ("You must provide your Postmark Account API token.");
  }
  this.options = merge({}, defaults, options);
  this.options.apiKey = apiKey;
  this.options.authorizationHeader = "X-Postmark-Account-Token";
  this.processRequestWithBody = this.options.requestFactory(this.options);
}

AdminClient.prototype = {};

/**
 * @private
 * @param {} arg1
 * @param {} arg2
 * @return function
 */
function coalesceCallback(arg1, arg2) {
  var callback = arg2;
  if (!callback && typeof(arg1) === 'function') {
    callback = arg1;
  }
  return callback;
}

/**
 * @private
 * @memberOf AdminClient.prototype
 * @method processRequestWithoutBody
 * @param {string} path
 * @param {string} type
 * @param {object} query
 * @callback callback
 */
AdminClient.prototype.processRequestWithoutBody = function(path, type, query, callback) {
  if (query) {
    path += '?' + querystring.stringify(query);
  }
  this.processRequestWithBody(path, type, null, callback);
}

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method listSenderSignatures
 * @param {object} query
 * @param {function} callback
 */
AdminClient.prototype.listSenderSignatures = function(query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);
  this.processRequestWithoutBody('/senders', 'GET', query, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method getSenderSignature
 * @param {number} id
 * @param {function} callback
 */
AdminClient.prototype.getSenderSignature = function(id, callback) {
  this.processRequestWithoutBody('/senders/' + id, 'GET', null, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method createSenderSignature
 * @param {object} options
 * @param {function} callback
 */
AdminClient.prototype.createSenderSignature = function(options, callback) {
  this.processRequestWithBody('/senders/', 'POST', options, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method editSenderSignature
 * @param {number} id
 * @param {object} options
 * @param {function} callback
 */
AdminClient.prototype.editSenderSignature = function(id, options, callback) {
  this.processRequestWithBody('/senders/' + id, 'PUT', options, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method deleteSenderSignature
 * @param {number} id
 * @param {function} callback
 */
AdminClient.prototype.deleteSenderSignature = function(id, callback) {
  this.processRequestWithoutBody('/senders/' + id, 'DELETE', null, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method resendSenderSignatureConfirmation
 * @param {number} id
 * @param {function} callback
 */
AdminClient.prototype.resendSenderSignatureConfirmation = function(id, callback) {
  this.processRequestWithBody('/senders/' + id + '/resend', 'POST', null, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method verifySenderSignatureSPF
 * @param {number} id
 * @param {function} callback
 */
AdminClient.prototype.verifySenderSignatureSPF = function(id, callback) {
  this.processRequestWithBody('/senders/' + id + '/verifyspf', 'POST', null, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method requestNewDKIMForSenderSignature
 * @param {number} id
 * @param {function} callback
 */
AdminClient.prototype.requestNewDKIMForSenderSignature = function(id, callback) {
  this.processRequestWithBody('/senders/' + id + '/requestnewdkim', 'POST', null, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method getServer
 * @param {number} id
 * @param {function} callback
 */
AdminClient.prototype.getServer = function(id, callback) {
  this.processRequestWithoutBody('/servers/' + id, 'GET', null, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method createServer
 * @param {object} options
 * @param {function} callback
 */
AdminClient.prototype.createServer = function(options, callback) {
  this.processRequestWithBody('/servers/', 'POST', options, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method editServer
 * @param {number} id
 * @param {object} options
 * @param {function} callback
 */
AdminClient.prototype.editServer = function(id, options, callback) {
  this.processRequestWithBody('/servers/' + id, 'PUT', options, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method deleteServer
 * @param {number} id
 * @param {function} callback
 */
AdminClient.prototype.deleteServer = function(id, callback) {
  this.processRequestWithoutBody('/servers/' + id, 'DELETE', null, callback);
};

/**
 * Description
 * @memberOf AdminClient.prototype
 * @method listServers
 * @param {number} [query]
 * @param {function} callback
 */
AdminClient.prototype.listServers = function(query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);
  this.processRequestWithoutBody('/servers/', 'GET', query, callback);
};

module.exports = AdminClient;