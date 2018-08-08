export default interface ClientOptions {
    /**
     * Require HTTPS for API requests?
     * @default true
     */
    useHttps?: boolean
    
    /**
     * The base url for accessing the Postmark API.
     * @default api.postmarkapp.com
     */
    requestHost?: string
    
    /**
     * The request timeout (in seconds) for API calls.
     * @default 30
     */
    timeout?:number
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