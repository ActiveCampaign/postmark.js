import {Promise} from 'bluebird'
import * as request from 'request-promise';

import {
    HttpMethod,
    ClientOptions,
    PostmarkErrors,
    PostmarkCallback,
} from './models';

/**
 * Base client class from which both the AccountClient and ServerClient classes can be implemented.
 *
 * This class is NOT intended to be instantiated directly.
 */
export default abstract class BaseClient {

    /**
     * Connection defaults that will be combined with any options that are provided during Client instantiation.
     * Any values provided to a Client constructor will override these defaults.
     *
     * You may modify these values and new clients will use them.
     */
    public static DefaultOptions: ClientOptions = {
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

    protected clientOptions: ClientOptions;
    private authHeader: string;
    private token: string;

    protected constructor(token: string, authHeader: string, options?: ClientOptions) {
        this.verifyToken(token);

        this.token = token.trim();
        this.authHeader = authHeader;
        this.clientOptions = {...BaseClient.DefaultOptions, ...options};
    }

    /**
     * Process http request with sending body - data.
     *
     * @see processRequest for more details.
     **/
    protected processRequestWithBody<T>(method: HttpMethod, path: string, body: (null | object),
                                        callback?: PostmarkCallback<T>): Promise<T> {
        return this.processRequest(method, path, {}, body, callback);
    }

    /**
     * Process http request without sending body - data.
     *
     * @see processRequest for more details.
     **/
    protected processRequestWithoutBody<T>(method: HttpMethod, path: string, queryParameters: ({} | object),
                                           callback?: PostmarkCallback<T>): Promise<T> {
        return this.processRequest(method, path, queryParameters, null, callback);
    }

    /**
     * Process http request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     *
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    private processRequest<T>(method: HttpMethod, path: string, queryParameters: ({} | object),
                              body: (null | object), callback?: PostmarkCallback<T>): Promise<T> {

        const scheme = this.clientOptions.useHttps ? 'https' : 'http';
        let url = `${scheme}://${this.clientOptions.requestHost}/${path}`;

        let req = request(url, {
            method: method.toString(),
            headers: {
                [this.authHeader]: this.token,
                'Accept': 'application/json',
                'User-Agent': 'Postmark.JS'
            },
            qs: queryParameters,
            body: body,
            timeout: (this.clientOptions.timeout || 30) * 1000,
            json: true,
            gzip: true
        }).then(json => {
            return <T>json;
        }).catch(error => {
            throw this.buildError(error.statusCode, error.message);
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

    private verifyToken(token: string):void {
        if (!token || token.trim() == '') {
            throw new PostmarkErrors.InvalidAPIKeyError('A valid API token must be provided when creating a client.');
        }
    }

    private buildError(statusCode: number, errorMessage: string): PostmarkErrors.StandardError {

        switch (statusCode) {
            case 401:
                return new PostmarkErrors.InvalidAPIKeyError(errorMessage);
                break;

            case 422:
                return new PostmarkErrors.InvalidMessageError(errorMessage);
                break;

            case 500:
                return new PostmarkErrors.InternalServerError(errorMessage);
                break;

            default:
                return new PostmarkErrors.UnknownError(errorMessage);
                break;
        }
    }
}