"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./models/");
var BaseClient_1 = require("./BaseClient");
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    /**
     * Creates a client that can be used with any Postmark Server.
     */
    function Client(serverKey, options) {
        return _super.call(this, serverKey, 'X-Postmark-Server-Token', options) || this;
    }
    /** Send a single email message. */
    Client.prototype.sendEmail = function (message) {
        return this.processRequestWithBody('/email', _1.HttpMethod.POST, message);
    };
    return Client;
}(BaseClient_1.default));
exports.default = Client;
