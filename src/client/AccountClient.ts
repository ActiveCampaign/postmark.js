import BaseClient from './BaseClient';
import {
    Domain,
    Domains,
    DomainDetails,

    HttpMethod,
    IClientOptions,
    IFakeFilteringOptions
} from './models'
import {DefaultHeaderNames} from "./models/SupportingTypes";
import {PostmarkCallback} from "./utils";
import {Promise} from "bluebird";


export default class AccountClient extends BaseClient {

    /**
     * Create a new AccountClient
     * @param accountToken The account token that should be used with requests.
     * @param options Various options to customize client behavior.
     */
    constructor(accountToken: string, options?: IClientOptions) {
        super(accountToken, DefaultHeaderNames.ACCOUNT_TOKEN, options);
    }

    /**
     * Retrieve a batch of Domains.
     * @param filter An optional filter for which data is retrieved.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getDomains(filter: IFakeFilteringOptions = {}, callback?:PostmarkCallback<Domains>) : Promise<Domains> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody('/domains', HttpMethod.GET, filter, callback);
    };

    /**
     * Retrieve a single Domain by ID.
     * @param id The ID of the Domain for which you wish to retrieve details.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getDomainDetails(id:number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(`/domains/${id}`, HttpMethod.GET, callback);
    };

    /**
     * Create a new Domain.
     * @param options Configuration options to be used in create Domain.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    createDomain(options: Domain, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithBody('/domains/', HttpMethod.POST, options, callback);
    };

    /**
     * Update a Domain.
     * @param id The id of the Domain you wish to update.
     * @param domain The values on the Domain you wish to update.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    editDomain(id: number, domain: DomainDetails, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithBody(`/domains/${id}`, HttpMethod.PUT, domain, callback);
    }

    /**
     * Delete a Domain.
     * @param options Configuration options to be used in create Domain.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    deleteDomain(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(`/domains/${id}`, HttpMethod.DELETE, callback);
    };

    /**
     * Trigger Domain DKIM key verification.
     * @param id The id of the Domain you wish to trigger DKIM verification for.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    verifyDomainDKIM(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(`/domains/${id}/verifyDKIM`, HttpMethod.PUT, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     * @param id The id of the Domain you wish to trigger DKIM verification for.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    verifyDomainReturnPath(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(`/domains/${id}/verifyReturnPath`, HttpMethod.PUT, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     * @param id The id of the Domain you wish to trigger DKIM verification for.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    verifyDomainSPF(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(`/domains/${id}/verifySPF`, HttpMethod.PUT, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     * @param id The id of the Domain you wish to trigger DKIM verification for.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    rotateDomainDKIM(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(`/domains/${id}/rotateDKIM`, HttpMethod.PUT, callback);
    }
}