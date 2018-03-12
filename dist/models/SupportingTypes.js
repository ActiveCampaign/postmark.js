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
var LinkTrackingOptions;
(function (LinkTrackingOptions) {
    LinkTrackingOptions[LinkTrackingOptions["TextOnly"] = 0] = "TextOnly";
    LinkTrackingOptions[LinkTrackingOptions["HtmlOnly"] = 1] = "HtmlOnly";
    LinkTrackingOptions[LinkTrackingOptions["HtmlAndText"] = 2] = "HtmlAndText";
    LinkTrackingOptions[LinkTrackingOptions["None"] = 3] = "None";
})(LinkTrackingOptions = exports.LinkTrackingOptions || (exports.LinkTrackingOptions = {}));
