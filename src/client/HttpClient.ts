import axios, {AxiosInstance, AxiosError, AxiosResponse} from "axios";
import {ClientOptions, DefaultResponse, HttpClient} from "./models";
import {ErrorHandler} from "./errors/ErrorHandler";
import * as Errors from "./errors/Errors";
import {error} from "util";

export class AxiosHttpClient extends HttpClient {
    protected client!: AxiosInstance;
    private errorHandler: ErrorHandler;

    public constructor(configOptions?: ClientOptions.Configuration) {
        super(configOptions);
        this.errorHandler = new ErrorHandler();
    }

    /**
     * Create http client instance with default settings.
     *
     * @return {AxiosInstance}
     */
    public initHttpClient(configOptions?: ClientOptions.Configuration): void {
        this.clientOptions = { ...HttpClient.DefaultOptions, ...configOptions };

        const httpClient = axios.create({
            baseURL: this.getBaseHttpRequestURL(),
            timeout: this.getRequestTimeoutInSeconds(),
            responseType: "json",
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            validateStatus(status: number) {
                return status >= 200 && status < 300;
            },
        });

        httpClient.interceptors.response.use((response: any) => (response.data));
        this.client = httpClient;
    }

    /**
     * Process http request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     */
    public httpRequest<T>(method: ClientOptions.HttpMethod, path: string, queryParameters: ({} | object),
                           body: (null | object), requestHeaders: any): Promise<T> {

        return this.client.request<void, T>({
            method,
            url: path,
            data: body,
            headers: requestHeaders,
            params: queryParameters,
        }).catch((errorThrown: AxiosError) => {
            return Promise.reject(this.transformError(errorThrown));
        })
    }

    /**
     * Timeout in seconds is adjusted to Axios format.
     *
     * @private
     */
    private getRequestTimeoutInSeconds(): number {
        return (this.clientOptions.timeout || 60) * 1000;
    }

    /**
     * Process callback function for HTTP request.
     *
     * @param error - request error that needs to be transformed to proper Postmark error.
     *
     * @return {PostmarkError} - formatted Postmark error
     */
    private transformError(errorThrown:AxiosError): Errors.PostmarkError {
        const response: AxiosResponse | undefined = errorThrown.response;

        if (response !== undefined) {
            const data: DefaultResponse = response.data;
            const status = this.adjustValue<number>(0, response.status);
            const errorCode = this.adjustValue<number>(0, data.ErrorCode);
            const message = this.adjustValue<string>(errorThrown.message, data.Message);

            return this.errorHandler.buildError(message, errorCode, status);
        } else {
            const message:string = (errorThrown.message !== undefined) ?
                errorThrown.message : JSON.stringify(errorThrown, Object.getOwnPropertyNames(errorThrown))
            return this.errorHandler.buildError(message);
        }
    }

    private adjustValue<T>(defaultValue: T, data: T): T {
        return (data === undefined) ? defaultValue : data;
    }
}