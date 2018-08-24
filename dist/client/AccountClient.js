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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseClient_1 = require("./BaseClient");
var models_1 = require("./models");
var AccountClient = /** @class */ (function (_super) {
    __extends(AccountClient, _super);
    /**
     * Create a new AccountClient
     * @param accountToken The account token that should be used with requests.
     * @param configOptions Various options to customize client behavior.
     */
    function AccountClient(accountToken, configOptions) {
        return _super.call(this, accountToken, models_1.ClientOptions.DefaultHeaderNames.ACCOUNT_TOKEN, configOptions) || this;
    }
    /**
     * Retrieve a list of Servers.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.getServers = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, '/servers', filter, callback);
    };
    ;
    /**
     * Retrieve a single server by ID.
     *
     * @param id - The ID of the Server for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.getServer = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, "/servers/" + id, {}, callback);
    };
    ;
    /**
     * Create a new Server.
     *
     * @param options - The options to be used to create new Server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.createServer = function (options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.POST, '/servers', options, callback);
    };
    ;
    /**
     * Modify the Server associated with this Client.
     *
     * @param id - The ID of the Server you wish to update.
     * @param options - The options to be used to create new Server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.editServer = function (id, options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.PUT, "/servers/" + id, options, callback);
    };
    ;
    /**
     * Modify the Server associated with this Client.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.deleteServer = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.DELETE, "/servers/" + id, {}, callback);
    };
    ;
    /**
     * Retrieve a batch of Domains.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.getDomains = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, '/domains', filter, callback);
    };
    ;
    /**
     * Retrieve a single Domain by ID.
     *
     * @param id - The ID of the Domain for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.getDomain = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, "/domains/" + id, {}, callback);
    };
    ;
    /**
     * Create a new Domain.
     *
     * @param options - The options to be used to create new Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.createDomain = function (options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.POST, '/domains/', options, callback);
    };
    ;
    /**
     * Update a Domain.
     *
     * @param id - The ID of the Domain you wish to update.
     * @param domain - The values on the Domain you wish to update.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.editDomain = function (id, options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.PUT, "/domains/" + id, options, callback);
    };
    /**
     * Delete a Domain.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param options - The options to be used in create Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.deleteDomain = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.DELETE, "/domains/" + id, {}, callback);
    };
    ;
    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.verifyDomainDKIM = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.PUT, "/domains/" + id + "/verifyDKIM", {}, callback);
    };
    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.verifyDomainReturnPath = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.PUT, "/domains/" + id + "/verifyReturnPath", {}, callback);
    };
    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.verifyDomainSPF = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.PUT, "/domains/" + id + "/verifySPF", {}, callback);
    };
    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.rotateDomainDKIM = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.PUT, "/domains/" + id + "/rotateDKIM", {}, callback);
    };
    /**
     * Retrieve a single Sender Signature by ID.
     *
     * @param id - The ID of the Sender Signature for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.getSenderSignature = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, "/senders/" + id, {}, callback);
    };
    ;
    /**
     * Retrieve a batch of Sender Signatures.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.getSenderSignatures = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, '/senders', filter, callback);
    };
    ;
    /**
     * Create a new Sender Signature.
     *
     * @param options - The options to be used to create new Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.createSenderSignature = function (options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.POST, '/senders/', options, callback);
    };
    ;
    /**
     * Update a Sender Signature.
     *
     * @param id - The ID of the Sender Signature for which you wish to update.
     * @param options - The values on the Sender Signature you wish to update.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.editSenderSignature = function (id, options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.PUT, "/senders/" + id, options, callback);
    };
    ;
    /**
     * Delete a Domain.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param options - The options to be used in create Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.deleteSenderSignature = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.DELETE, "/senders/" + id, {}, callback);
    };
    ;
    /**
     * Request a new confirmation email to be sent to the email address associated with a Sender Signature.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.resendSenderSignatureConfirmation = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.POST, "/senders/" + id + "/resend", {}, callback);
    };
    ;
    /**
     * Request that the SPF records for Sender Signature be verified.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.verifySenderSignatureSPF = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.POST, "/senders/" + id + "/verifySpf", {}, callback);
    };
    ;
    /**
     * Request that the SPF records for Sender Signature be verified.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    AccountClient.prototype.requestNewDKIMForSenderSignature = function (id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.POST, "/senders/" + id + "/requestNewDkim", {}, callback);
    };
    ;
    return AccountClient;
}(BaseClient_1.default));
exports.default = AccountClient;
//# sourceMappingURL=AccountClient.js.map