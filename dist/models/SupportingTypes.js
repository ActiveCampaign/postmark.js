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
    LinkTrackingOptions["TextOnly"] = "TextOnly";
    LinkTrackingOptions["HtmlOnly"] = "HtmlOnly";
    LinkTrackingOptions["HtmlAndText"] = "HtmlAndText";
    LinkTrackingOptions["None"] = "None";
})(LinkTrackingOptions = exports.LinkTrackingOptions || (exports.LinkTrackingOptions = {}));
var LinkClickLocation;
(function (LinkClickLocation) {
    LinkClickLocation["HTML"] = "HTML";
    LinkClickLocation["Text"] = "Text";
})(LinkClickLocation = exports.LinkClickLocation || (exports.LinkClickLocation = {}));
