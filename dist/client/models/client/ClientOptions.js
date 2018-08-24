"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["OPTIONS"] = "OPTIONS";
    HttpMethod["HEAD"] = "HEAD";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var DefaultHeaderNames;
(function (DefaultHeaderNames) {
    DefaultHeaderNames["SERVER_TOKEN"] = "X-Postmark-Server-Token";
    DefaultHeaderNames["ACCOUNT_TOKEN"] = "X-Postmark-Account-Token";
})(DefaultHeaderNames = exports.DefaultHeaderNames || (exports.DefaultHeaderNames = {}));
//# sourceMappingURL=ClientOptions.js.map