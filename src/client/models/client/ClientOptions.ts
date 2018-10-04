export module ClientOptions {
    export interface Configuration {
        useHttps?: boolean;
        requestHost?: string;
        timeout?:number;
    }

    export enum HttpMethod {
        GET = 'GET',
        POST = 'POST',
        DELETE = 'DELETE',
        PUT = 'PUT',
        OPTIONS = 'OPTIONS',
        HEAD = 'HEAD'
    }

    export enum DefaultHeaderNames {
        SERVER_TOKEN = 'X-Postmark-Server-Token',
        ACCOUNT_TOKEN = 'X-Postmark-Account-Token'
    }
}