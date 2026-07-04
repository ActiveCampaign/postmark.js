import {ClientOptions, HttpClient} from "./models";
import {ErrorHandler, PostmarkError} from "./errors/index";

/**
 * Http client implementation based on the native Fetch API (available in Node 18+).
 * This keeps the SDK dependency-free while preserving the previous error handling contract.
 */
export class FetchHttpClient extends HttpClient {
    public client!: typeof fetch;
    private errorHandler: ErrorHandler;

    public constructor(configOptions?: ClientOptions.Configuration) {
        super(configOptions);
        this.errorHandler = new ErrorHandler();
    }

    /**
     * Create http client instance with default settings.
     */
    public initHttpClient(configOptions?: ClientOptions.Configuration): void {
        this.clientOptions = { ...HttpClient.DefaultOptions, ...configOptions };
        // Keep a reference to fetch so it can be configured/stubbed if needed.
        this.client = (input: any, init?: any) => fetch(input, init);
    }

    /**
     * Process http request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     * @param requestHeaders - Headers sent with http request.
     */
    public async httpRequest<T>(method: ClientOptions.HttpMethod, path: string, queryParameters: object,
                                body: (null | object), requestHeaders: any): Promise<T> {
        let response: Response;

        try {
            response = await this.client(this.buildRequestURL(path, queryParameters), {
                method,
                headers: requestHeaders,
                body: (body === null || body === undefined) ? undefined : JSON.stringify(body),
                signal: AbortSignal.timeout(this.getRequestTimeoutInMilliseconds()),
            });
        } catch (errorThrown) {
            // Network errors, aborts and timeouts reject the fetch promise.
            return Promise.reject(this.transformError(errorThrown as Error));
        }

        const data: any = await this.parseResponseBody(response);

        // Unlike axios, fetch does not reject on non-2xx responses, so handle them manually.
        if (response.status >= 200 && response.status < 300) {
            return data as T;
        }

        return Promise.reject(this.buildRequestError(data, response.status));
    }

    /**
     * Build the full request URL from the base URL, path and query parameters.
     *
     * @private
     */
    private buildRequestURL(path: string, queryParameters: object): string {
        const baseURL = this.getBaseHttpRequestURL();
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        const queryString = this.serializeQueryParameters(queryParameters);

        return `${baseURL}${normalizedPath}${queryString}`;
    }

    /**
     * Serialize query parameters into a querystring, ignoring undefined and null values.
     *
     * @private
     */
    private serializeQueryParameters(queryParameters: object): string {
        const searchParams = new URLSearchParams();

        Object.entries(queryParameters || {}).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        });

        const queryString = searchParams.toString();
        return queryString === "" ? "" : `?${queryString}`;
    }

    /**
     * Read and parse the response body. Postmark responses are JSON, but empty bodies are tolerated.
     *
     * @private
     */
    private async parseResponseBody(response: Response): Promise<any> {
        const text = await response.text();

        if (text === "") { return {}; }

        try {
            return JSON.parse(text);
        } catch {
            return text;
        }
    }

    /**
     * Build a Postmark error from a non-2xx response.
     *
     * @param data - parsed response body.
     * @param status - http response status code.
     *
     * @return {PostmarkError} - formatted Postmark error
     * @private
     */
    private buildRequestError(data: any, status: number): PostmarkError {
        const errorCode = this.adjustValue<number>(0, data == null ? undefined : data.ErrorCode);
        const message = this.adjustValue<string>(`Request returned status code ${status}`,
            data == null ? undefined : data.Message);

        return this.errorHandler.buildError(message, errorCode, status);
    }

    /**
     * Transform a thrown error (network failure, timeout, abort) into a proper Postmark error.
     *
     * @param errorThrown - error thrown while performing the request.
     *
     * @return {PostmarkError} - formatted Postmark error
     * @private
     */
    private transformError(errorThrown: Error): PostmarkError {
        if (errorThrown !== null && errorThrown.message !== undefined) {
            return this.errorHandler.buildError(errorThrown.message);
        }

        return this.errorHandler.buildError(JSON.stringify(errorThrown, Object.getOwnPropertyNames(errorThrown)));
    }

    /**
     * Timeout in seconds is adjusted to milliseconds.
     *
     * @private
     */
    private getRequestTimeoutInMilliseconds(): number {
        return (this.clientOptions.timeout || 60) * 1000;
    }

    private adjustValue<T>(defaultValue: T, data: T): T {
        return (data === undefined) ? defaultValue : data;
    }
}
