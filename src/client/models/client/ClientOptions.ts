export namespace ClientOptions {

    /**
     * Custom fetch implementation signature.
     *
     * Node's built-in fetch (undici) does not read HTTP_PROXY/HTTPS_PROXY/NO_PROXY. Supplying a
     * custom fetch (for example one bound to an undici ProxyAgent dispatcher) is the supported way
     * to route requests through a corporate egress proxy or otherwise customise transport.
     */
    export type FetchImplementation = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

    export class Configuration {

        public useHttps?: boolean;
        public requestHost?: string;
        public timeout?: number;
        public fetch?: FetchImplementation;
        constructor(useHttps?: boolean, requestHost?: string, timeout?: number, fetch?: FetchImplementation) {
            this.useHttps = useHttps;
            this.requestHost = requestHost;
            this.timeout = timeout;
            // Only set when provided so the options object shape is unchanged for callers that don't use it.
            if (fetch !== undefined) { this.fetch = fetch; }
        }
    }

    export enum HttpMethod {
        GET = "GET",
        POST = "POST",
        DELETE = "DELETE",
        PUT = "PUT",
        OPTIONS = "OPTIONS",
        HEAD = "HEAD",
        PATCH = "PATCH",
    }

    export enum AuthHeaderNames {
        SERVER_TOKEN = "X-Postmark-Server-Token",
        ACCOUNT_TOKEN = "X-Postmark-Account-Token",
    }
}
