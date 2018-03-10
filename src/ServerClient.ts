import Promise from 'ts-promise';
import {
    HttpMethod,
    IClientOptions,
    PostmarkMessage, 
    PostmarkResponse,
    TemplatedPostmarkMessage,
    IOutboundMessageFilter,
    IBounceQueryFilter, 
    IOpensFilter,
    IClicksFilter,
    IServerOptions,
} from './models/';

import { IFakeFilteringOptions, IFakeOptions } from './models';

import BaseClient from './BaseClient';
import { coalesce } from './utils';

export default class ServerClient extends BaseClient {
    /**
     * Create a client that can be used to interact with an individual Postmark Server.
     * @param serverToken The token for the server that you wish to interact with.
     * @param options Options to customize the behavior of the this client.
     */
    constructor(serverToken: string, options?: IClientOptions) {
        super(serverToken, 'X-Postmark-Server-Token', options);
    }

    /** Send a single email message. */
    sendEmail(message: PostmarkMessage): Promise<PostmarkResponse> {
        return this.processRequestWithBody<PostmarkResponse>('/email', HttpMethod.POST, message);
    }

    /**
     * Send a message using a template.
     * @param message The message you wish to send.
     */
    sendEmailWithTemplate(message: TemplatedPostmarkMessage): Promise<PostmarkResponse> {
        return this.processRequestWithBody<PostmarkResponse>('/email/withTemplate', HttpMethod.POST, message);
    };

    /**
     * Send a batch of templated email messages.
     * @param messages An array of `TemplatedPostmarkMessage` you wish to send using this Client.
     */
    sendEmailBatchWithTemplates(messages: TemplatedPostmarkMessage[]): Promise<PostmarkResponse[]> {
        return this.processRequestWithBody('/email/batchWithTemplates', HttpMethod.POST, { Messages: messages });
    };

    /**
     * Send a batch of email messages.
     * @param messages An array of `PostmarkMessage` you wish to send using this Client.
     */
    sendEmailBatch(messages: PostmarkMessage[]) {
        return this.processRequestWithBody('/email/batch', HttpMethod.POST, messages);
    };

    /**
     * Retrieve delivery statistic information for the associated Server.
     */
    getDeliveryStatistics() {
        return this.processRequestWithoutBody('/deliverystats', HttpMethod.GET);
    };

    /**
     * Retrieve a batch of bounces. The default batch size is 100, and the offset is 0.
     * @method getBounces
     * @param filter An optional filter for which bounces to retrieve.
     */
    getBounces(filter?: IBounceQueryFilter) {
        filter = coalesce(filter, {
            count: 100,
            offset: 0
        });

        return this.processRequestWithoutBody('/bounces', HttpMethod.GET, filter);
    };

    /**
     * Get a information for a specific Bounce.
     * @param id The ID of the Bounce you wish to retrieve.
     */
    getBounce(id: string) {
        return this.processRequestWithoutBody('/bounces/' + id, HttpMethod.GET);
    };

    /**
     * Get a Bounce Dump for a specific Bounce.
     * @param id
     */
    getBounceDump(id: string) {
        return this.processRequestWithoutBody('/bounces/' + id + '/dump', HttpMethod.GET);
    };

    /**
     * Cause an email address that was deactivated due to a Bounce to be reactivated.
     * @param id The ID of the Bounce for which you wish to activate the associated email.
     */
    activateBounce(id: string) {
        return this.processRequestWithBody('/bounces/' + id + '/activate', HttpMethod.PUT, null);
    };

    /**
     * Get an array of tags associated with bounces.
     */
    getBounceTags() {
        return this.processRequestWithoutBody('/bounces/tags', HttpMethod.GET);
    };

    /**
     * Get the information for the Server associated with this Client.
     */
    getServer() {
        return this.processRequestWithoutBody('/server', HttpMethod.GET);
    };

    /**
     * Modify the Server associated with this Client.
     * @param serverOptions The options you wish to modify for this server.
     */
    editServer(serverOptions: IServerOptions) {
        return this.processRequestWithBody('/server', HttpMethod.PUT, serverOptions);
    };

    /**
     * Retrieve a batch of Outbound Messages. The default batch size is 100, and the offset is 0.
     * You can make successive calls to the API to retrieve additional Outbound Messages.
     * @param filter Optional filtering parameters.
     */
    getOutboundMessages(filter?: IOutboundMessageFilter) {
        filter = coalesce(filter, {
            count: 100,
            offset: 0
        }, filter);
        return this.processRequestWithoutBody('/messages/outbound', HttpMethod.GET, filter);
    };

    /**
     * Get details for a specific Outbound Message.
     * @param id The ID of the Outbound Message for which you wish to retrieve details.
     */
    getOutboundMessageDetails(id: string) {
        return this.processRequestWithoutBody('/messages/outbound/' + id + '/details', HttpMethod.GET);
    };

