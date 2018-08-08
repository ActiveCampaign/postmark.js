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
    Bounce,
    Bounces,
    BounceDump,
    BounceActivateResponse,
    DeliveryStats,


    TemplatedPostmarkMessage,

    Server,
    OutboundMessageDetailsExtended,
    ValidateTemplateContentResponse,
    ValidateTemplateContentRequest,
    CreateTagTriggerRequest,
    CreateTagTriggerResponse,
    EditTagTriggerRequest,
    TagTrigger,
    TagTriggerListingRequest,
    TagTriggerListingResponse,
    CreateInboundRuleTriggerRequest,
    CreateInboundRuleTriggerResponse,

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

    /**
     * Retrieve bounce statistic information for the associated Server.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getDeliveryStatistics(callback?: PostmarkCallback<DeliveryStats>): Promise<DeliveryStats> {
        return this.processRequestWithoutBody(HttpMethod.GET, '/deliverystats', {}, callback);
    };

    /**
     * Retrieve a batch of bounces. The default batch size is 100, and the offset is 0.
     * @param filter An optional filter for which bounces to retrieve.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getBounces(filter: QueryStringParameters = {}, callback?:PostmarkCallback<Bounces>) : Promise<Bounces> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/bounces', filter, callback);
    };
}
