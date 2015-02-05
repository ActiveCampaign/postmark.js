var Client = require('./Client.js');

var AdminClient = require('./AdminClient.js');

var defaults = require('./clientDefaults.js');

//For backwards compatibility, we forward
//parameters to a new Client constructor.
/**
 * The entry point for the postmark module...
 * @exports postmark
 * @param {string} apiKey
 * @param {object} options
 * @return {Client}
 */
var postmark = function(apiKey, options) {
  return new Client(apiKey, options);
};

/**
 * The defaults used during the construction of
 * new Clients. You may modify this property directly
 * in order to alter all future clients requests, or
 * you may call "new ClientDefaults()" and modify the
 * resulting object.
 *
 * @var {ClientDefaults} defaults
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