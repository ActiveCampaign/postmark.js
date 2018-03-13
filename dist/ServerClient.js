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
var utils_1 = require("./utils");
var ServerClient = /** @class */ (function (_super) {
    __extends(ServerClient, _super);
    /**
     * Create a client that can be used to interact with an individual Postmark Server.
     * @param serverToken The token for the server that you wish to interact with.
     * @param options Options to customize the behavior of the this client.
     */
    function ServerClient(serverToken, options) {
        return _super.call(this, serverToken, 'X-Postmark-Server-Token', options) || this;
    }
    /** Send a single email message.
     * @param message The message to send.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
    */
    ServerClient.prototype.sendEmail = function (message, callback) {
        return this.processRequestWithBody('/email', _1.HttpMethod.POST, message, callback);
    };
    /**
     * Send a message using a template.
     * @param message The message you wish to send.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.sendEmailWithTemplate = function (message, callback) {
        return this.processRequestWithBody('/email/withTemplate', _1.HttpMethod.POST, message, callback);
    };
    ;
    /**
     * Send a batch of templated email messages.
     * @param messages An array of `TemplatedPostmarkMessage` you wish to send using this Client.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.sendEmailBatchWithTemplates = function (messages, callback) {
        return this.processRequestWithBody('/email/batchWithTemplates', _1.HttpMethod.POST, { Messages: messages }, callback);
    };
    ;
    /**
     * Send a batch of email messages.
     * @param messages An array of `PostmarkMessage` you wish to send using this Client.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.sendEmailBatch = function (messages, callback) {
        return this.processRequestWithBody('/email/batch', _1.HttpMethod.POST, messages, callback);
    };
    ;
    /**
     * Retrieve bounce statistic information for the associated Server.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getDeliveryStatistics = function (callback) {
        return this.processRequestWithoutBody('/deliverystats', _1.HttpMethod.GET, null, callback);
    };
    ;
    /**
     * Retrieve a batch of bounces. The default batch size is 100, and the offset is 0.
     * @param filter An optional filter for which bounces to retrieve.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBounces = function (filter, callback) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/bounces', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get a information for a specific Bounce.
     * @param id The ID of the Bounce you wish to retrieve.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBounce = function (id, callback) {
        return this.processRequestWithoutBody("/bounces/" + id, _1.HttpMethod.GET, callback);
    };
    ;
    /**
     * Get a Bounce Dump for a specific Bounce.
     * @param id
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBounceDump = function (id, callback) {
        return this.processRequestWithoutBody("/bounces/" + id + "/dump", _1.HttpMethod.GET, callback);
    };
    ;
    /**
     * Cause an email address that was deactivated due to a Bounce to be reactivated.
     * @param id The ID of the Bounce for which you wish to activate the associated email.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.activateBounce = function (id, callback) {
        return this.processRequestWithBody("/bounces/" + id + "/activate", _1.HttpMethod.PUT, null, callback);
    };
    ;
    /**
     * Get an array of tags associated with bounces.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBounceTags = function (callback) {
        return this.processRequestWithoutBody('/bounces/tags', _1.HttpMethod.GET, null, callback);
    };
    ;
    /**
     * Get the information for the Server associated with this Client.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getServer = function (callback) {
        return this.processRequestWithoutBody('/server', _1.HttpMethod.GET, null);
    };
    ;
    /**
     * Modify the Server associated with this Client.
     * @param serverOptions The options you wish to modify for this server.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.editServer = function (serverOptions, callback) {
        return this.processRequestWithBody('/server', _1.HttpMethod.PUT, serverOptions, callback);
    };
    ;
    /**
     * Retrieve a batch of Outbound Messages. The default batch size is 100, and the offset is 0.
     * You can make successive calls to the API to retrieve additional Outbound Messages.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getOutboundMessages = function (filter, callback) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/outbound', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get details for a specific Outbound Message.
     * @param id The ID of the Outbound Message for which you wish to retrieve details.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getOutboundMessageDetails = function (id, callback) {
        return this.processRequestWithoutBody("/messages/outbound/" + id + "/details", _1.HttpMethod.GET, null, callback);
    };
    ;
    /**
     * Get the Opens for Outbound Messages. The default batch size is 100, and offset is 0.
     * You can make successive calls to the API to retrieve additional Opens information.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getMessageOpens = function (filter, callback) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/outbound/opens', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get the Clicks for Outbound Messages. The default batch size is 100, and offset is 0.
     * You can make successive calls to the API to retrieve additional Opens information.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getMessageClicks = function (filter, callback) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/outbound/clicks', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get Click information for a single Outbound Message. The default batch size is 100, and offset is 0.
     * @param messageId The MessageID for which clicks should be retrieved.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getMessageClicksForSingleMessage = function (messageId, filter, callback) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody("/messages/outbound/clicks/" + messageId, _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get Open information for a single Outbound Message. The default batch size is 100, and offset is 0.
     * @param messageId The ID of the Message for which you wish to retrieve Opens.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getMessageOpensForSingleMessage = function (messageId, filter, callback) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody("/messages/outbound/opens/" + messageId, _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Retrieve a batch of Inbound Messages. The default batch size is 100, and the offset is 0.
     * You can make successive calls to the API to retrieve additional Inbound Messages.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getInboundMessages = function (filter, callback) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/inbound', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get details for a specific Inbound Message.
     * @param messageId The ID of the Inbound Message for which you wish to retrieve details.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getInboundMessageDetails = function (messageId, callback) {
        return this.processRequestWithoutBody("/messages/inbound/" + messageId + "/details", _1.HttpMethod.GET, null, callback);
    };
    ;
    /**
     * Cause an Inbound Message to bypass filtering rules defined on this Client's associated Server.
     * @param messageId The ID of the Inbound Message for which you wish to bypass the filtering rules.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.bypassBlockedInboundMessage = function (messageId, callback) {
        return this.processRequestWithoutBody("/messages/inbound/" + messageId + "/bypass", _1.HttpMethod.PUT, null, callback);
    };
    ;
    /**
     * Request that Postmark retry POSTing to the Inbound Hook for the specified message.
     * @param messageId The ID of the Inbound Message for which you wish to retry the inbound hook.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.retryInboundHookForMessage = function (messageId, callback) {
        return this.processRequestWithoutBody("/messages/inbound/" + messageId + "/retry", _1.HttpMethod.PUT, null, callback);
    };
    ;
    /**
     * Get overview statistics on Outbound Messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getOuboundOverview = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get statistics on email sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getSentCounts = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/sends', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get statistiscs on emails that bounced after being sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBounceCounts = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/bounces', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get SPAM complaint statistics for email sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getSpamComplaints = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/spam', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get email tracking statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getTrackedEmailCounts = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/tracked', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get Open statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getEmailOpenCounts = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/opens', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get Email Client Platform statistics  for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getEmailPlatformUsage = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/opens/platforms', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get statistics on which Email Clients were used to open messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getEmailClientUsage = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/opens/emailclients', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get Read Time statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getEmailReadTimes = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/opens/readtimes', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get total clicks statistics for tracked links for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getClickCounts = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/clicks', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get browser family statistics for tracked links for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBrowserUsage = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/clicks/browserfamilies', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get browser platform statistics for tracked links for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getBrowserPlatforms = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/clicks/platforms', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get click location statistics for tracked links for messages sent from the Server associated with this Client.
     * (Shows whether a tracked link was clicked from "HTML" or "Text" body of the email)
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getClickLocation = function (filter, callback) {
        return this.processRequestWithoutBody('/stats/outbound/clicks/location', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Create a new Tag Trigger.
     * @param options Configuration options to be used in creating the trigger.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.createTagTrigger = function (options, callback) {
        return this.processRequestWithBody('/triggers/tags', _1.HttpMethod.POST, options, callback);
    };
    ;
    /**
     * Modify an existing Tag Trigger.
     * @param id The ID of the Tag Trigger you wish to modify.
     * @param options The tag trigger options
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.editTagTrigger = function (id, options, callback) {
        return this.processRequestWithBody('/triggers/tags/' + id, _1.HttpMethod.PUT, options, callback);
    };
    ;
    /**
     * Delete an existing Tag Trigger.
     * @param id The ID of the Tag Trigger you wish to delete.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.deleteTagTrigger = function (id, callback) {
        return this.processRequestWithoutBody("/triggers/tags/" + id, _1.HttpMethod.DELETE, callback);
    };
    ;
    /**
     * Get a specific Tag Trigger.
     * @param id The ID of the Tag Trigger you wish to retrieve.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getTagTrigger = function (id, callback) {
        return this.processRequestWithoutBody("/triggers/tags/" + id, _1.HttpMethod.GET, callback);
    };
    ;
    /**
     * Get a list of Tag Trigger. The default batch count is 100, and the offset is 0.
     * You may retrieve additional Tag Triggers by making successive calls to the API.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getTagTriggers = function (filter, callback) {
        filter = utils_1.coalesce({
            count: 100,
            offset: 0
        }, filter);
        return this.processRequestWithoutBody('/triggers/tags/', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Create an Inbound Rule Trigger.
     * @param options The configuration options to used when creating this Trigger.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.createInboundRuleTrigger = function (options, callback) {
        return this.processRequestWithBody('/triggers/inboundrules', _1.HttpMethod.POST, options, callback);
    };
    ;
    /**
     * Delete an Inbound Rule Trigger.
     * @param id The ID of the Inbound Rule Trigger you wish to delete.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.deleteInboundRuleTrigger = function (id, callback) {
        return this.processRequestWithoutBody("/triggers/inboundrules/" + id, _1.HttpMethod.DELETE, callback);
    };
    ;
    /**
     * Get a list of Inbound Rule Triggers. The default batch count is 100, and the offset is 0.
     * You may retrieve additional Inbound Rule Tag Triggers by making successive calls to the API.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getInboundRuleTriggers = function (filter, callback) {
        filter = utils_1.coalesce({
            count: 100,
            offset: 0
        }, filter);
        return this.processRequestWithoutBody('/triggers/inboundrules', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get the list of templates assoicated with this server.
     * @param filter Optional filtering options.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getTemplates = function (filter, callback) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/templates', _1.HttpMethod.GET, filter, callback);
    };
    ;
    /**
     * Get the a specific template assoicated with this server.
     * @param idOrAlias The templateid or alias for the template you wish to retrieve.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.getTemplate = function (idOrAlias, callback) {
        return this.processRequestWithoutBody("/templates/" + idOrAlias, _1.HttpMethod.GET, null, callback);
    };
    ;
    /**
     * Delete a template associated with this server.
     * @param idOrAlias The templateid or template alias you wish to delete.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.deleteTemplate = function (idOrAlias, callback) {
        return this.processRequestWithoutBody("/templates/" + idOrAlias, _1.HttpMethod.DELETE, null, callback);
    };
    /**
     * Create a new template on the associated server.
     * @param template The template you wish to create.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.createTemplate = function (template, callback) {
        return this.processRequestWithBody('/templates/', _1.HttpMethod.POST, template, callback);
    };
    /**
     * Update a template on the associated server.
     * @param idOrAlias The id or alias of the template you wish to update.
     * @param template The values on the template you wish to update.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.editTemplate = function (idOrAlias, template, callback) {
        return this.processRequestWithBody("/templates/" + idOrAlias, _1.HttpMethod.PUT, template, callback);
    };
    /**
     * Validate template markup to verify that it will be parsed. Also provides a recommended template
     * model to be used when sending using the specified template content.
     * @param templateContent The template you wish to validate.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    ServerClient.prototype.validateTemplate = function (templateContent, callback) {
        return this.processRequestWithBody('/templates/validate', _1.HttpMethod.POST, templateContent, callback);
    };
    return ServerClient;
}(BaseClient_1.default));
exports.default = ServerClient;
