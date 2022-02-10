import axios, {AxiosInstance} from "axios";
import {ClientOptions, HttpClient } from "./models";

export class AxiosHttpClient extends HttpClient {
    protected client!: AxiosInstance;

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
        });
    }

    /**
     * Timeout in seconds is adjusted to Axios format.
     *
     * @private
     */
    private getRequestTimeoutInSeconds(): number {
        return (this.clientOptions.timeout || 60) * 1000;
    }
}