export namespace ClientOptions {
    export class Configuration {

        public useHttps: boolean;
        public requestHost: string;
        public timeout: number;
        constructor(useHttps: boolean, requestHost: string, timeout: number) {
            this.useHttps = useHttps;
            this.requestHost = requestHost;
            this.timeout = timeout;
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

    export enum DefaultHeaderNames {
        SERVER_TOKEN = "X-Postmark-Server-Token",
        ACCOUNT_TOKEN = "X-Postmark-Account-Token",
    }
}
