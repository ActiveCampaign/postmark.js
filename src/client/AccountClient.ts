import {Promise} from "bluebird";
import BaseClient from './BaseClient';

import {
    HttpMethod,
    ClientOptions,
    DefaultHeaderNames,
    QueryStringParameters,
    PostmarkErrors,
    PostmarkCallback,
    DefaultResponse,
} from './models';

import {

    Server,
    ServerOptions,
    Servers,

    Domain,
    DomainOptions,
    Domains,
    DomainDetails,
} from './models'

export default class AccountClient extends BaseClient {

    /**
     * Create a new AccountClient
     * @param accountToken The account token that should be used with requests.
     * @param options Various options to customize client behavior.
     */
    constructor(accountToken: string, options?: ClientOptions) {
        super(accountToken, DefaultHeaderNames.ACCOUNT_TOKEN, options);
    }

    /**
     * Retrieve a single server by ID.
     *
     * @param id - The ID of the Server for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getServer(id: number, callback?: PostmarkCallback<Server>): Promise<Server> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/servers/${id}`, {}, callback);
    };

    /**
     * Create a new Server.
     *
     * @param options - The options to be used to create new Server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    createServer(options: ServerOptions, callback?: PostmarkCallback<Server>): Promise<Server> {
        return this.processRequestWithBody(HttpMethod.POST, '/servers', options, callback);
    };

    /**
     * Modify the Server associated with this Client.
     *
     * @param id - The ID of the Server you wish to update.
     * @param options - The options to be used to create new Server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    editServer(id: number, options: ServerOptions, callback?: PostmarkCallback<Server>): Promise<Server> {
        return this.processRequestWithBody(HttpMethod.PUT, `/servers/${id}`, options, callback);
    };

    /**
     * Modify the Server associated with this Client.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    deleteServer(id:number, callback?: PostmarkCallback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(HttpMethod.DELETE, `/servers/${id}`, {}, callback);
    };

    /**
     * Retrieve a list of Servers.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getServers(filter: QueryStringParameters = {}, callback?:PostmarkCallback<Servers>) : Promise<Servers> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/servers', filter, callback);
    };

    /**
     * Retrieve a batch of Domains.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getDomains(filter: QueryStringParameters = {}, callback?:PostmarkCallback<Domains>) : Promise<Domains> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/domains', filter, callback);
    };

    /**
     * Retrieve a single Domain by ID.
     *
     * @param id - The ID of the Domain for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getDomainDetails(id:number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/domains/${id}`, {}, callback);
    };

    /**
     * Create a new Domain.
     *
     * @param options - The options to be used to create new Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    createDomain(options: DomainOptions, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithBody(HttpMethod.POST, '/domains/', options, callback);
    };

    /**
     * Update a Domain.
     *
     * @param id - The ID of the Domain you wish to update.
     * @param domain - The values on the Domain you wish to update.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    editDomain(id: number, domain: DomainDetails, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithBody( HttpMethod.PUT, `/domains/${id}`, domain, callback);
    }

    /**
     * Delete a Domain.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param options - The options to be used in create Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    deleteDomain(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(HttpMethod.DELETE, `/domains/${id}`, {}, callback);
    };

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    verifyDomainDKIM(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(HttpMethod.PUT, `/domains/${id}/verifyDKIM`, {}, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    verifyDomainReturnPath(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody( HttpMethod.PUT, `/domains/${id}/verifyReturnPath`, {}, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    verifyDomainSPF(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(HttpMethod.PUT, `/domains/${id}/verifySPF`, {}, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    rotateDomainDKIM(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(HttpMethod.PUT, `/domains/${id}/rotateDKIM`, {}, callback);
    }
}