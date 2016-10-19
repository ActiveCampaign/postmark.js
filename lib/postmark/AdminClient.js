var defaults = require('./clientDefaults.js');
var merge = require('merge');
var querystring = require('querystring');

/**
 * Description
 * @class AdminClient
 * @param {string} apiKey The **account-level** key used to access your Postmark Account and manage servers and signatures. This is _not_ the same as your **server key**.
 * @param {ClientDetfaults} [options] The options used to create this client, if not specified, the postmark.defaults will be used.
 *
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
 * @private
 * @memberOf AdminClient.prototype
 * @method processRequestWithoutBody
 * @param {string} path
 * @param {string} type
 * @param {object} query
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.processRequestWithoutBody = function(path, type, query, callback) {
  if (query) {
    path += '?' + querystring.stringify(query);
  }
  this.processRequestWithBody(path, type, null, callback);
}

/**
 * Get a list of Sender Signatures associated with this account. By default,
 * this method returns the first 100 signatures in your account.
 *
 * @memberOf AdminClient.prototype
 * @method listSenderSignatures
 * @param {object} [query] An optional filter to be used when retrieving the list of Sender Signatures.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
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
 * Get a single Sender Signature by id.
 *
 * @memberOf AdminClient.prototype
 * @method getSenderSignature
 * @param {number} id The ID for the Sender Signature you wish to retrieve.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.getSenderSignature = function(id, callback) {
  this.processRequestWithoutBody('/senders/' + id, 'GET', null, callback);
};

/**
 * Create a Sender Signature.
 *
 * @memberOf AdminClient.prototype
 * @method createSenderSignature
 * @param {object} options The configuration options for the Sender Signature to be created.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.createSenderSignature = function(options, callback) {
  this.processRequestWithBody('/senders/', 'POST', options, callback);
};

/**
 * Modify an existing Sender Signature.
 *
 * @memberOf AdminClient.prototype
 * @method editSenderSignature
 * @param {number} id The ID of the Sender Signature to be modified.
 * @param {object} options The updated options for the Sender Sinature to be modified.
 * @param {postmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.editSenderSignature = function(id, options, callback) {
  this.processRequestWithBody('/senders/' + id, 'PUT', options, callback);
};

/**
 * Delete a Sender Signature.
 *
 * @memberOf AdminClient.prototype
 * @method deleteSenderSignature
 * @param {number} id The ID for the Sender Signature you wish to delete.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.deleteSenderSignature = function(id, callback) {
  this.processRequestWithoutBody('/senders/' + id, 'DELETE', null, callback);
};

/**
 * Request that a new confirmation email be sent to the email address associated with a Sender Signature.
 *
 * @memberOf AdminClient.prototype
 * @method resendSenderSignatureConfirmation
 * @param {number} id The ID for the Sender Signature for which you wish to have a confirmation re-sent.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.resendSenderSignatureConfirmation = function(id, callback) {
  this.processRequestWithBody('/senders/' + id + '/resend', 'POST', null, callback);
};

/**
 * Request that the SPF records for Sender Signature be verified.
 *
 * @memberOf AdminClient.prototype
 * @method verifySenderSignatureSPF
 * @param {number} id The ID for the Sender Signature for which you wish to have the SPF verified.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 * @deprecated verifyDomainSPF replaces this method 
 */
AdminClient.prototype.verifySenderSignatureSPF = function(id, callback) {
  this.processRequestWithBody('/senders/' + id + '/verifyspf', 'POST', null, callback);
};

/**
 * Request a new DKIM for the specified Sender Signature.
 *
 * @memberOf AdminClient.prototype
 * @method requestNewDKIMForSenderSignature
 * @param {number} id The ID for the Sender Signature for which you wish have a new DKIM issued.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 * @deprecated rotateDKIMForDomain replaces this method
 */
AdminClient.prototype.requestNewDKIMForSenderSignature = function(id, callback) {
  this.processRequestWithBody('/senders/' + id + '/requestnewdkim', 'POST', null, callback);
};

