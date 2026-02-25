import {ClientOptions, HttpClient} from "./models";
import {ErrorHandler, PostmarkError} from "./errors/index";

export class FetchHttpClient extends HttpClient {
    public client: any;
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
        this.client = {};
    }

    /**
     * Process http request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     * @param requestHeaders - Headers to include in the request.
     */
    public httpRequest<T>(method: ClientOptions.HttpMethod, path: string, queryParameters: object,
                           body: (null | object), requestHeaders: any): Promise<T> {

        const url = this.buildRequestUrl(path, queryParameters);
        const timeout = this.getRequestTimeoutInMilliseconds();
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        const fetchOptions: RequestInit = {
            method,
            headers: requestHeaders,
            signal: controller.signal,
        };

        if (body !== null && body !== undefined) {
            fetchOptions.body = JSON.stringify(body);
        }

        return fetch(url, fetchOptions)
            .then((response: Response) => {
                clearTimeout(timer);
                return this.handleResponse<T>(response);
            })
            .catch((error: any) => {
                clearTimeout(timer);
                return Promise.reject(this.transformError(error));
            });
    }

    /**
     * Handle the fetch Response, parsing JSON and handling non-2xx status codes.
     */
    private handleResponse<T>(response: Response): Promise<T> {
        return response.text().then((text: string) => {
            let data: any;
            try {
                data = text ? JSON.parse(text) : {};
            } catch (e) {
                data = {};
            }

            if (response.ok) {
                return data as T;
            }

            // Non-2xx: build a proper error from the response body
            const status = response.status || 0;
            const errorCode = (data && data.ErrorCode) ? data.ErrorCode : 0;
            const message = (data && data.Message) ? data.Message : response.statusText || "Unknown error";

            return Promise.reject(this.errorHandler.buildError(message, errorCode, status));
        });
    }

    /**
     * Transform a fetch error (network error, abort, etc.) into a PostmarkError.
     *
     * @param error - the error thrown during the fetch call
     * @returns {PostmarkError} - formatted Postmark error
     */
    private transformError(error: any): PostmarkError {
        // If it's already a PostmarkError (from handleResponse rejection), pass through
        if (error instanceof PostmarkError) {
            return error;
        }

        if (error && error.name === "AbortError") {
            return this.errorHandler.buildError("Request timed out");
        }

        if (error && error.message !== undefined) {
            return this.errorHandler.buildError(error.message);
        }

        return this.errorHandler.buildError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }

    /**
     * Build the full request URL with query parameters.
     */
    private buildRequestUrl(path: string, queryParameters: object): string {
        const baseUrl = this.getBaseHttpRequestURL();
        const url = `${baseUrl}${path}`;

        const params = this.buildQueryString(queryParameters);
        return params ? `${url}?${params}` : url;
    }

    /**
     * Build a query string from an object of parameters.
     * Filters out undefined and null values.
     */
    private buildQueryString(queryParameters: object): string {
        const params = new URLSearchParams();

        Object.keys(queryParameters).forEach((key) => {
            const value = (queryParameters as any)[key];
            if (value !== undefined && value !== null) {
                params.append(key, String(value));
            }
        });

        const result = params.toString();
        return result;
    }

    /**
     * Timeout in seconds is adjusted to milliseconds.
     *
     * @private
     */
    private getRequestTimeoutInMilliseconds(): number {
        return (this.clientOptions.timeout || 60) * 1000;
    }
}
