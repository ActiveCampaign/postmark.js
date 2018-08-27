import BaseClient from './BaseClient';

import {
    ClientOptions,
    Callback,
    DefaultResponse,
    FilteringParameters,
} from './models/index';

import {
    Message,
    MessageSendingResponse,

    Bounce,
    Bounces,
    BounceDump,
    BounceActivationResponse,
    DeliveryStatistics,
    BounceFilteringParameters,

    TemplateOptions,
    Template,
    Templates,
    TemplateValidationOptions,
    TemplateValidation,
    TemplateMessage,

    Server,
    ServerOptions,

    OutboundMessage,
    OutboundMessageDetails,
    OutboundMessages,
    OutboundMessageDump,
    OutboundMessagesFilteringParameters,
    OutboundMessageOpens,
    OutboundMessageOpensFilteringParameters,
    OutboundMessageClicks,
    OutboundMessageClicksFilteringParameters,

    InboundMessage,
    InboundMessages,
    InboundMessageDetails,
    InboundMessageStatus,
    InboundMessagesFilteringParameters,

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
    StatisticsFilteringParameters,

    TagTriggerOptions,
    TagTrigger,
    TagTriggers,
    TagTriggerFilteringParameters,

    InboundRuleOptions,
    InboundRule,
    InboundRules,
} from './models/index';

/**
 * Server client class that can be used to interact with an individual Postmark Server.
 */
export default class ServerClient extends BaseClient {

    /**
     * Create a client.
     *
     * @param serverToken - The token for the server that you wish to interact with.
     * @param configOptions - Options to customize the behavior of the this client.
     */
    constructor(serverToken: string, configOptions?: ClientOptions.Configuration) {
        super(serverToken, ClientOptions.DefaultHeaderNames.SERVER_TOKEN, configOptions);
    }