/**
 * Retrieve information for a specific Server.
 *
 * @memberOf AdminClient.prototype
 * @method getServer
 * @param {number} id The ID of the Server you wish to access.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.getServer = function(id, callback) {
  this.processRequestWithoutBody('/servers/' + id, 'GET', null, callback);
};

/**
 * Create a new Server from which you may send and recieve email.
 *
 * @memberOf AdminClient.prototype
 * @method createServer
 * @param {object} options The configuration options to be used when creating the new Server.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.createServer = function(options, callback) {
  this.processRequestWithBody('/servers/', 'POST', options, callback);
};

/**
 * Modify an existing Server.
 *
 * @memberOf AdminClient.prototype
 * @method editServer
 * @param {number} id The ID of the Server you wish to edit.
 * @param {object} options The options you wish to modify on the Server.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.editServer = function(id, options, callback) {
  this.processRequestWithBody('/servers/' + id, 'PUT', options, callback);
};

/**
 * Delete a Server with the specified ID.
 *
 * NOTE: Because this is a dangerous operation and can cause serious problems in your account, you must request that this API be enabled for your account from **support@postmarkapp.com**
 *
 * @memberOf AdminClient.prototype
 * @method deleteServer
 * @param {number} id The ID of the Server you wish to delete.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.deleteServer = function(id, callback) {
  this.processRequestWithoutBody('/servers/' + id, 'DELETE', null, callback);
};

/**
 * Get a list of Servers associated with this account. By default, the first 100 Servers associated with the account are used.
 *
 * @memberOf AdminClient.prototype
 * @method listServers
 * @param {object} [query] An optional filter to use when retrieving the list of Servers.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.listServers = function(query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);
  this.processRequestWithoutBody('/servers/', 'GET', query, callback);
};

/**
 * Get a list of Domains associated with this account. By default,
 * this method returns the first 100 domains in your account.
 *
 * @memberOf AdminClient.prototype
 * @method listDomains 
 * @param {object} [query] An optional filter to be used when retrieving the list of Domains.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.listDomains = function(query, callback) {
  callback = coalesceCallback(query, callback);
  query = merge({
    count: 100,
    offset: 0
  }, query);
  this.processRequestWithoutBody('/domains', 'GET', query, callback);
};

/**
 * Get a single Domain by id.
 *
 * @memberOf AdminClient.prototype
 * @method getDomain
 * @param {number} id The ID for the Domain you wish to retrieve.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.getDomain = function(id, callback) {
  this.processRequestWithoutBody('/domains/' + id, 'GET', null, callback);
};

/**
 * Create a Domain.
 *
 * @memberOf AdminClient.prototype
 * @method createDomain
 * @param {object} options The configuration options for the Domain to be created.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.createDomain = function(options, callback) {
  this.processRequestWithBody('/domains/', 'POST', options, callback);
};

/**
 * Modify an existing Domain.
 *
 * @memberOf AdminClient.prototype
 * @method editDomain
 * @param {number} id The ID of the Domain to be modified.
 * @param {object} options The updated options for the Domain to be modified.
 * @param {postmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.editDomain = function(id, options, callback) {
  this.processRequestWithBody('/domains/' + id, 'PUT', options, callback);
};

/**
 * Delete a Domain.
 *
 * @memberOf AdminClient.prototype
 * @method deleteDomain
 * @param {number} id The ID for the Domain you wish to delete.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.deleteDomain = function(id, callback) {
  this.processRequestWithoutBody('/domains/' + id, 'DELETE', null, callback);
};

/**
 * Request that the SPF records for Domain be verified.
 *
 * @memberOf AdminClient.prototype
 * @method verifyDomainSPF
 * @param {number} id The ID for the Domain for which you wish to have the SPF verified.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.verifyDomainSPF = function(id, callback) {
  this.processRequestWithBody('/domains/' + id + '/verifyspf', 'POST', null, callback);
};

/**
 * Rotate DKIM keys for the specified Domain.
 *
 * @memberOf AdminClient.prototype
 * @method rotateDKIMForDomain
 * @param {number} id The ID for the for which you wish have a new DKIM issued.
 * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
 */
AdminClient.prototype.rotateDKIMForDomain = function(id, callback) {
  this.processRequestWithBody('/domains/' + id + '/rotatedkim', 'POST', null, callback);
};

module.exports = AdminClient;
