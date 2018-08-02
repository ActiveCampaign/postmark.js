import BaseClient from './BaseClient';
import { IClientOptions } from './models'
import {DefaultHeaderNames} from "./models/SupportingTypes";

export default class AccountClient extends BaseClient {

    /**
     * Create a new AccountClient
     * @param accountToken The account token that should be used with requests.
     * @param options Various options to customize client behavior.
     */
    constructor(accountToken: string, options?: IClientOptions) {
        super(accountToken, DefaultHeaderNames.ACCOUNT_TOKEN, options);
    }
}