    /**
     * Get the Opens for Outbound Messages. The default batch size is 100, and offset is 0.
     * You can make successive calls to the API to retrieve additional Opens information.
     * @param filter Optional filtering parameters.
     */
    getMessageOpens(filter?: IOpensFilter) {
        filter = coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/outbound/opens', HttpMethod.GET, filter);
    };


    /**
     * Get the Clicks for Outbound Messages. The default batch size is 100, and offset is 0.
     * You can make successive calls to the API to retrieve additional Opens information.
     * @param filter Optional filtering parameters.
     */
    getMessageClicks(filter?: IClicksFilter) {
        filter = coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/outbound/clicks', HttpMethod.GET, filter);
    };

    /**
     * Get Click information for a single Outbound Message. The default batch size is 100, and offset is 0.
     * @param messageId The MessageID for which clicks should be retrieved.
     * @param filter Optional filtering parameters.
     */
    getMessageClicksForSingleMessage(messageId: string, filter?: IFakeFilteringOptions) {
        filter = coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/outbound/clicks/' + messageId, HttpMethod.GET, filter);
    };

    /**
     * Get Open information for a single Outbound Message. The default batch size is 100, and offset is 0.
     * @param messageId The ID of the Message for which you wish to retrieve Opens.
     * @param filter Optional filtering parameters.
     */
    getMessageOpensForSingleMessage(messageId: string, filter?: IFakeFilteringOptions) {
        filter = coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody(`/messages/outbound/opens/${messageId}`, HttpMethod.GET, filter);
    };

    /**
     * Retrieve a batch of Inbound Messages. The default batch size is 100, and the offset is 0.
     * You can make successive calls to the API to retrieve additional Inbound Messages.
     * @param filter Optional filtering parameters.
     */
    getInboundMessages(filter?: IFakeFilteringOptions) {
        filter = coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/messages/inbound', HttpMethod.GET, filter);
    };

    /**
     * Get details for a specific Inbound Message.
     * @param messageId The ID of the Inbound Message for which you wish to retrieve details.
     */
    getInboundMessageDetails(messageId: string) {
        return this.processRequestWithoutBody(`/messages/inbound/${messageId}/details`, HttpMethod.GET);
    };

    /**
     * Cause an Inbound Message to bypass filtering rules defined on this Client's associated Server.
     * @param messageId The ID of the Inbound Message for which you wish to bypass the filtering rules.
     */
    bypassBlockedInboundMessage(messageId: string) {
        return this.processRequestWithoutBody(`/messages/inbound/${messageId}/bypass`, HttpMethod.PUT);
    };

    /**
     * Request that Postmark retry POSTing to the Inbound Hook for the specified message.
     * @param messageId The ID of the Inbound Message for which you wish to retry the inbound hook.
     */
    retryInboundHookForMessage(messageId: string) {
        return this.processRequestWithoutBody(`/messages/inbound/${messageId}/retry`, HttpMethod.PUT);
    };


    /**
     * Get overview statistics on Outbound Messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    getOuboundOverview(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound', HttpMethod.GET, filter);
    };

    /**
     * Get statistics on email sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    getSentCounts(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/sends', HttpMethod.GET, filter);
    };

    /**
     * Get statistiscs on emails that bounced after being sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    getBounceCounts(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/bounces', HttpMethod.GET, filter);
    };

    /**
     * Get SPAM complaint statistics for email sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    getSpamComplaints(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/spam', HttpMethod.GET, filter);
    };

    /**
     * Get email tracking statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    getTrackedEmailCounts(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/tracked', HttpMethod.GET, filter);
    };

    /**
     * Get Open statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    getEmailOpenCounts(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/opens', HttpMethod.GET, filter);
    };

    /**
     * Get Email Client Platform statistics  for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     */
    getEmailPlatformUsage(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/opens/platforms', HttpMethod.GET, filter);
    };

    /**
     * Get statistics on which Email Clients were used to open messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getEmailClientUsage
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    getEmailClientUsage(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/opens/emailclients', HttpMethod.GET, filter);
    };

    /**
     * Get Read Time statistics for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getEmailReadTimes
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    getEmailReadTimes(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/opens/readtimes', HttpMethod.GET, filter);
    };

    /**
     * Get total clicks statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getClickCounts
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    getClickCounts(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/clicks', HttpMethod.GET, filter);
    };

    /**
     * Get browser family statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getBrowserUsage
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    getBrowserUsage(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/clicks/browserfamilies', HttpMethod.GET, filter);
    };

    /**
     * Get browser platform statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getBrowserPlatforms
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     * @return {Promise} If no callback is passed, returns a Promise with the JSON response from the API (or error).
     */
    getBrowserPlatforms(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/clicks/platforms', HttpMethod.GET, filter);
    };

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
    getClickLocation(filter?: IFakeFilteringOptions) {
        return this.processRequestWithoutBody('/stats/outbound/clicks/location', HttpMethod.GET, filter);
    };