    /** Send a single email message.
     *
     * @param email - Email message to send.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    sendEmail(email: Message, callback?: Callback<MessageSendingResponse>): Promise<MessageSendingResponse> {
        return this.processRequestWithBody<MessageSendingResponse>(ClientOptions.HttpMethod.POST, '/email', email, callback);
    }

    /**
     * Send a batch of email messages.
     *
     * @param emails - An array of messages to send.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    sendEmailBatch(emails: Message[], callback?: Callback<MessageSendingResponse[]>): Promise<MessageSendingResponse[]> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, '/email/batch', emails, callback);
    };

    /**
     * Send a message using a template.
     *
     * @param template - Message you wish to send.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    sendEmailWithTemplate(template: TemplateMessage, callback?:Callback<MessageSendingResponse>): Promise<MessageSendingResponse> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, '/email/withTemplate', template, callback);
    };

    /**
     * Send a batch of template email messages.
     *
     * @param templates - An array of templated messages you wish to send using this Client.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    sendEmailBatchWithTemplates(templates: TemplateMessage[], callback?:Callback<MessageSendingResponse[]>): Promise<MessageSendingResponse[]> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, '/email/batchWithTemplates', { Messages: templates }, callback);
    };

    /**
     * Get bounce statistic information for the associated Server.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getDeliveryStatistics(callback?: Callback<DeliveryStatistics>): Promise<DeliveryStatistics> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/deliveryStats', {}, callback);
    };

    /**
     * Get a batch of bounces. The default batch size is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounces(filter?: BounceFilteringParameters, callback?: Callback<Bounces>): Promise<Bounces> {
        filter = {...{count: 100, offset: 0}, ...filter};
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/bounces', filter, callback);
    };

    /**
     * Get details for a specific Bounce.
     *
     * @param id - The ID of the Bounce you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounce(id: number, callback?: Callback<Bounce>): Promise<Bounce> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/bounces/${id}`, {}, callback);
    };

    /**
     * Get a Bounce Dump for a specific Bounce.
     *
     * @param id - The ID of the Bounce for which you wish to retrieve Bounce Dump.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounceDump(id: number, callback?: Callback<BounceDump>): Promise<BounceDump> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/bounces/${id}/dump`, {}, callback);
    };

    /**
     * Activate email address that was deactivated due to a Bounce.
     *
     * @param id - The ID of the Bounce for which you wish to activate the associated email.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    activateBounce(id: number, callback?: Callback<BounceActivationResponse>): Promise<BounceActivationResponse> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, `/bounces/${id}/activate`, {}, callback);
    };

    /**
     * Get an array of tags associated with bounces.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounceTags(callback?: Callback<string[]>): Promise<string[]> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/bounces/tags', {}, callback);
    };

    /**
     * Get the list of templates associated with this server.
     *
     * @param filter - Optional filtering options.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getTemplates(filter?: FilteringParameters, callback?:Callback<Templates>) : Promise<Templates> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/templates', filter, callback);
    };

    /**
     * Get the a specific template associated with this server.
     *
     * @param idOrAlias - ID or alias for the template you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getTemplate(idOrAlias: (number | string), callback?:Callback<Template>) : Promise<Template> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/templates/${idOrAlias}`, {}, callback);
    };

    /**
     * Delete a template associated with this server.
     *
     * @param idOrAlias - ID or template alias you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    deleteTemplate(idOrAlias: (number | string), callback?:Callback<DefaultResponse>) : Promise<DefaultResponse> {
        return this.processRequestWithoutBody( ClientOptions.HttpMethod.DELETE, `/templates/${idOrAlias}`, {}, callback);
    }

    /**
     * Create a new template on the associated server.
     *
     * @param options - Configuration options to be used to create the Template.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    createTemplate(options: TemplateOptions, callback?:Callback<Template>) : Promise<Template> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, '/templates/', options, callback);
    }

    /**
     * Update a template on the associated server.
     *
     * @param idOrAlias - Id or alias of the template you wish to update.
     * @param options - Template options you wish to update.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    editTemplate(idOrAlias: (number | string), options: TemplateOptions, callback?:Callback<Template>) : Promise<Template> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, `/templates/${idOrAlias}`, options, callback);
    }

    /**
     * Validate template markup to verify that it will be parsed. Also provides a recommended template
     * model to be used when sending using the specified template content.
     *
     * @param options - The template content you wish to validate.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    validateTemplate(options: TemplateValidationOptions, callback?: Callback<TemplateValidation>):
        Promise<TemplateValidation> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, '/templates/validate', options, callback);
    }

    /**
     * Get the information for the Server associated with this Client.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getServer(callback?: Callback<Server>): Promise<Server> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/server', {}, callback);
    };

    /**
     * Modify the Server associated with this Client.
     *
     * @param options - The options you wish to modify.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    editServer(options: ServerOptions, callback?: Callback<Server>): Promise<Server> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, '/server', options, callback);
    };

    /**
     * Get a batch of Outbound Messages. The default batch size is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getOutboundMessages(filter?: OutboundMessagesFilteringParameters,
                        callback?: Callback<OutboundMessages>): Promise<OutboundMessages> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/messages/outbound', filter, callback);
    };

    /**
     * Get details for a specific Outbound Message.
     *
     * @param messageId - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getOutboundMessageDetails(messageId: string,
                              callback?: Callback<OutboundMessageDetails>): Promise<OutboundMessageDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/messages/outbound/${messageId}`, {}, callback);
    };

    /**
     * Get details for a specific Outbound Message.
     *
     * @param messageId - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getOutboundMessageDump(messageId: string,
                              callback?: Callback<OutboundMessageDump>): Promise<OutboundMessageDump> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/messages/outbound/${messageId}/dump`, {}, callback);
    };

    /**
     * Get a batch of Inbound Messages. The default batch size is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getInboundMessages(filter?: InboundMessagesFilteringParameters, callback?:Callback<InboundMessages>) : Promise<InboundMessages> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/messages/inbound', filter, callback);
    };

    /**
     * Get details for a specific Inbound Message.
     *
     * @param messageId - The ID of the Inbound Message you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getInboundMessageDetails(messageId: string, callback?:Callback<InboundMessageDetails>) : Promise<InboundMessageDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/messages/inbound/${messageId}/details`, {}, callback);
    };

    /**
     * Cause an Inbound Message to bypass filtering rules defined on this Client's associated Server.
     *
     * @param messageId - The ID of the Inbound Message for which you wish to bypass the filtering rules.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    bypassBlockedInboundMessage(messageId: string, callback?:Callback<DefaultResponse>) : Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.PUT, `/messages/inbound/${messageId}/bypass`, {}, callback);
    };

    /**
     * Request that Postmark retry POSTing to the Inbound Hook for the specified message.
     *
     * @param messageId - The ID of the Inbound Message for which you wish to retry the inbound hook.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    retryInboundHookForMessage(messageId: string, callback?:Callback<DefaultResponse>) : Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.PUT, `/messages/inbound/${messageId}/retry`, {}, callback);
    };

    /**
     * Get the Opens for Outbound Messages. The default batch size is 100, and offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getMessageOpens(filter?: OutboundMessageOpensFilteringParameters, callback?:Callback<OutboundMessageOpens>) : Promise<OutboundMessageOpens> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/messages/outbound/opens', filter, callback);
    };

    /**
     * Get details of Opens for specific Outbound Message.
     *
     * @param messageId - Message ID of the message for which you wish to retrieve Opens.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getMessageOpensForSingleMessage(messageId: string, filter?: OutboundMessageOpensFilteringParameters,
                          callback?:Callback<OutboundMessageOpens>) : Promise<OutboundMessageOpens> {
        filter = {...{count: 50, offset: 0},...filter};
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/messages/outbound/opens/${messageId}`, filter, callback);
    };

    /**
     * Get the Clicks for Outbound Messages. The default batch size is 100, and offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getMessageClicks(filter?: OutboundMessageClicksFilteringParameters, callback?:Callback<OutboundMessageClicks>) : Promise<OutboundMessageClicks> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/messages/outbound/clicks', filter, callback);
    };

    /**
     * Get Click information for a single Outbound Message. The default batch size is 100, and offset is 0.
     *
     * @param messageId - The MessageID for which clicks should be retrieved.
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getMessageClicksForSingleMessage(messageId: string, filter?: OutboundMessageClicksFilteringParameters,
                                     callback?:Callback<OutboundMessageClicks>) : Promise<OutboundMessageClicks> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/messages/outbound/clicks/${messageId}`, filter, callback);
    };

    /**
     * Get overview statistics on Outbound Messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getOutboundOverview(filter?: StatisticsFilteringParameters, callback?: Callback<OutboundStatistics>):
        Promise<OutboundStatistics> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound', filter, callback);
    };

    /**
     * Get statistics on email sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getSentCounts(filter?: StatisticsFilteringParameters, callback?:Callback<SentCounts>) : Promise<SentCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/sends', filter, callback);
    };

    /**
     * Get statistiscs on emails that bounced after being sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounceCounts(filter?: StatisticsFilteringParameters, callback?:Callback<BounceCounts>) : Promise<BounceCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/bounces', filter, callback);
    };

    /**
     * Get SPAM complaint statistics for email sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getSpamComplaintsCounts(filter?: StatisticsFilteringParameters, callback?:Callback<SpamCounts>) : Promise<SpamCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/spam', filter, callback);
    };

    /**
     * Get email tracking statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getTrackedEmailCounts(filter?: StatisticsFilteringParameters, callback?:Callback<TrackedEmailCounts>) : Promise<TrackedEmailCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/tracked', filter, callback);
    };

    /**
     * Get Open statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getEmailOpenCounts(filter?: StatisticsFilteringParameters, callback?:Callback<OpenCounts>) : Promise<OpenCounts> {
        return this.processRequestWithoutBody( ClientOptions.HttpMethod.GET, '/stats/outbound/opens', filter, callback);
    };

    /**
     * Get Email Client Platform statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getEmailOpenPlatformUsage(filter?: StatisticsFilteringParameters, callback?:Callback<EmailPlaformUsageCounts>) : Promise<EmailPlaformUsageCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/opens/platforms', filter, callback);
    };

    /**
     * Get statistics on which Email Clients were used to open messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getEmailOpenClientUsage(filter?: StatisticsFilteringParameters, callback?:Callback<EmailClientUsageCounts>) : Promise<EmailClientUsageCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/opens/emailClients', filter, callback);
    };

    /**
     * Get Read Time statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getEmailOpenReadTimes(filter?: StatisticsFilteringParameters, callback?:Callback<EmailReadTimesCounts>) : Promise<EmailReadTimesCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/opens/readTimes', filter, callback);
    };

    /**
     * Get total clicks statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getClickCounts(filter?: StatisticsFilteringParameters, callback?:Callback<ClickCounts>) : Promise<ClickCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/clicks', filter, callback);
    };

    /**
     * Get browser family statistics for tracked links for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getClickBrowserUsage(filter?: StatisticsFilteringParameters, callback?:Callback<BrowserUsageCounts>) : Promise<BrowserUsageCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/clicks/browserFamilies', filter, callback);
    };

    /**
     * Get browser platform statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getClickPlatformUsage(filter?: StatisticsFilteringParameters, callback?:Callback<ClickPlaformUsageCounts>) : Promise<ClickPlaformUsageCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/clicks/platforms', filter, callback);
    };

    /**
     * Get click location (in HTML or Text body of the email) statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getClickLocation(filter?: StatisticsFilteringParameters, callback?:Callback<ClickLocationCounts>) : Promise<ClickLocationCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/stats/outbound/clicks/location', filter, callback);
    };

    /**
     * Create a new Tag Trigger.
     *
     * @param options - Configuration options to be used to create the trigger.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    createTagTrigger(options: TagTriggerOptions, callback?:Callback<TagTrigger>) : Promise<TagTrigger> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, '/triggers/tags', options, callback);
    };

    /**
     * Modify an existing Tag Trigger.
     *
     * @param id - The ID of the Tag Trigger you wish to modify.
     * @param options - Tag trigger options
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    editTagTrigger(id: number, options: TagTriggerOptions, callback?:Callback<TagTrigger>) : Promise<TagTrigger> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, `/triggers/tags/${id}`, options, callback);
    };

    /**
     * Delete an existing Tag Trigger.
     *
     * @param id - The ID of the Tag Trigger you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    deleteTagTrigger(id: number, callback?:Callback<DefaultResponse>) : Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.DELETE, `/triggers/tags/${id}`, {}, callback);
    };

    /**
     * Get a specific Tag Trigger.
     *
     * @param id - The ID of the Tag Trigger you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getTagTrigger(id: number, callback?:Callback<TagTrigger>) : Promise<TagTrigger> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/triggers/tags/${id}`, {}, callback);
    };

    /**
     * Get a list of Tag Trigger. The default batch count is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getTagTriggers(filter?: TagTriggerFilteringParameters, callback?:Callback<TagTriggers>) : Promise<TagTriggers> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, '/triggers/tags/', filter, callback);
    };

    /**
     * Create an Inbound Rule Trigger.
     *
     * @param options - Configuration options to be used when creating this Trigger.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    createInboundRuleTrigger(options: InboundRuleOptions, callback?:Callback<InboundRule>) : Promise<InboundRule> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, '/triggers/inboundRules', options, callback);
    };

    /**
     * Delete an Inbound Rule Trigger.
     *
     * @param id - The ID of the Inbound Rule Trigger you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    deleteInboundRuleTrigger(id: number, callback?:Callback<DefaultResponse>) : Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.DELETE, `/triggers/inboundRules/${id}`, {}, callback);
    };

    /**
     * Get a list of Inbound Rule Triggers. The default batch count is 100, and the offset is 0.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getInboundRuleTriggers(filter?: FilteringParameters, callback?:Callback<InboundRules>) : Promise<InboundRules> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody( ClientOptions.HttpMethod.GET, '/triggers/inboundRules', filter, callback);
    };
}
