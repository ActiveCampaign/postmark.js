import { ErrorHandler } from "./errors/ErrorHandler";
import {Callback, ClientOptions, FilteringParameters, HttpClient} from "./models";
import {AxiosHttpClient} from "./HttpClient"
import {Errors} from "../index";

const packageJson = require("../../package.json");
const CLIENT_VERSION = packageJson.version;

/**
 * Base client class from which client classes can be implemented, in our case, AccountClient and ServerClient classes.
 * This class is NOT intended to be instantiated directly.
 */
export default abstract class BaseClient {
    public clientVersion: string;
    public httpClient: HttpClient;
    protected errorHandler: ErrorHandler;
    private readonly authHeader: string;
    private readonly token: string;

    protected constructor(token: string, authHeader: string, configOptions?: ClientOptions.Configuration) {
        this.errorHandler = new ErrorHandler();
        this.verifyToken(token);
        this.token = token.trim();
        this.authHeader = authHeader;
        this.clientVersion = CLIENT_VERSION;
        this.httpClient = new AxiosHttpClient(configOptions);
    }

    public setClientOptions(configOptions: ClientOptions.Configuration): void {
        this.httpClient.initHttpClient(configOptions)
    }

    public getClientOptions(): ClientOptions.Configuration {
      return this.httpClient.clientOptions;
    }

    /**
     * Process http request with sending body - data.
     *
     * @see processRequest for more details.
     */
    protected processRequestWithBody<T>(method: ClientOptions.HttpMethod, path: string, body: (null | object),
                                        callback?: Callback<T>): Promise<T> {
        return this.processRequest(method, path, {}, body, callback);
    }

    /**
     * Process http request without sending body - data.
     *
     * @see processRequest for more details.
     */
    protected processRequestWithoutBody<T>(method: ClientOptions.HttpMethod, path: string, queryParameters: object = {},
                                           callback?: Callback<T>): Promise<T> {
        return this.processRequest(method, path, queryParameters, null, callback);
    }

    /**
     * Process request for Postmark ClientOptions.
     *
     * @param method - see processHttpRequest for details
     * @param path - see processHttpRequest for details
     * @param queryParameters - see processHttpRequest for details
     * @param body - see processHttpRequest for details
     * @param callback - callback function to be executed.
     *
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    private processRequest<T>(method: ClientOptions.HttpMethod, path: string, queryParameters: object,
                              body: (null | object), callback?: Callback<T>): Promise<T> {

        const httpRequest: Promise<T> = this.processHttpRequest(method, path, queryParameters, body);
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
    private processHttpRequest<T>(method: ClientOptions.HttpMethod, path: string, queryParameters: object, body: (null | object)): Promise<T> {
        return this.httpClient.httpRequest<T>(method, path, queryParameters, body, this.getComposedHttpRequestHeaders())
            .then((response: any) => response)
            .catch((error: Errors.PostmarkError) => { return Promise.reject(error); });
    }

    /**
     * Process callback function for HTTP request.
     *
     * @param httpRequest - HTTP request for which callback will be executed
     * @param callback - callback function to be executed.
     */
    private processCallbackRequest<T>(httpRequest: Promise<T>, callback?: Callback<T>): void {
        if (callback) {
            httpRequest
                .then((response) => callback(null, response))
                .catch((error) => callback(error, null));
        }
    }

    /**
     * JSON object with default headers sent by HTTP request.
     */
    private getComposedHttpRequestHeaders(): any {
        return {
            [this.authHeader]: this.token,
            "Accept": "application/json",
            "User-Agent": `Postmark.JS - ${this.clientVersion}`,
        };
    }

    /**
     * Token can't be empty.
     *
     * @param {string} token - HTTP request token
     */
    private verifyToken(token: string): void {
        if (!token || token.trim() === "") {
            throw this.errorHandler.buildError("A valid API token must be provided.");
        }
    }

    /**
     * Set default values for count and offset when doing filtering with API requests if they are not specified by filter.
     */
    protected setDefaultPaginationValues(filter: FilteringParameters): void {
        filter.count = filter.count || 100;
        filter.offset = filter.offset || 0;
    }
}
