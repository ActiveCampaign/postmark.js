import { Promise } from 'bluebird'
import * as request from 'request-promise';

import { PostmarkError, HttpMethod } from './models';
import IClientOptions from './models/IClientOptions';
import { PostmarkCallback, coalesce } from './utils';

import { Stream } from 'stream';

/**
 * Provides a base client class from which both the AccountClient and ServerClient classes can be implemented.
 * 
 * This class is not intended to be instantiated directly.
 */
export default abstract class BaseClient {

    /**
     * These are the connection defaults that will be combined with any options that are provided during Client instantiation.
     * Any values provided to a Client constructor will override these defaults.
     * 
     * You may modify these values and new clients will use them.
     */
    public static ClientDefaults: IClientOptions = {
        /**
         * Should https be used for API requests?
         * @default true
         */
        useHttps: true,
        /**
         * The hostname that should be used for API requests.
         * @default api.postmarkapp.com
         */
        requestHost: 'api.postmarkapp.com',
        /**
         * The number of seconds to wait before a client should timeout during an API request.
         * @default 30
         */
        timeout: 30
    };

    protected clientOptions: IClientOptions;
    private authHeader: string;
    private token: string;

    protected constructor(token: string, authHeader: string, options?: IClientOptions) {
        this.verifyToken(token);

        this.token = token.trim();
        this.authHeader = authHeader;
        this.clientOptions = coalesce(options || {}, BaseClient.ClientDefaults);
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
        let url = `${scheme}://${this.clientOptions.requestHost}/${path}`;
        var req = request(url, {
            method: method.toString(),
            headers: { [this.authHeader]: this.token, 'Accept': 'application/json' },
            [payloadType]: payload,
            timeout: (this.clientOptions.timeout || 30) * 1000,
            json: true,
            gzip: true
        }).then(json => {
            return <T>json;
            }).catch(e => { 
                //TODO: remap this to a more useful error.
                let err = <Error>e;
                throw new PostmarkError(`Request failed: ${err.message}`);
            });

        if (callback) {
            req = req.then(json => {
                callback(null, json);
                return json;
            }).tapCatch(error => callback(error, null));
            req.suppressUnhandledRejections();
        }
        return req;
    }

    private verifyToken(token:string) {
        if (!token || token.trim() == '') {
            throw new PostmarkError('A valid API token must be provided when creating a client.');
        }
    }

}