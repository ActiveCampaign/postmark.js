import * as requestPromise from "request-promise";
import * as http from "http";

export interface HttpRequestDetails {
    options: requestPromise.Options;
    error: any;
    response: http.IncomingMessage;
    statusCode?: number;
}

export class PostmarkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = (<any>PostmarkError).name;
    }
}

export class PostmarkHttpError extends PostmarkError {
    public httpRequestDetails?: HttpRequestDetails;

    constructor(message: string, httpRequestDetails?: HttpRequestDetails) {
        super(message);
        if (httpRequestDetails !== null) { this.httpRequestDetails = httpRequestDetails;}
        this.name = (<any>PostmarkHttpError).name;
    }
}

export class InvalidAPIKeyError extends PostmarkHttpError {
    constructor(message: string, httpRequestDetails?: HttpRequestDetails) {
        super(message, httpRequestDetails);
        this.name =  (<any>InvalidAPIKeyError).name;
    }
}

export class ApiInputError extends PostmarkHttpError {
    constructor(message: string, httpRequestDetails?: HttpRequestDetails) {
        super(message, httpRequestDetails);
        this.name = (<any>ApiInputError).name;
    }
}

export class InternalServerError extends PostmarkHttpError {
    constructor(message: string, httpRequestDetails?: HttpRequestDetails) {
        super(message, httpRequestDetails);
        this.name = (<any>InternalServerError).name;
    }
}

export class ServiceUnavailablerError extends PostmarkHttpError {
    constructor(message: string, httpRequestDetails?: HttpRequestDetails) {
        super(message, httpRequestDetails);
        this.name = (<any>ServiceUnavailablerError).name;
    }
}

export class UnknownError extends PostmarkHttpError {
    constructor(message: string, httpRequestDetails?: HttpRequestDetails) {
        super(message, httpRequestDetails);
        this.name = (<any>UnknownError).name;;
    }
}






