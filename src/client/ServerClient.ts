import {Promise} from 'bluebird';
import BaseClient from './BaseClient';

import {
    ClientOptions,
    HttpMethod,
    DefaultHeaderNames,
    PostmarkCallback,
    QueryStringParameters,
    DefaultResponse,
    Hash,
} from './models/index';

import {
    Message,
    MessageResponse,

    Bounce,
    Bounces,
    BounceDump,
    BounceActivateResponse,
    DeliveryStatistics,

    Server,
    ServerOptions,

    OutboundMessage,
    OutboundMessageDetails,
    OutboundMessages,
    OutboundMessageDump,
    OutboundMessageOpens,
    OutboundMessageClicks,

    InboundMessage,
    InboundMessages,
    InboundMessageDetails,

    OutboundStatistics,
    SentCounts,
    BounceCounts,
    SpamCounts,
    TrackedEmailCounts,
    OpenCounts,
    EmailPlaformUsageCounts,
    EmailClientUsageCounts,
    EmailReadTimesCounts,
    ClickCounts,
    BrowserUsageCounts,
    ClickPlaformUsageCounts,
    ClickLocationCounts,

} from './models/index';

/**
 * Server client class that can be used to interact with an individual Postmark Server.
 */
export default class ServerClient extends BaseClient {

    /**
     * Create a client.
     *
     * @param serverToken - The token for the server that you wish to interact with.
     * @param options - Options to customize the behavior of the this client.
     */
    constructor(serverToken: string, options?: ClientOptions) {
        super(serverToken, DefaultHeaderNames.SERVER_TOKEN, options);
    }

