var rev = require('git-rev');
var sha = 'unknown revision';
var version = require('../../package.json').version;
var request = require('request');

rev.long(function(longSha) {
  sha = longSha || 'unknown revision';
});

/**
 * The defaults used for the construction of new clients.
 * You can pass options in client constructors to override these options.
 *
 * @typedef ClientDefaults
 * @property {string}   [requestHost=api.postmarkapp.com] The host name for whichever server we should use to access the Postmark API.
 * @property {boolean}  [ssl=true]                        Should ssl be used for accessing the API (http/https)?
 * @property {function} [requestFactory]                  Given the set of options, produce a new function that will be responsible for creating and processing HTTP requests.
 */
var ClientDefaults = {
  requestHost: "api.postmarkapp.com",
  ssl: true,

  /**
   * Returns function used to make HTTP requests based on the provided options
   *
   * @param {object}   options
   * @param {string}   options.apiKey
   * @param {string}   options.authorizationHeader
   * @param {string}   options.requestHost
   * @param {boolean}  [options.ssl=true]           determines if requests are made using HTTP or HTTPS
   * @param {string}   [options.proxy]              optional proxy url, reference https://github.com/request/request#proxies
   * @param {boolean}  [options.strictSSL]
   * @param {boolean}  [options.tunnel]
   * @param {[string]} [options.proxyHeaderWhiteList]
   * @param {[string]} [options.proxyHeaderExclusiveList]
   * @returns {Function}
   */
  requestFactory: function(options) {
    const protocol = options.ssl === true ? "https" : "http";
    const baseUrl = protocol + "://" + options.requestHost;
    var headers = {
      "Accept"       : "application/json",
      "Content-Type" : "application/json",
      "User-Agent"   : "postmark.js (Package-version: " + version + ";Revision:" + sha + ")"
    };
    headers[options.authorizationHeader] = options.apiKey;
    const proxyOptions = ["proxy", "strictSSL", "tunnel", "proxyHeaderWhiteList", "proxyHeaderExclusiveList"];

    return makeRequest;

    /**
     * Make HTTP request
     * @param {string} path         request uri
     * @param {string} method       request method
     * @param {object} content      request body
     * @param {function} callback
     */
    function makeRequest(path, method, content, callback) {
      if (typeof callback !== "function") {
        callback = function(){ };
      }

      var reqData = {
        headers : headers,
        method  : method,
        baseUrl : baseUrl,
        uri     : path,
      };

      for (var i=0; i<proxyOptions.length; i++) {
        var key = proxyOptions[i];
        if (typeof options[key] !== "undefined") {
          reqData[key] = options[key];
        }
      }

      if (content) {
        reqData.body = JSON.stringify(content);
        reqData.headers["Content-Length"] = Buffer.byteLength(reqData.body);
      }

      request(reqData, function(err, response, body) {
        if (err) return callback(err);

        if (response.statusCode == 200) {
          try {
            var ret = JSON.parse(body);
            return callback(null, ret);
          } catch (e) {
            return callback(e);
          }
        }

        // there was an error somewhere
        var data;
        try {
          data = JSON.parse(body);
          return callback({
            status: response.statusCode,
            message: data['Message'],
            code: data['ErrorCode']
          });
        } catch (e) {
          return callback({
            status: 404,
            message: "Unsupported Request Method and Protocol",
            code: -1 // this is a fake error code !
          });
        }
      });
    }
  }
};

module.exports = ClientDefaults;