"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var utils_1 = require("./utils");
var request = require("request-promise");
/**
 * Provides a base class from which both the AccountClient and ServerClient classes can be implemented.
 *
 * This class is not intended to be instantiated directly.
 */
var BaseClient = /** @class */ (function () {
    function BaseClient(token, authHeader, options) {
        if (!token || token.trim() == '') {
            throw new models_1.PostmarkError('A valid API token must be provided when creating a client.');
        }
        this.token = token.trim();
        this.authHeader = authHeader;
        this.clientOptions = utils_1.coalesce(options || {}, BaseClient.ClientDefaults);
    }
    BaseClient.prototype.processRequestWithBody = function (path, method, payload, callback) {
        return this.processRequest(path, method, payload, true, callback);
    };
    BaseClient.prototype.processRequestWithoutBody = function (path, method, queryParameters, callback) {
        return this.processRequest(path, method, queryParameters || {}, false, callback);
    };
    BaseClient.prototype.processRequest = function (path, method, payload, hasBody, callback) {
        var payloadType = hasBody ? 'body' : 'qs';
        var scheme = this.clientOptions.useHttps ? 'https' : 'http';
        var url = scheme + "://" + this.clientOptions.requestHost + "/" + path;
        var req = request(url, (_a = {
                method: method.toString(),
                headers: (_b = {}, _b[this.authHeader] = this.token, _b['Accept'] = 'application/json', _b)
            },
            _a[payloadType] = payload,
            _a.timeout = (this.clientOptions.timeout || 30) * 1000,
            _a.json = true,
            _a.gzip = true,
            _a)).then(function (json) {
            return json;
        }).catch(function (e) {
            //TODO: remap this to a more useful error.
            var err = e;
            throw new models_1.PostmarkError("Request failed: " + err.message);
        });
        if (callback) {
            req = req.then(function (json) {
                callback(null, json);
                return json;
            }).tapCatch(function (error) { return callback(error, null); });
            req.suppressUnhandledRejections();
        }
        return req;
        var _a, _b;
    };
    /**
     * These are the connection defaults that will be combined with any options that are provided during Client instantiation (Any values provided to a Client constructor will override these defaults.)
     *
     * You may modify these values and new clients will use them.
     */
    BaseClient.ClientDefaults = {
        /**
         * Should https be used for API requests?
         * @default true
         */
        useHttps: true,
        /**
         * The hostname that should be used for API requests.
         * @default api.postmarkapp.com
         */
        requestHost: 'api.postmarkapp.com',
        /**
         * The number of seconds to wait before a client should timeout during an API request.
         * @default 30
         */
        timeout: 30
    };
    return BaseClient;
}());
exports.default = BaseClient;
