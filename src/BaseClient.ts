import { PostmarkError, HttpMethod } from './models';
import IClientOptions from './models/IClientOptions';
import Promise from 'ts-promise';

export default abstract class BaseClient {

    public static ClientDefaults: IClientOptions = {
        useHttps: true,
        requestHost: 'api.postmarkapp.com'
    };

    protected client_options: IClientOptions;

    constructor(token: string, authHeader: string, options?: IClientOptions) {
        if (!token || token.trim() == '') {
            throw new PostmarkError('A valid API token must be provided when creating a client.');
        }
        this.client_options = options || BaseClient.ClientDefaults;
    }

    protected processRequestWithBody<T>(path: string, method: HttpMethod, payload: any): Promise<T> {
        return Promise.reject<T>(new PostmarkError("Not implemented."));
    }

    protected processRequestWithoutBody<T>(path: string, method:HttpMethod, queryParameters?: object): Promise<T> {
        return Promise.reject<T>(new PostmarkError("Not implemented."));
    }
}