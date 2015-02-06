/**
 * The postmark module. This is the entry point for the postmark client.
 *
 * To send an email:
 *
 * ```javascript
 * var postmark = require('postmark');
 *
 * var client = new postmark.Client('<server key>');
 *
 * client.sendEmail({ ... }, function(err, response){ ... });
 * ```
 *
 * @exports postmark
 */

var Client = require('./Client.js');

var AdminClient = require('./AdminClient.js');

var defaults = require('./clientDefaults.js');

//For backwards compatibility, we forward
//parameters to a new Client constructor.
/**
 * @callback postmark
 * @param {string} apiKey The server key used to access the API.
 * @param {ClientDefaults} [defaults] The options to use when creating requests. These **defaults** are used if you do not specify your own options.
 * @property {ClientDefaults} defaults This property specifies the global defaults used when creating all clients. Altering this defaults here will cause new clients to observe the updated values, but existing clients
 * will used the defaults as they were when they were constructed.
 * @property {Client} Client A Postmark Client Constructor. This is the standard client used to send an recieve email, process stats, and handle bounces. In most cases, this is the Client you should use.
 * @property {AdminClient} AdminClient A Postmark AdminClient constructor. This is the client used
 * to administer "Account-level" modifications. You may add/update
 * Servers, as well as add and update Sender Signatures.
 * @return {Client}
 * @instance
 */

/**
 * @private
 */
var postmark = function(apiKey, options) {
  return new Client(apiKey, options);
};


postmark.defaults = defaults;
postmark.Client = Client;
postmark.AdminClient = AdminClient;

module.exports = postmark;