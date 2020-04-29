import axios, {AxiosError, AxiosInstance} from "axios";

import { ErrorHandler } from "./ErrorHandler";
import {Callback, ClientOptions, FilteringParameters} from "./models";

const packageJson = require("../../package.json");
const CLIENT_VERSION = packageJson.version;

/**
 * Base client class from which client classes can be implemented, in our case, AccountClient and ServerClient classes.
 * This class is NOT intended to be instantiated directly.
 */
export default abstract class BaseClient {

    /**
     * Client connection configuration options.
     * You may modify these values and new clients will use them.
     * Any values provided to a Client constructor will override default options.
     */
    public static DefaultOptions: ClientOptions.Configuration = {
        useHttps: true,
        requestHost: "api.postmarkapp.com",
        timeout: 60,
    };

    public clientVersion: string;
    public readonly httpClient: AxiosInstance;
    protected errorHandler: ErrorHandler;
    private clientOptions: ClientOptions.Configuration;
    private readonly authHeader: string;
    private readonly token: string;

    protected constructor(token: string, authHeader: string, configOptions?: ClientOptions.Configuration) {
        this.clientVersion = CLIENT_VERSION;
        this.token = token.trim();
        this.authHeader = authHeader;
        this.clientOptions = { ...BaseClient.DefaultOptions, ...configOptions };
        this.httpClient = this.buildDefaultHttpClient();
        this.errorHandler = new ErrorHandler();
        this.verifyToken(token);
    }

    public setClientOptions(configOptions: ClientOptions.Configuration): void {
      this.clientOptions = configOptions;
      this.buildDefaultHttpClient();
    }

    public getClientOptions(): ClientOptions.Configuration {
      return this.clientOptions;
    }

    /**
     * JSON object with default headers sent by HTTP request.
     */
    public getComposedHttpRequestHeaders(): object {
        return {
            [this.authHeader]: this.token,
            "Accept": "application/json",
            "User-Agent": `Postmark.JS - ${this.clientVersion}`,
        };
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
     * Set default values for count and offset when doing filtering with API requests if they are not specified by filter.
     */
    protected setDefaultPaginationValues(filter: FilteringParameters): void {
        filter.count = filter.count || 100;
        filter.offset = filter.offset || 0;
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
        return this.httpRequest<T>(method, path, queryParameters, body)
            .then((response) => response)
            .catch((error: AxiosError) => {
                throw this.errorHandler.buildRequestError(error);
            });
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
     * Process http request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     */
    private httpRequest<T>(method: ClientOptions.HttpMethod, path: string, queryParameters: ({} | object),
                           body: (null | object)): Promise<T> {

        return this.httpClient.request<void, T>({
            method,
            url: path,
            data: body,
            headers: this.getComposedHttpRequestHeaders(),
            params: queryParameters,
        });
    }

    /**
     * Create http client instance with default settings.
     *
     * @return {AxiosInstance}
     */
    private buildDefaultHttpClient(): AxiosInstance {
        const httpClient = axios.create({
            baseURL: this.getBaseHttpRequestURL(),
            timeout: this.getRequestTimeoutInSeconds(),
            responseType: "json",
            validateStatus(status) {
                return status >= 200 && status < 300;
            },
        });

        httpClient.interceptors.response.use((response) => (response.data));
        return httpClient;
    }

    private getRequestTimeoutInSeconds(): number {
        return (this.clientOptions.timeout || 60) * 1000;
    }

    private getBaseHttpRequestURL(): string {
        const scheme = this.clientOptions.useHttps ? "https" : "http";
        return `${scheme}://${this.clientOptions.requestHost}`;
    }

    /**
     * Token can't be empty.
     *
     * @param {string} token - HTTP request token
     */
    private verifyToken(token: string): void {
        if (!token || token.trim() === "") {
            throw this.errorHandler.buildGeneralError("A valid API token must be provided.");
        }
    }
}
