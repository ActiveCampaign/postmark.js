import axios, {AxiosInstance} from "axios";
import {ClientOptions, HttpClient } from "./models";

export class AxiosHttpClient extends HttpClient {
    public client: AxiosInstance;

    public constructor(token: string, authHeader: string, clientVersion: string) {
        super(token, authHeader, clientVersion);
        this.client = this.buildHttpClient(this.clientOptions);
    }

    /**
     * Create http client instance with default settings.
     *
     * @return {AxiosInstance}
     */
    public buildHttpClient(configOptions?: ClientOptions.Configuration): AxiosInstance {
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
        return httpClient;
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
                           body: (null | object)): Promise<T> {

        return this.client.request<void, T>({
            method,
            url: path,
            data: body,
            headers: this.getComposedHttpRequestHeaders(),
            params: queryParameters,
        });
    }

    private getRequestTimeoutInSeconds(): number {
        return (this.clientOptions.timeout || 60) * 1000;
    }
}