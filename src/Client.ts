import Promise from 'ts-promise';
import { HttpMethod, PostmarkMessage, PostmarkResponse }  from './models/';
import BaseClient from './BaseClient';
import { IClientOptions } from './BaseClient'

export default class Client extends BaseClient {
    /**
     * Creates a client that can be used with any Postmark Server.
     */
    constructor(serverKey: string, options: IClientOptions = {}) {
        super(serverKey, 'X-Postmark-Server-Token', options);
    }

    /** Send a single email message. */
    sendEmail(message:PostmarkMessage):Promise<PostmarkResponse> {
        return this.processRequestWithBody('/email', HttpMethod.POST, message);
    }
}