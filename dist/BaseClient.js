"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_promise_1 = require("ts-promise");
var models_1 = require("./models");
var BaseClient = /** @class */ (function () {
    function BaseClient(token, authHeader, options) {
        if (!token || token.trim() == '') {
            throw new models_1.PostmarkError('An value API token must be provided when creating a client.');
        }
        this.client_options = options;
    }
    BaseClient.prototype.processRequestWithBody = function (url, method, payload) {
        return ts_promise_1.default.reject(new Error("Not implemented."));
    };
    BaseClient.prototype.processRequestWithoutBody = function (url, method) {
        return ts_promise_1.default.reject(new Error("Not implemented."));
    };
    return BaseClient;
}());
exports.default = BaseClient;
