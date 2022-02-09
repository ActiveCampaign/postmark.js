import { ClientOptions } from "./ClientOptions";

/**
 * Minimum data that has to be provided by HttpClient error so that it can be classified.
 */
export interface HttpClientError<T = any> extends Error {
    response?: HttpClientErrorResponse<T>;
}

export interface HttpClientErrorResponse<T = any>  {
    data: T;
    status: number;
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

    public clientOptions: ClientOptions.Configuration;
    protected readonly authHeader: string;
    protected readonly token: string;
    protected readonly clientVersion: string;
    public abstract client: any;

    protected constructor(token: string, authHeader: string, clientVersion: string) {
        this.clientOptions = HttpClient.DefaultOptions;
        this.authHeader = authHeader;
        this.token = token;
        this.clientVersion = clientVersion;
        this.buildHttpClient(this.clientOptions);
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

    public getBaseHttpRequestURL(): string {
        const scheme = this.clientOptions.useHttps ? "https" : "http";
        return `${scheme}://${this.clientOptions.requestHost}`;
    }

    public abstract buildHttpClient(configOptions?: ClientOptions.Configuration): any;
    public abstract httpRequest<T>(method: ClientOptions.HttpMethod, path: string, queryParameters: ({} | object),
                                   body: (null | object)): Promise<T>;
}