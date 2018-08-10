import {Promise} from 'bluebird';
import BaseClient from './BaseClient';

import {
    ClientOptions,
    HttpMethod,
    DefaultHeaderNames,
    PostmarkCallback,
    QueryStringParameters
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


    CreateTagTriggerRequest,
    CreateTagTriggerResponse,
    EditTagTriggerRequest,
    TagTrigger,
    TagTriggerListingRequest,
    TagTriggerListingResponse,
    CreateInboundRuleTriggerRequest,
    CreateInboundRuleTriggerResponse,

    ValidateTemplateContentResponse,
    ValidateTemplateContentRequest,
    TemplatedPostmarkMessage,
    TemplateListingResponse,
    TemplateListingRequest,
    Template,
    DeleteTemplateResponse,
    CreateTemplateResponse,
    EditTemplateRequest,
    EditTemplateResponse,
    CreateTemplateRequest
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
     * @param id - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getOutboundMessageDetails(id: string,
                              callback?: PostmarkCallback<OutboundMessageDetails>): Promise<OutboundMessageDetails> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/messages/outbound/${id}`, {}, callback);
    };

    /**
     * Get details for a specific Outbound Message.
     *
     * @param id - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getOutboundMessageDump(id: string,
                              callback?: PostmarkCallback<OutboundMessageDump>): Promise<OutboundMessageDump> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/messages/outbound/${id}/dump`, {}, callback);
    };
}
