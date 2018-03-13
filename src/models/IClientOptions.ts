import Promise from 'ts-promise';

export default interface IClientOptions {
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