    /**
     * Create a new Tag Trigger.
     * @param options Configuration options to be used in creating the trigger.
     */
    createTagTrigger(options: IFakeOptions) {
        return this.processRequestWithBody('/triggers/tags', HttpMethod.POST, options);
    };

    /**
     * Modify an existing Tag Trigger.
     * @param id The ID of the Tag Trigger you wish to modify.
     * @param options The tag trigger options
     */
    editTagTrigger(id: number, options: IFakeOptions) {
        this.processRequestWithBody('/triggers/tags/' + id, HttpMethod.PUT, options);
    };

    /**
     * Delete an existing Tag Trigger.
     * @param id The ID of the Tag Trigger you wish to delete.
     */
    deleteTagTrigger(id: number) {
        return this.processRequestWithoutBody(`/triggers/tags/${id}`, HttpMethod.DELETE);
    };

    /**
     * Get a specific Tag Trigger.
     * @param id The ID of the Tag Trigger you wish to retrieve.
     */
    getTagTrigger(id: number) {
        return this.processRequestWithoutBody('/triggers/tags/' + id, HttpMethod.GET);
    };

    /**
     * Get a list of Tag Trigger. The default batch count is 100, and the offset is 0.
     * You may retrieve additional Tag Triggers by making successive calls to the API.
     * @param filter Optional filtering parameters.
     */
    getTagTriggers(filter?: IFakeFilteringOptions) {
        filter = coalesce({
            count: 100,
            offset: 0
        }, filter);
        return this.processRequestWithoutBody('/triggers/tags/', HttpMethod.GET, filter);
    };

    /**
     * Create an Inbound Rule Trigger.
     * @param options The configuration options to used when creating this Trigger.
     */
    createInboundRuleTrigger(options: IFakeOptions) {
        return this.processRequestWithBody('/triggers/inboundrules', HttpMethod.POST, options);
    };

    /**
     * Delete an Inbound Rule Trigger.
     * @param {number} id The ID of the Inbound Rule Trigger you wish to delete.
     */
    deleteInboundRuleTrigger(id: number) {
        return this.processRequestWithoutBody(`/triggers/inboundrules/${id}`, HttpMethod.DELETE);
    };

    /**
     * Get a list of Inbound Rule Triggers. The default batch count is 100, and the offset is 0.
     * You may retrieve additional Inbound Rule Tag Triggers by making successive calls to the API.
     * @param filter Optional filtering parameters.
     */
    getInboundRuleTriggers(filter?: IFakeFilteringOptions) {
        filter = coalesce({
            count: 100,
            offset: 0
        }, filter);
        return this.processRequestWithoutBody('/triggers/inboundrules', HttpMethod.GET, filter);
    };

    /**
     * Get the list of templates assoicated with this server.
     * @param filter Optional filtering options.
     */
    getTemplates(filter: IFakeFilteringOptions) {
        filter = coalesce(filter, {
            count: 100,
            offset: 0
        });
        return this.processRequestWithoutBody('/templates', HttpMethod.GET, filter);
    };


    /**
     * Get the a specific template assoicated with this server.
     * @param idOrAlias The templateid or alias for the template you wish to retrieve.
     */
    getTemplate(idOrAlias: (number | string)) {
        return this.processRequestWithoutBody(`/templates/${idOrAlias}`, HttpMethod.GET);
    };

    /**
     * Delete a template associated with this server.
     * @param idOrAlias The templateid or template alias you wish to delete.
     */
    deleteTemplate(idOrAlias: (number | string)) {
        return this.processRequestWithoutBody(`/templates/${idOrAlias}`, HttpMethod.DELETE);
    }

    /**
     * Create a new template on the associated server.
     * @param template The template you wish to create.
     */
    createTemplate(template: IFakeOptions) {
        return this.processRequestWithBody('/templates/', HttpMethod.POST, template);
    }

    /**
     * Update a template on the associated server.
     * @param idOrAlias The id or alias of the template you wish to update.
     * @param template The values on the template you wish to update.
     */
    editTemplate(idOrAlias: (number | string), template: IFakeOptions) {
        return this.processRequestWithBody(`/templates/${idOrAlias}`, HttpMethod.PUT, template);
    }

    /**
     * Validate template markup to verify that it will be parsed. Also provides a recommended template
     * model to be used when sending using the specified template content.
     * @param templateContent The template you wish to validate.
     */
    validateTemplate(templateContent: IFakeOptions) {
        return this.processRequestWithBody('/templates/validate', HttpMethod.POST, templateContent);
    }
}
