"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var ErrorHandler_1 = require("./ErrorHandler");
var models_1 = require("./models");
var packageJson = require("../../package.json");
var CLIENT_VERSION = packageJson.version;
/**
 * Base client class from which both the AccountClient and ServerClient classes can be implemented.
 * This class is NOT intended to be instantiated directly.
 */
var BaseClient = /** @class */ (function () {
    function BaseClient(token, authHeader, configOptions) {
        this.verifyToken(token);
        this.clientVersion = CLIENT_VERSION;
        this.token = token.trim();
        this.authHeader = authHeader;
        this.clientOptions = __assign({}, BaseClient.DefaultOptions, configOptions);
        this.errorHandler = new ErrorHandler_1.ErrorHandler();
    }
    /**
     * Process http request with sending body - data.
     *
     * @see processRequest for more details.
     **/
    BaseClient.prototype.processRequestWithBody = function (method, path, body, callback) {
        return this.processRequest(method, path, {}, body, callback);
    };
    /**
     * Process http request without sending body - data.
     *
     * @see processRequest for more details.
     **/
    BaseClient.prototype.processRequestWithoutBody = function (method, path, queryParameters, callback) {
        if (queryParameters === void 0) { queryParameters = {}; }
        return this.processRequest(method, path, queryParameters, null, callback);
    };
    /**
     * Process request for Postmark ClientOptions.
     *
     * @param method - see processHttpRequest for details
     * @param path - see processHttpRequest for details
     * @param queryParameters - see processHttpRequest for details
     * @param body - see processHttpRequest for details
     * @param callback - callback function to be executed.
     *
     * @returns A promise that will complete when the API responds (or an error occurs).
     **/
    BaseClient.prototype.processRequest = function (method, path, queryParameters, body, callback) {
        var httpRequest = this.processHttpRequest(method, path, queryParameters, body);
        this.processCallbackRequest(httpRequest, callback);
        return httpRequest;
    };
    /**
     * Process HTTP request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     *
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    BaseClient.prototype.processHttpRequest = function (method, path, queryParameters, body) {
        var _this = this;
        return this.httpRequest(method, path, queryParameters, body)
            .then(function (response) {
            return response.body;
        })
            .catch(function (error) {
            throw _this.errorHandler.generateError(error);
        });
    };
    /**
     * Process callback function for HTTP request.
     *
     * @param httpRequest - HTTP request for which callback will be executed
     * @param callback - callback function to be executed.
     */
    BaseClient.prototype.processCallbackRequest = function (httpRequest, callback) {
        if (callback) {
            httpRequest
                .then(function (response) {
                callback(null, response);
            })
                .catch(function (error) { return callback(error, null); });
        }
    };
    /**
     * Process http request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     *
     * @returns A promise that will complete when the API responds.
     */
    BaseClient.prototype.httpRequest = function (method, path, queryParameters, body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            request(_this.getHttpRequestURL(path), {
                method: method.toString(),
                headers: _this.getComposedHttpRequestHeaders(),
                qs: queryParameters,
                body: body,
                timeout: _this.getRequestTimeoutInSeconds(),
                json: true,
                gzip: true
            }, function (err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    };
    BaseClient.prototype.getRequestTimeoutInSeconds = function () {
        return (this.clientOptions.timeout || 30) * 1000;
    };
    BaseClient.prototype.getHttpRequestURL = function (path) {
        var scheme = this.clientOptions.useHttps ? 'https' : 'http';
        return scheme + "://" + this.clientOptions.requestHost + "/" + path;
    };
    /**
     * JSON object with default headers sent by HTTP request.
     **/
    BaseClient.prototype.getComposedHttpRequestHeaders = function () {
        var _a;
        return _a = {},
            _a[this.authHeader] = this.token,
            _a['Accept'] = 'application/json',
            _a['User-Agent'] = "Postmark.JS - " + this.clientVersion,
            _a;
    };
    /**
     * Token can't be empty.
     *
     * @param {string} token - HTTP request token
     */
    BaseClient.prototype.verifyToken = function (token) {
        if (!token || token.trim() == '') {
            throw new models_1.PostmarkErrors.PostmarkError('A valid API token must be provided when creating a ClientOptions.');
        }
    };
    /**
     * Client connection configuration options.
     * You may modify these values and new clients will use them.
     * Any values provided to a Client constructor will override default options.
     */
    BaseClient.DefaultOptions = {
        useHttps: true,
        requestHost: 'api.postmarkapp.com',
        timeout: 30
    };
    return BaseClient;
}());
exports.default = BaseClient;
//# sourceMappingURL=BaseClient.js.map