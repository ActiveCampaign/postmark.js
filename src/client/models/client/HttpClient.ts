import { ClientOptions } from "./ClientOptions";

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
    protected client: any;

    public constructor(configOptions?: ClientOptions.Configuration) {
        this.clientOptions = { ...HttpClient.DefaultOptions, ...configOptions };
        this.initHttpClient(this.clientOptions);
    }

    public getBaseHttpRequestURL(): string {
        const scheme = this.clientOptions.useHttps ? "https" : "http";
        return `${scheme}://${this.clientOptions.requestHost}`;
    }

    public abstract initHttpClient(configOptions?: ClientOptions.Configuration): void;
    public abstract httpRequest<T>(method: ClientOptions.HttpMethod, path: string, queryParameters: ({} | object),
                                   body: (null | object), headers: any): Promise<T>;
}