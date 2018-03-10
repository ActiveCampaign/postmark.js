"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var ts_promise_1 = require("ts-promise");
var BaseClient = /** @class */ (function () {
    function BaseClient(token, authHeader, options) {
        if (!token || token.trim() == '') {
            throw new models_1.PostmarkError('A valid API token must be provided when creating a client.');
        }
        this.client_options = options || BaseClient.ClientDefaults;
    }
    BaseClient.prototype.processRequestWithBody = function (path, method, payload) {
        return ts_promise_1.default.reject(new models_1.PostmarkError("Not implemented."));
    };
    BaseClient.prototype.processRequestWithoutBody = function (path, method, queryParameters) {
        return ts_promise_1.default.reject(new models_1.PostmarkError("Not implemented."));
    };
    BaseClient.ClientDefaults = {
        useHttps: true,
        requestHost: 'api.postmarkapp.com'
    };
    return BaseClient;
}());
exports.default = BaseClient;
