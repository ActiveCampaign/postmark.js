import { PostmarkError, HttpMethod } from './models';
import IClientOptions from './models/IClientOptions';
import { Promise } from 'bluebird'
import { PostmarkCallback } from './utils';
import * as request from 'request-promise';
import { Stream } from 'stream';

export default abstract class BaseClient {

    public static ClientDefaults: IClientOptions = {
        useHttps: true,
        requestHost: 'api.postmarkapp.com',
        timeout: 30
    };

    protected clientOptions: IClientOptions;
    private authHeader: string;
    private token: string;

    constructor(token: string, authHeader: string, options?: IClientOptions) {
        if (!token || token.trim() == '') {
            throw new PostmarkError('A valid API token must be provided when creating a client.');
        }
        this.token = token.trim();
        this.authHeader = authHeader;
        this.clientOptions = options || BaseClient.ClientDefaults;
    }

    protected processRequestWithBody<T>(path: string, method: HttpMethod,
        payload: (null | object), callback?: PostmarkCallback<T>): Promise<T> {
        return this.processRequest(path, method, payload,true,callback);
    }

    protected processRequestWithoutBody<T>(path: string, method: HttpMethod, queryParameters?: (null | object),
        callback?: PostmarkCallback<T>): Promise<T> {
        return this.processRequest(path, method, queryParameters || {}, false, callback);
    }
    
    private processRequest<T>(path: string, method: HttpMethod, payload: (null | object),
        hasBody: boolean, callback?: PostmarkCallback<T>): Promise<T> {
        
        let payloadType = hasBody ? 'body' : 'qs';

        let scheme = this.clientOptions.useHttps ? 'https' : 'http';
        var req = request(`${scheme}://${this.clientOptions.requestHost}/${path}`, {
            method: method.toString(),
            headers: new Headers({ [this.authHeader]: this.token, 'Accept': 'application/json' }),
            [payloadType]: payload,
            timeout: this.clientOptions.timeout,
            json: true
        }).then(json => {
            return <T>json;
            }).catch(e => { 
                let err = <Error>e;
                throw new PostmarkError(`Request failed: ${err.message}`);
            });

        if (callback) {
            req = req.then(json => {
                callback(json);
                return json;
            }).tapCatch(e => callback(undefined, e));
            req.suppressUnhandledRejections();
        }
        return req;
    }

}