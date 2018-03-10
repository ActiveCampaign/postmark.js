import Promise from 'ts-promise';
import { PostmarkMessage, PostmarkResponse }  from './models/';

enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD'
}

export default class Client {

    private options: any;

    private processRequestWithBody<P, T>( url: string, method: HttpMethod, payload: P): Promise<T> {
        return Promise.reject<T>(new Error("Not implemented."));
    }
    private processRequestWithoutBody<T>( url: string, method:HttpMethod): Promise<T> {
        return Promise.reject<T>(new Error("Not implemented."));
    }

    /**
     * Creates a client that can be used with any Postmark Server.
     */
    constructor(serverKey: string, options: any = {}) {
        if (!serverKey) {
            throw new Error("You must provide your postmark API key");
        }
        options.apiKey = serverKey;
        options.authorizationHeader = "X-Postmark-Server-Token";
        //this.processRequestWithBody = this.options.requestFactory(this.options);
    }

    /** Send a single email message. */
    sendEmail(message:PostmarkMessage):Promise<PostmarkResponse> {
        return this.processRequestWithBody('/email', HttpMethod.POST, message);
    }
}