"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var request = require("request-promise");
var BaseClient = /** @class */ (function () {
    function BaseClient(token, authHeader, options) {
        if (!token || token.trim() == '') {
            throw new models_1.PostmarkError('A valid API token must be provided when creating a client.');
        }
        this.token = token.trim();
        this.authHeader = authHeader;
        this.clientOptions = options || BaseClient.ClientDefaults;
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
            var err = e;
            throw new models_1.PostmarkError("Request failed: " + err.message);
        });
        if (callback) {
            req = req.then(function (json) {
                callback(json);
                return json;
            }).tapCatch(function (e) { return callback(undefined, e); });
            req.suppressUnhandledRejections();
        }
        return req;
        var _a, _b;
    };
    BaseClient.ClientDefaults = {
        useHttps: true,
        requestHost: 'api.postmarkapp.com',
        timeout: 30
    };
    return BaseClient;
}());
exports.default = BaseClient;
