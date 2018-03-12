import Promise from 'ts-promise';

export default interface IClientOptions {
    /**
     * Require HTTPS for API requests? Defaults to `true`
     */
    useHttps?: boolean,
    
    /**
     * The base url for accessing the Postmark API.
     * Defaults to `api.postmarkapp.com`
     */
    requestHost?: string,
    
    /**
     * The request timeout (in seconds) for API calls.
     */
    timeout?:number
}