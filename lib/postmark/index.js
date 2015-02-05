/** @module postmark */

var Client = require('./Client.js');

var AdminClient = require('./AdminClient.js');

var defaults = require('./clientDefaults.js');

//For backwards compatibility, we forward
//parameters to a new Client constructor.
/**
 * The postmark module.
 *
 * @param {string} apiKey The server key used to access the API.
 * @param {ClientDefaults} [options] The options to use when creating requests. {postmark.ClientDefaults} are used if you do not specify your own options.
 * @return {Client}
 * @instance
 */
var postmark = function(apiKey, options) {
  return new Client(apiKey, options);
};

/**
 * The defaults used during the construction of
 * new Clients. You may modify this property directly
 * in order to alter all future clients requests.
 *
 * @var defaults
 * @type {ClientDefaults}
 * @instance
 */
postmark.defaults = defaults;

/**
 * A Postmark Client constructor. This is the standard
 * client used to send an recieve email, process stats, and
 * handle bounces. In most cases, this is the Client you should use.
 *
 * @var {Client} Client
 * @instance
 */
postmark.Client = Client;

/**
 * A Postmark AdminClient constructor. This is the client used
 * to administer "Account-level" modifications. You may add/update
 * Servers, as well as add and update Sender Signatures.
 *
 * @var {AdminClient} AdminClient
 * @instance
 */
postmark.AdminClient = AdminClient;

module.exports = postmark;