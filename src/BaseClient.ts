import Promise from 'ts-promise';
import { PostmarkError, HttpMethod } from './models';

export interface IClientOptions {
    
}

export default class BaseClient {
    protected client_options: IClientOptions;

    constructor(token: string, authHeader: string, options: IClientOptions) {
        if (!token || token.trim() == '') {
            throw new PostmarkError('An value API token must be provided when creating a client.');
        }
        this.client_options = options;
    }

    protected processRequestWithBody<P, T>( url: string, method: HttpMethod, payload: P): Promise<T> {
        return Promise.reject<T>(new Error("Not implemented."));
    }
    protected processRequestWithoutBody<T>( url: string, method:HttpMethod): Promise<T> {
        return Promise.reject<T>(new Error("Not implemented."));
    }

}