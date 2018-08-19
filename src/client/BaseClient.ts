import {Promise} from 'bluebird'
import Bluebird = require("bluebird");
import * as request from 'request-promise';

import {ClientOptions, HttpMethod, PostmarkErrors, PostmarkCallback} from './models';
import {ClientError} from "./ClientError";

const packageJson = require("../../package.json")
const CLIENT_VERSION = packageJson.version;

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

    public clientOptions: ClientOptions;
    public clientVersion: string;
    protected clientError: ClientError;
    private authHeader: string;
    private token: string;

    protected constructor(token: string, authHeader: string, options?: ClientOptions) {
        this.verifyToken(token);

        this.clientVersion = CLIENT_VERSION;
        this.token = token.trim();
        this.authHeader = authHeader;
        this.clientOptions = {...BaseClient.DefaultOptions, ...options};
        this.clientError = new ClientError();
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
    protected processRequestWithoutBody<T>(method: HttpMethod, path: string, queryParameters: object,
                                           callback?: PostmarkCallback<T>): Promise<T> {
        return this.processRequest(method, path, queryParameters, null, callback);
    }

    /**
     * Process request for Postmark client.
     *
     * @param method - see processHttpRequest for details
     * @param path - see processHttpRequest for details
     * @param queryParameters - see processHttpRequest for details
     * @param body - see processHttpRequest for details
     * @param callback - callback function to be executed.
     *
     * @returns A promise that will complete when the API responds (or an error occurs).
     **/
    private processRequest<T>(method: HttpMethod, path: string, queryParameters: object,
                              body: (null | object), callback?: PostmarkCallback<T>): Promise<T> {

        let httpRequest: Bluebird<T> = this.processHttpRequest(method, path, queryParameters, body);
        this.processCallbackRequest(httpRequest, callback);
        return httpRequest;
    }

    /**
     * Process HTTP request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     *
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    private processHttpRequest<T>(method: HttpMethod, path: string, queryParameters: object, body: (null | object)): Bluebird<T> {
        return this.httpRequest(method, path, queryParameters, body)
            .then(response => {
                return <T>response;
            })
            .catch(error => {
                throw this.clientError.generate(error);
            });
    }

    /**
     * Process callback function for HTTP request.
     *
     * @param httpRequest - HTTP request for which callback will be executed
     * @param callback - callback function to be executed.
     */
    private processCallbackRequest<T>(httpRequest: Bluebird<T>, callback?: PostmarkCallback<T>): void {
        if (callback) {
            httpRequest
                .then(response => {
                    callback(null, response);
                })
                .tapCatch(error => callback(error, null))
                .suppressUnhandledRejections();
        }
    }

    /**
     * Process http request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     *
     * @returns A promise that will complete when the API responds.
     */
    private httpRequest(method: HttpMethod, path: string, queryParameters: ({} | object), body: (null | object)): request.RequestPromise {
        return request(this.getHttpRequestURL(path), {
            method: method.toString(),
            headers: this.getComposedHttpRequestHeaders(),
            qs: queryParameters,
            body: body,
            timeout: this.getRequestTimeoutInSeconds(),
            json: true,
            gzip: true
        });
    }

    private getRequestTimeoutInSeconds():number {
        return (this.clientOptions.timeout || 30) * 1000
    }

    private getHttpRequestURL(path: string):string {
        const scheme = this.clientOptions.useHttps ? 'https' : 'http';
        return `${scheme}://${this.clientOptions.requestHost}/${path}`;
    }

    /**
     * JSON object with all headers sent by HTTP request.
     **/
    private getComposedHttpRequestHeaders(): object {
        return {
            [this.authHeader]: this.token,
            'Accept': 'application/json',
            'User-Agent': `Postmark.JS - ${this.clientVersion}`
        }
    }

    private verifyToken(token: string): void {
        if (!token || token.trim() == '') {
            throw new PostmarkErrors.PostmarkError('A valid API token must be provided when creating a client.');
        }
    }
}