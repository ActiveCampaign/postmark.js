import {Promise} from "bluebird";
import BaseClient from './BaseClient';

import {
    HttpMethod,
    ClientOptions,
    DefaultHeaderNames,
    QueryStringParameters,
    PostmarkErrors,
    PostmarkCallback,
} from './models';

import {
    Domain,
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
}