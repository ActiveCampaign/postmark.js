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
    /** Send a single email message. */
    ServerClient.prototype.sendEmail = function (message) {
        return this.processRequestWithBody('/email', _1.HttpMethod.POST, message);
    };
    /**
     * Send a message using a template.
     * @param message The message you wish to send.
     */
    ServerClient.prototype.sendEmailWithTemplate = function (message) {
        return this.processRequestWithBody('/email/withTemplate', _1.HttpMethod.POST, message);
    };
    ;
    /**
     * Send a batch of templated email messages.
     * @param messages An array of `TemplatedPostmarkMessage` you wish to send using this Client.
     */
    ServerClient.prototype.sendEmailBatchWithTemplates = function (messages) {
        return this.processRequestWithBody('/email/batchWithTemplates', _1.HttpMethod.POST, { Messages: messages });
    };
    ;
    /**
     * Send a batch of email messages.
     * @param messages An array of `PostmarkMessage` you wish to send using this Client.
     */
    ServerClient.prototype.sendEmailBatch = function (messages) {
        return this.processRequestWithBody('/email/batch', _1.HttpMethod.POST, messages);
    };
    ;
    /**
     * Retrieve delivery statistic information for the associated Server.
     */
    ServerClient.prototype.getDeliveryStatistics = function () {
        return this.processRequestWithoutBody('/deliverystats', _1.HttpMethod.GET);
    };
    ;
    /**
     * Retrieve a batch of bounces. The default batch size is 100, and the offset is 0.
     * @method getBounces
     * @param filter An optional filter for which bounces to retrieve.
     */
    ServerClient.prototype.getBounces = function (filter) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/bounces', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get a information for a specific Bounce.
     * @param id The ID of the Bounce you wish to retrieve.
     */
    ServerClient.prototype.getBounce = function (id) {
        return this.processRequestWithoutBody('/bounces/' + id, _1.HttpMethod.GET);
    };
    ;
    /**
     * Get a Bounce Dump for a specific Bounce.
     * @param id
     */
    ServerClient.prototype.getBounceDump = function (id) {
        return this.processRequestWithoutBody('/bounces/' + id + '/dump', _1.HttpMethod.GET);
    };
    ;
    /**
     * Cause an email address that was deactivated due to a Bounce to be reactivated.
     * @param id The ID of the Bounce for which you wish to activate the associated email.
     */
    ServerClient.prototype.activateBounce = function (id) {
        return this.processRequestWithBody('/bounces/' + id + '/activate', _1.HttpMethod.PUT, null);
    };
    ;
    /**
     * Get an array of tags associated with bounces.
     */
    ServerClient.prototype.getBounceTags = function () {
        return this.processRequestWithoutBody('/bounces/tags', _1.HttpMethod.GET);
    };
    ;
    /**
     * Get the information for the Server associated with this Client.
     */
    ServerClient.prototype.getServer = function () {
        return this.processRequestWithoutBody('/server', _1.HttpMethod.GET);
    };
    ;
    /**
     * Modify the Server associated with this Client.
     * @param serverOptions The options you wish to modify for this server.
     */
    ServerClient.prototype.editServer = function (serverOptions) {
        return this.processRequestWithBody('/server', _1.HttpMethod.PUT, serverOptions);
    };
    ;
    /**
     * Retrieve a batch of Outbound Messages. The default batch size is 100, and the offset is 0.
     * You can make successive calls to the API to retrieve additional Outbound Messages.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getOutboundMessages = function (filter) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        }, filter);
        return this.processRequestWithoutBody('/messages/outbound', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get details for a specific Outbound Message.
     * @param id The ID of the Outbound Message for which you wish to retrieve details.
     */
    ServerClient.prototype.getOutboundMessageDetails = function (id) {
        return this.processRequestWithoutBody('/messages/outbound/' + id + '/details', _1.HttpMethod.GET);
    };
    ;
    /**
     * Get the Opens for Outbound Messages. The default batch size is 100, and offset is 0.
     * You can make successive calls to the API to retrieve additional Opens information.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getMessageOpens = function (filter) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/outbound/opens', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get the Clicks for Outbound Messages. The default batch size is 100, and offset is 0.
     * You can make successive calls to the API to retrieve additional Opens information.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getMessageClicks = function (filter) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/outbound/clicks', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get Click information for a single Outbound Message. The default batch size is 100, and offset is 0.
     * @param messageId The MessageID for which clicks should be retrieved.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getMessageClicksForSingleMessage = function (messageId, filter) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/outbound/clicks/' + messageId, _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get Open information for a single Outbound Message. The default batch size is 100, and offset is 0.
     * @param messageId The ID of the Message for which you wish to retrieve Opens.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getMessageOpensForSingleMessage = function (messageId, filter) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody("/messages/outbound/opens/" + messageId, _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Retrieve a batch of Inbound Messages. The default batch size is 100, and the offset is 0.
     * You can make successive calls to the API to retrieve additional Inbound Messages.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getInboundMessages = function (filter) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/inbound', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get details for a specific Inbound Message.
     * @param messageId The ID of the Inbound Message for which you wish to retrieve details.
     */
    ServerClient.prototype.getInboundMessageDetails = function (messageId) {
        return this.processRequestWithoutBody("/messages/inbound/" + messageId + "/details", _1.HttpMethod.GET);
    };
    ;
    /**
     * Cause an Inbound Message to bypass filtering rules defined on this Client's associated Server.
     * @param messageId The ID of the Inbound Message for which you wish to bypass the filtering rules.
     */
    ServerClient.prototype.bypassBlockedInboundMessage = function (messageId) {
        return this.processRequestWithoutBody("/messages/inbound/" + messageId + "/bypass", _1.HttpMethod.PUT);
    };
    ;
    /**
     * Request that Postmark retry POSTing to the Inbound Hook for the specified message.
     * @param messageId The ID of the Inbound Message for which you wish to retry the inbound hook.
     */
    ServerClient.prototype.retryInboundHookForMessage = function (messageId) {
        return this.processRequestWithoutBody("/messages/inbound/" + messageId + "/retry", _1.HttpMethod.PUT);
    };
    ;
    /**
     * Get overview statistics on Outbound Messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getOuboundOverview = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get statistics on email sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getSentCounts = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/sends', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get statistiscs on emails that bounced after being sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getBounceCounts = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/bounces', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get SPAM complaint statistics for email sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getSpamComplaints = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/spam', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get email tracking statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getTrackedEmailCounts = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/tracked', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get Open statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getEmailOpenCounts = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/opens', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get Email Client Platform statistics  for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getEmailPlatformUsage = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/opens/platforms', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get statistics on which Email Clients were used to open messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getEmailClientUsage
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    ServerClient.prototype.getEmailClientUsage = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/opens/emailclients', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get Read Time statistics for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getEmailReadTimes
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    ServerClient.prototype.getEmailReadTimes = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/opens/readtimes', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get total clicks statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getClickCounts
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    ServerClient.prototype.getClickCounts = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/clicks', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get browser family statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getBrowserUsage
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    ServerClient.prototype.getBrowserUsage = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/clicks/browserfamilies', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get browser platform statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getBrowserPlatforms
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    ServerClient.prototype.getBrowserPlatforms = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/clicks/platforms', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get click location statistics for tracked links for messages sent from the Server associated with this Client.
     * (Shows whether a tracked link was clicked from "HTML" or "Text" body of the email)
     *
     * @memberof Client.prototype
     * @method getClickLocation
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    ServerClient.prototype.getClickLocation = function (filter) {
        return this.processRequestWithoutBody('/stats/outbound/clicks/location', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Create a new Tag Trigger.
     * @param options Configuration options to be used in creating the trigger.
     */
    ServerClient.prototype.createTagTrigger = function (options) {
        return this.processRequestWithBody('/triggers/tags', _1.HttpMethod.POST, options);
    };
    ;
    /**
     * Modify an existing Tag Trigger.
     * @param id The ID of the Tag Trigger you wish to modify.
     * @param options The tag trigger options
     */
    ServerClient.prototype.editTagTrigger = function (id, options) {
        this.processRequestWithBody('/triggers/tags/' + id, _1.HttpMethod.PUT, options);
    };
    ;
    /**
     * Delete an existing Tag Trigger.
     * @param id The ID of the Tag Trigger you wish to delete.
     */
    ServerClient.prototype.deleteTagTrigger = function (id) {
        return this.processRequestWithoutBody("/triggers/tags/" + id, _1.HttpMethod.DELETE);
    };
    ;
    /**
     * Get a specific Tag Trigger.
     * @param id The ID of the Tag Trigger you wish to retrieve.
     */
    ServerClient.prototype.getTagTrigger = function (id) {
        return this.processRequestWithoutBody('/triggers/tags/' + id, _1.HttpMethod.GET);
    };
    ;
    /**
     * Get a list of Tag Trigger. The default batch count is 100, and the offset is 0.
     * You may retrieve additional Tag Triggers by making successive calls to the API.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getTagTriggers = function (filter) {
        filter = utils_1.coalesce({
            count: 100,
            offset: 0
        }, filter);
        return this.processRequestWithoutBody('/triggers/tags/', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Create an Inbound Rule Trigger.
     * @param options The configuration options to used when creating this Trigger.
     */
    ServerClient.prototype.createInboundRuleTrigger = function (options) {
        return this.processRequestWithBody('/triggers/inboundrules', _1.HttpMethod.POST, options);
    };
    ;
    /**
     * Delete an Inbound Rule Trigger.
     * @param {number} id The ID of the Inbound Rule Trigger you wish to delete.
     */
    ServerClient.prototype.deleteInboundRuleTrigger = function (id) {
        return this.processRequestWithoutBody("/triggers/inboundrules/" + id, _1.HttpMethod.DELETE);
    };
    ;
    /**
     * Get a list of Inbound Rule Triggers. The default batch count is 100, and the offset is 0.
     * You may retrieve additional Inbound Rule Tag Triggers by making successive calls to the API.
     * @param filter Optional filtering parameters.
     */
    ServerClient.prototype.getInboundRuleTriggers = function (filter) {
        filter = utils_1.coalesce({
            count: 100,
            offset: 0
        }, filter);
        return this.processRequestWithoutBody('/triggers/inboundrules', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get the list of templates assoicated with this server.
     * @param filter Optional filtering options.
     */
    ServerClient.prototype.getTemplates = function (filter) {
        filter = utils_1.coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/templates', _1.HttpMethod.GET, filter);
    };
    ;
    /**
     * Get the a specific template assoicated with this server.
     * @param idOrAlias The templateid or alias for the template you wish to retrieve.
     */
    ServerClient.prototype.getTemplate = function (idOrAlias) {
        return this.processRequestWithoutBody("/templates/" + idOrAlias, _1.HttpMethod.GET);
    };
    ;
    /**
     * Delete a template associated with this server.
     * @param idOrAlias The templateid or template alias you wish to delete.
     */
    ServerClient.prototype.deleteTemplate = function (idOrAlias) {
        return this.processRequestWithoutBody("/templates/" + idOrAlias, _1.HttpMethod.DELETE);
    };
    /**
     * Create a new template on the associated server.
     * @param template The template you wish to create.
     */
    ServerClient.prototype.createTemplate = function (template) {
        return this.processRequestWithBody('/templates/', _1.HttpMethod.POST, template);
    };
    /**
     * Update a template on the associated server.
     * @param idOrAlias The id or alias of the template you wish to update.
     * @param template The values on the template you wish to update.
     */
    ServerClient.prototype.editTemplate = function (idOrAlias, template) {
        return this.processRequestWithBody("/templates/" + idOrAlias, _1.HttpMethod.PUT, template);
    };
    /**
     * Validate template markup to verify that it will be parsed. Also provides a recommended template
     * model to be used when sending using the specified template content.
     * @param templateContent The template you wish to validate.
     */
    ServerClient.prototype.validateTemplate = function (templateContent) {
        return this.processRequestWithBody('/templates/validate', _1.HttpMethod.POST, templateContent);
    };
    return ServerClient;
}(BaseClient_1.default));
exports.default = ServerClient;
