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
var BaseClient_1 = require("./BaseClient");
var AccountClient = (function (_super) {
    __extends(AccountClient, _super);
    /**
     * Create a new AccountClient
     * @param accountToken The account token that should be used with requests.
     * @param options Various options to customize client behavior.
     */
    function AccountClient(accountToken, options) {
        return _super.call(this, accountToken, 'X-Postmark-Account-Token', options) || this;
    }
    return AccountClient;
}(BaseClient_1.default));
exports.default = AccountClient;