    /** Send a single email message.
     *
     * @param message - Email message to send.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    sendEmail(message: Message, callback?: PostmarkCallback<MessageResponse>): Promise<MessageResponse> {
        return this.processRequestWithBody<MessageResponse>(HttpMethod.POST, '/email', message, callback);
    }

    /**
     * Send a batch of email messages.
     *
     * @param messages - An array of messages to send.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    sendEmailBatch(messages: Message[], callback?: PostmarkCallback<MessageResponse[]>): Promise<MessageResponse[]> {
        return this.processRequestWithBody(HttpMethod.POST, '/email/batch', messages, callback);
    };

    /**
     * Get bounce statistic information for the associated Server.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getDeliveryStatistics(callback?: PostmarkCallback<DeliveryStatistics>): Promise<DeliveryStatistics> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/deliverystats', {}, callback);
    };

    /**
     * Get a batch of bounces. The default batch size is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounces(filter: QueryStringParameters = {}, callback?: PostmarkCallback<Bounces>): Promise<Bounces> {
        filter = {...{count: 100, offset: 0}, ...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/bounces', filter, callback);
    };

    /**
     * Get details for a specific Bounce.
     *
     * @param id - The ID of the Bounce you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounce(id: number, callback?: PostmarkCallback<Bounce>): Promise<Bounce> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/bounces/${id}`, {}, callback);
    };

    /**
     * Get a Bounce Dump for a specific Bounce.
     *
     * @param id - The ID of the Bounce for which you wish to retrieve Bounce Dump.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounceDump(id: number, callback?: PostmarkCallback<BounceDump>): Promise<BounceDump> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/bounces/${id}/dump`, {}, callback);
    };

    /**
     * Activate email address that was deactivated due to a Bounce.
     *
     * @param id - The ID of the Bounce for which you wish to activate the associated email.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    activateBounce(id: number, callback?: PostmarkCallback<BounceActivateResponse>): Promise<BounceActivateResponse> {
        return this.processRequestWithBody(HttpMethod.PUT, `/bounces/${id}/activate`, {}, callback);
    };

    /**
     * Get an array of tags associated with bounces.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounceTags(callback?: PostmarkCallback<string[]>): Promise<string[]> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/bounces/tags', {}, callback);
    };

    /**
     * Get the information for the Server associated with this Client.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getServer(callback?: PostmarkCallback<Server>): Promise<Server> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/server', {}, callback);
    };

    /**
     * Modify the Server associated with this Client.
     *
     * @param options - The options you wish to modify.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    editServer(options: ServerOptions, callback?: PostmarkCallback<Server>): Promise<Server> {
        return this.processRequestWithBody(HttpMethod.PUT, '/server', options, callback);
    };

    /**
     * Get a batch of Outbound Messages. The default batch size is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getOutboundMessages(filter: QueryStringParameters = {},
                        callback?: PostmarkCallback<OutboundMessages>): Promise<OutboundMessages> {

        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/messages/outbound', filter, callback);
    };

    /**
     * Get details for a specific Outbound Message.
     *
     * @param messageId - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getOutboundMessageDetails(messageId: string,
                              callback?: PostmarkCallback<OutboundMessageDetails>): Promise<OutboundMessageDetails> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/messages/outbound/${messageId}`, {}, callback);
    };

    /**
     * Get details for a specific Outbound Message.
     *
     * @param messageId - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getOutboundMessageDump(messageId: string,
                              callback?: PostmarkCallback<OutboundMessageDump>): Promise<OutboundMessageDump> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/messages/outbound/${messageId}/dump`, {}, callback);
    };

    /**
     * Get a batch of Inbound Messages. The default batch size is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getInboundMessages(filter: QueryStringParameters = {}, callback?:PostmarkCallback<InboundMessages>) : Promise<InboundMessages> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/messages/inbound', filter, callback);
    };

    /**
     * Get details for a specific Inbound Message.
     *
     * @param messageId - The ID of the Inbound Message you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getInboundMessageDetails(messageId: string, callback?:PostmarkCallback<InboundMessageDetails>) : Promise<InboundMessageDetails> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/messages/inbound/${messageId}/details`, {}, callback);
    };

    /**
     * Cause an Inbound Message to bypass filtering rules defined on this Client's associated Server.
     *
     * @param messageId - The ID of the Inbound Message for which you wish to bypass the filtering rules.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    bypassBlockedInboundMessage(messageId: string, callback?:PostmarkCallback<DefaultResponse>) : Promise<DefaultResponse> {
        return this.processRequestWithoutBody(HttpMethod.PUT, `/messages/inbound/${messageId}/bypass`, {}, callback);
    };

    /**
     * Request that Postmark retry POSTing to the Inbound Hook for the specified message.
     *
     * @param messageId - The ID of the Inbound Message for which you wish to retry the inbound hook.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    retryInboundHookForMessage(messageId: string, callback?:PostmarkCallback<DefaultResponse>) : Promise<DefaultResponse> {
        return this.processRequestWithoutBody(HttpMethod.PUT, `/messages/inbound/${messageId}/retry`, {}, callback);
    };

    /**
     * Get the Opens for Outbound Messages. The default batch size is 100, and offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getMessageOpens(filter: QueryStringParameters = {}, callback?:PostmarkCallback<OutboundMessageOpens>) : Promise<OutboundMessageOpens> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/messages/outbound/opens', filter, callback);
    };

    /**
     * Get details of Opens for specific Outbound Message.
     *
     * @param messageId - Message ID of the message for which you wish to retrieve Opens.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getMessageOpensForSingleMessage(messageId: string, filter: QueryStringParameters = {},
                          callback?:PostmarkCallback<OutboundMessageOpens>) : Promise<OutboundMessageOpens> {

        filter = {...{count: 50, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, `/messages/outbound/opens/${messageId}`, filter, callback);
    };

    /**
     * Get the Clicks for Outbound Messages. The default batch size is 100, and offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getMessageClicks(filter: QueryStringParameters = {}, callback?:PostmarkCallback<OutboundMessageClicks>) : Promise<OutboundMessageClicks> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/messages/outbound/clicks', filter, callback);
    };

    /**
     * Get Click information for a single Outbound Message. The default batch size is 100, and offset is 0.
     *
     * @param messageId - The MessageID for which clicks should be retrieved.
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getMessageClicksForSingleMessage(messageId: string, filter: QueryStringParameters = {},
                                     callback?:PostmarkCallback<OutboundMessageClicks>) : Promise<OutboundMessageClicks> {

        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, `/messages/outbound/clicks/${messageId}`, filter, callback);
    };

    /**
     * Get overview statistics on Outbound Messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getOuboundOverview(filter: QueryStringParameters = {}, callback?: PostmarkCallback<OutboundStatistics>):
        Promise<OutboundStatistics> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound', filter, callback);
    };

    /**
     * Get statistics on email sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getSentCounts(filter: QueryStringParameters = {}, callback?:PostmarkCallback<SentCounts>) : Promise<SentCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/sends', filter, callback);
    };

    /**
     * Get statistiscs on emails that bounced after being sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounceCounts(filter: QueryStringParameters = {}, callback?:PostmarkCallback<BounceCounts>) : Promise<BounceCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/bounces', filter, callback);
    };

    /**
     * Get SPAM complaint statistics for email sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getSpamComplaintsCounts(filter: QueryStringParameters = {}, callback?:PostmarkCallback<SpamCounts>) : Promise<SpamCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/spam', filter, callback);
    };

    /**
     * Get email tracking statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getTrackedEmailCounts(filter: QueryStringParameters = {}, callback?:PostmarkCallback<TrackedEmailCounts>) : Promise<TrackedEmailCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/tracked', filter, callback);
    };

    /**
     * Get Open statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getEmailOpenCounts(filter: QueryStringParameters = {}, callback?:PostmarkCallback<OpenCounts>) : Promise<OpenCounts> {
        return this.processRequestWithoutBody( HttpMethod.GET, '/stats/outbound/opens', filter, callback);
    };

    /**
     * Get Email Client Platform statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getEmailOpenPlatformUsage(filter: QueryStringParameters = {}, callback?:PostmarkCallback<EmailPlaformUsageCounts>) : Promise<EmailPlaformUsageCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/opens/platforms', filter, callback);
    };

    /**
     * Get statistics on which Email Clients were used to open messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getEmailOpenClientUsage(filter: QueryStringParameters = {} , callback?:PostmarkCallback<EmailClientUsageCounts>) : Promise<EmailClientUsageCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/opens/emailClients', filter, callback);
    };

    /**
     * Get Read Time statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getEmailOpenReadTimes(filter: QueryStringParameters = {}, callback?:PostmarkCallback<EmailReadTimesCounts>) : Promise<EmailReadTimesCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/opens/readTimes', filter, callback);
    };

    /**
     * Get total clicks statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getClickCounts(filter: QueryStringParameters = {}, callback?:PostmarkCallback<ClickCounts>) : Promise<ClickCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/clicks', filter, callback);
    };

    /**
     * Get browser family statistics for tracked links for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getClickBrowserUsage(filter: QueryStringParameters = {}, callback?:PostmarkCallback<BrowserUsageCounts>) : Promise<BrowserUsageCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/clicks/browserFamilies', filter, callback);
    };

    /**
     * Get browser platform statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getClickPlatformUsage(filter: QueryStringParameters = {}, callback?:PostmarkCallback<ClickPlaformUsageCounts>) : Promise<ClickPlaformUsageCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/clicks/platforms', filter, callback);
    };

    /**
     * Get click location (in HTML or Text body of the email) statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getClickLocation(filter: QueryStringParameters = {}, callback?:PostmarkCallback<ClickLocationCounts>) : Promise<ClickLocationCounts> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/stats/outbound/clicks/location', filter, callback);
    };
}
