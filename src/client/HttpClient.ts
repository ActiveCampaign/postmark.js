import axios, {AxiosInstance} from "axios";
import { ClientOptions } from "./models";

export interface HttpClientError<T = any> extends Error {
    code?: string;
    request?: any;
    response?: HttpClientResponse<T>;
}

export interface HttpClientResponse<T = any>  {
    data: T;
    status: number;
    statusText: string;
    request?: any;
}

export abstract class HttpClient {
    /**
     * Http Client connection configuration options.
     * You may modify these values and new clients will use them.
     * Any values provided to a Client constructor will override default options.
     */
    public static DefaultOptions: ClientOptions.Configuration = {
        useHttps: true,
        requestHost: "api.postmarkapp.com",
        timeout: 180,
    };

    public abstract client:any;
    public clientOptions: ClientOptions.Configuration;
    protected readonly authHeader: string;
    protected readonly token: string;
    protected readonly clientVersion: string;

    public constructor(authHeader: string, token: string, clientVersion: string) {
        this.clientOptions = HttpClient.DefaultOptions;
        this.authHeader = authHeader;
        this.token = token;
        this.clientVersion = clientVersion;
    }

    public setClientOptions(configOptions?: ClientOptions.Configuration): void {
        this.clientOptions = { ...HttpClient.DefaultOptions, ...configOptions };
    }

    /**
     * JSON object with default headers sent by HTTP request.
     */
    public getComposedHttpRequestHeaders(): any {
        return {
            [this.authHeader]: this.token,
            "Accept": "application/json",
            "User-Agent": `Postmark.JS - ${this.clientVersion}`,
        };
    }

    protected getBaseHttpRequestURL(): string {
        const scheme = this.clientOptions.useHttps ? "https" : "http";
        return `${scheme}://${this.clientOptions.requestHost}`;
    }

    public abstract buildHttpClient(configOptions?: ClientOptions.Configuration): void;
    public abstract httpRequest<T>(method: ClientOptions.HttpMethod, path: string, queryParameters: ({} | object),
                                body: (null | object)): Promise<T>;
}

export class AxiosHttpClient extends HttpClient {
    public client: AxiosInstance;

    public constructor(authHeader: string, token: string, clientVersion: string) {
        super(authHeader, token, clientVersion);
        this.client = this.buildHttpClient();

    }

    public setHttpClient(configOptions?: ClientOptions.Configuration): void {
        this.client = this.buildHttpClient(configOptions);
    }

    /**
     * Create http client instance with default settings.
     *
     * @return {AxiosInstance}
     */
    public buildHttpClient(configOptions?: ClientOptions.Configuration): AxiosInstance {
        this.setClientOptions(configOptions);

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