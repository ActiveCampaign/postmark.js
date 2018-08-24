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
var index_1 = require("./models/index");
/**
 * Server client class that can be used to interact with an individual Postmark Server.
 */
var ServerClient = /** @class */ (function (_super) {
    __extends(ServerClient, _super);
    /**
     * Create a client.
     *
     * @param serverToken - The token for the server that you wish to interact with.
     * @param configOptions - Options to customize the behavior of the this client.
     */
    function ServerClient(serverToken, configOptions) {
        return _super.call(this, serverToken, index_1.ClientOptions.DefaultHeaderNames.SERVER_TOKEN, configOptions) || this;
    }
    /** Send a single email message.
     *
     * @param email - Email message to send.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.sendEmail = function (email, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, '/email', email, callback);
    };
    /**
     * Send a batch of email messages.
     *
     * @param emails - An array of messages to send.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.sendEmailBatch = function (emails, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, '/email/batch', emails, callback);
    };
    ;
    /**
     * Send a message using a template.
     *
     * @param template - Message you wish to send.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.sendEmailWithTemplate = function (template, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, '/email/withTemplate', template, callback);
    };
    ;
    /**
     * Send a batch of template email messages.
     *
     * @param templates - An array of templated messages you wish to send using this Client.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.sendEmailBatchWithTemplates = function (templates, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, '/email/batchWithTemplates', { Messages: templates }, callback);
    };
    ;
    /**
     * Get bounce statistic information for the associated Server.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getDeliveryStatistics = function (callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/deliveryStats', {}, callback);
    };
    ;
    /**
     * Get a batch of bounces. The default batch size is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBounces = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/bounces', filter, callback);
    };
    ;
    /**
     * Get details for a specific Bounce.
     *
     * @param id - The ID of the Bounce you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBounce = function (id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/bounces/" + id, {}, callback);
    };
    ;
    /**
     * Get a Bounce Dump for a specific Bounce.
     *
     * @param id - The ID of the Bounce for which you wish to retrieve Bounce Dump.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBounceDump = function (id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/bounces/" + id + "/dump", {}, callback);
    };
    ;
    /**
     * Activate email address that was deactivated due to a Bounce.
     *
     * @param id - The ID of the Bounce for which you wish to activate the associated email.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.activateBounce = function (id, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.PUT, "/bounces/" + id + "/activate", {}, callback);
    };
    ;
    /**
     * Get an array of tags associated with bounces.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBounceTags = function (callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/bounces/tags', {}, callback);
    };
    ;
    /**
     * Get the list of templates associated with this server.
     *
     * @param filter - Optional filtering options.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getTemplates = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/templates', filter, callback);
    };
    ;
    /**
     * Get the a specific template associated with this server.
     *
     * @param idOrAlias - ID or alias for the template you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getTemplate = function (idOrAlias, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/templates/" + idOrAlias, {}, callback);
    };
    ;
    /**
     * Delete a template associated with this server.
     *
     * @param idOrAlias - ID or template alias you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.deleteTemplate = function (idOrAlias, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.DELETE, "/templates/" + idOrAlias, {}, callback);
    };
    /**
     * Create a new template on the associated server.
     *
     * @param options - Configuration options to be used to create the Template.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.createTemplate = function (options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, '/templates/', options, callback);
    };
    /**
     * Update a template on the associated server.
     *
     * @param idOrAlias - Id or alias of the template you wish to update.
     * @param options - Template options you wish to update.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.editTemplate = function (idOrAlias, options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.PUT, "/templates/" + idOrAlias, options, callback);
    };
    /**
     * Validate template markup to verify that it will be parsed. Also provides a recommended template
     * model to be used when sending using the specified template content.
     *
     * @param options - The template content you wish to validate.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.validateTemplate = function (options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, '/templates/validate', options, callback);
    };
    /**
     * Get the information for the Server associated with this Client.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getServer = function (callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/server', {}, callback);
    };
    ;
    /**
     * Modify the Server associated with this Client.
     *
     * @param options - The options you wish to modify.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.editServer = function (options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.PUT, '/server', options, callback);
    };
    ;
    /**
     * Get a batch of Outbound Messages. The default batch size is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getOutboundMessages = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/messages/outbound', filter, callback);
    };
    ;
    /**
     * Get details for a specific Outbound Message.
     *
     * @param messageId - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getOutboundMessageDetails = function (messageId, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound/" + messageId, {}, callback);
    };
    ;
    /**
     * Get details for a specific Outbound Message.
     *
     * @param messageId - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getOutboundMessageDump = function (messageId, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound/" + messageId + "/dump", {}, callback);
    };
    ;
    /**
     * Get a batch of Inbound Messages. The default batch size is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getInboundMessages = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/messages/inbound', filter, callback);
    };
    ;
    /**
     * Get details for a specific Inbound Message.
     *
     * @param messageId - The ID of the Inbound Message you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getInboundMessageDetails = function (messageId, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/inbound/" + messageId + "/details", {}, callback);
    };
    ;
    /**
     * Cause an Inbound Message to bypass filtering rules defined on this Client's associated Server.
     *
     * @param messageId - The ID of the Inbound Message for which you wish to bypass the filtering rules.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.bypassBlockedInboundMessage = function (messageId, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.PUT, "/messages/inbound/" + messageId + "/bypass", {}, callback);
    };
    ;
    /**
     * Request that Postmark retry POSTing to the Inbound Hook for the specified message.
     *
     * @param messageId - The ID of the Inbound Message for which you wish to retry the inbound hook.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.retryInboundHookForMessage = function (messageId, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.PUT, "/messages/inbound/" + messageId + "/retry", {}, callback);
    };
    ;
    /**
     * Get the Opens for Outbound Messages. The default batch size is 100, and offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getMessageOpens = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/messages/outbound/opens', filter, callback);
    };
    ;
    /**
     * Get details of Opens for specific Outbound Message.
     *
     * @param messageId - Message ID of the message for which you wish to retrieve Opens.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getMessageOpensForSingleMessage = function (messageId, filter, callback) {
        filter = __assign({ count: 50, offset: 0 }, filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound/opens/" + messageId, filter, callback);
    };
    ;
    /**
     * Get the Clicks for Outbound Messages. The default batch size is 100, and offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getMessageClicks = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/messages/outbound/clicks', filter, callback);
    };
    ;
    /**
     * Get Click information for a single Outbound Message. The default batch size is 100, and offset is 0.
     *
     * @param messageId - The MessageID for which clicks should be retrieved.
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getMessageClicksForSingleMessage = function (messageId, filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound/clicks/" + messageId, filter, callback);
    };
    ;
    /**
     * Get overview statistics on Outbound Messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getOutboundOverview = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound', filter, callback);
    };
    ;
    /**
     * Get statistics on email sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getSentCounts = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/sends', filter, callback);
    };
    ;
    /**
     * Get statistiscs on emails that bounced after being sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBounceCounts = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/bounces', filter, callback);
    };
    ;
    /**
     * Get SPAM complaint statistics for email sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getSpamComplaintsCounts = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/spam', filter, callback);
    };
    ;
    /**
     * Get email tracking statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getTrackedEmailCounts = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/tracked', filter, callback);
    };
    ;
    /**
     * Get Open statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getEmailOpenCounts = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/opens', filter, callback);
    };
    ;
    /**
     * Get Email Client Platform statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getEmailOpenPlatformUsage = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/opens/platforms', filter, callback);
    };
    ;
    /**
     * Get statistics on which Email Clients were used to open messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getEmailOpenClientUsage = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/opens/emailClients', filter, callback);
    };
    ;
    /**
     * Get Read Time statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getEmailOpenReadTimes = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/opens/readTimes', filter, callback);
    };
    ;
    /**
     * Get total clicks statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getClickCounts = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/clicks', filter, callback);
    };
    ;
    /**
     * Get browser family statistics for tracked links for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getClickBrowserUsage = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/clicks/browserFamilies', filter, callback);
    };
    ;
    /**
     * Get browser platform statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getClickPlatformUsage = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/clicks/platforms', filter, callback);
    };
    ;
    /**
     * Get click location (in HTML or Text body of the email) statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getClickLocation = function (filter, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/stats/outbound/clicks/location', filter, callback);
    };
    ;
    /**
     * Create a new Tag Trigger.
     *
     * @param options - Configuration options to be used to create the trigger.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.createTagTrigger = function (options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, '/triggers/tags', options, callback);
    };
    ;
    /**
     * Modify an existing Tag Trigger.
     *
     * @param id - The ID of the Tag Trigger you wish to modify.
     * @param options - Tag trigger options
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.editTagTrigger = function (id, options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.PUT, "/triggers/tags/" + id, options, callback);
    };
    ;
    /**
     * Delete an existing Tag Trigger.
     *
     * @param id - The ID of the Tag Trigger you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.deleteTagTrigger = function (id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.DELETE, "/triggers/tags/" + id, {}, callback);
    };
    ;
    /**
     * Get a specific Tag Trigger.
     *
     * @param id - The ID of the Tag Trigger you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getTagTrigger = function (id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/triggers/tags/" + id, {}, callback);
    };
    ;
    /**
     * Get a list of Tag Trigger. The default batch count is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getTagTriggers = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/triggers/tags/', filter, callback);
    };
    ;
    /**
     * Create an Inbound Rule Trigger.
     *
     * @param options - Configuration options to be used when creating this Trigger.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.createInboundRuleTrigger = function (options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, '/triggers/inboundRules', options, callback);
    };
    ;
    /**
     * Delete an Inbound Rule Trigger.
     *
     * @param id - The ID of the Inbound Rule Trigger you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.deleteInboundRuleTrigger = function (id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.DELETE, "/triggers/inboundRules/" + id, {}, callback);
    };
    ;
    /**
     * Get a list of Inbound Rule Triggers. The default batch count is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getInboundRuleTriggers = function (filter, callback) {
        filter = __assign({ count: 100, offset: 0 }, filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, '/triggers/inboundRules', filter, callback);
    };
    ;
    return ServerClient;
}(BaseClient_1.default));
exports.default = ServerClient;
//# sourceMappingURL=ServerClient.js.map