"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_promise_1 = require("ts-promise");
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["OPTIONS"] = "OPTIONS";
    HttpMethod["HEAD"] = "HEAD";
})(HttpMethod || (HttpMethod = {}));
var Client = (function () {
    /**
     * Creates a client that can be used with any Postmark Server.
     */
    function Client(serverKey, options) {
        if (options === void 0) { options = {}; }
        if (!serverKey) {
            throw new Error("You must provide your postmark API key");
        }
        options.apiKey = serverKey;
        options.authorizationHeader = "X-Postmark-Server-Token";
        //this.processRequestWithBody = this.options.requestFactory(this.options);
    }
    Client.prototype.processRequestWithBody = function (url, method, payload) {
        return ts_promise_1.default.reject(new Error("Not implemented."));
    };
    Client.prototype.processRequestWithoutBody = function (url, method) {
        return ts_promise_1.default.reject(new Error("Not implemented."));
    };
    /** Send a single email message. */
    Client.prototype.sendEmail = function (message) {
        return this.processRequestWithBody('/email', HttpMethod.POST, message);
    };
    return Client;
}());
exports.default = Client;
