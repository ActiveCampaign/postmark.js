export namespace ClientOptions {
    export class Configuration {

        public useHttps?: boolean;
        public requestHost?: string;
        public timeout?: number;
        public proxy?: ProxyConfiguration 

        constructor(useHttps?: boolean, requestHost?: string, timeout?: number, proxy?: ProxyConfiguration) {
            this.useHttps = useHttps;
            this.requestHost = requestHost;
            this.timeout = timeout;
            this.proxy = proxy
        }
    }

    export class ProxyConfiguration {
        public host: string;
        public port: number;
        public protocol?: string;
        public username?: string;
        public password?: string;

        constructor(host: string, port: number, protocol?: string, username?: string, password?: string){
            this.host = host;
            this.port = port;
            this.protocol = protocol;
            this.username = username;
            this.password = password;
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
