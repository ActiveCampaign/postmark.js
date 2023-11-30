/**
 * Standard Postmark error on which all sub-errors are based.
 */
export class PostmarkError extends Error {
    public code: number;
    public statusCode: number;

    constructor(message: string, code = 0, statusCode = 0) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;

        // this is mandatory due:
        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, PostmarkError.prototype);
        this.setUpStackTrace();
    }

    protected setUpStackTrace() {
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class HttpError extends PostmarkError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        Object.setPrototypeOf(this, HttpError.prototype);
        this.setUpStackTrace();
    }
}

export class InvalidAPIKeyError extends HttpError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        Object.setPrototypeOf(this, InvalidAPIKeyError.prototype);
        this.setUpStackTrace();
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        Object.setPrototypeOf(this, InternalServerError.prototype);
        this.setUpStackTrace();
    }
}

export class ServiceUnavailablerError extends HttpError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        Object.setPrototypeOf(this, ServiceUnavailablerError.prototype);
        this.setUpStackTrace();
    }
}

export class RateLimitExceededError extends HttpError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        Object.setPrototypeOf(this, RateLimitExceededError.prototype);
        this.setUpStackTrace();
    }
}

export class UnknownError extends HttpError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        Object.setPrototypeOf(this, UnknownError.prototype);
        this.setUpStackTrace();
    }
}

export class ApiInputError extends HttpError {
    public static ERROR_CODES = {
        inactiveRecipient: 406,
        invalidEmailRequest: 300
    };

    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        Object.setPrototypeOf(this, ApiInputError.prototype);
        this.setUpStackTrace();
    }

    public static buildSpecificError(message: string, code: number, statusCode: number): ApiInputError {
        switch (code) {
            case this.ERROR_CODES.inactiveRecipient:
                return new InactiveRecipientsError(message, code, statusCode);
            case this.ERROR_CODES.invalidEmailRequest:
                return new InvalidEmailRequestError(message, code, statusCode);
            default:
                return new ApiInputError(message, code, statusCode);
        }
    }
}

export class InactiveRecipientsError extends ApiInputError {
    public static inactiveRecipientsPatterns = [
        /Found inactive addresses: (.+?)\.? Inactive/,
        /these inactive addresses: (.+?)\.?$/
    ]

    public recipients: string[];

    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        Object.setPrototypeOf(this, InactiveRecipientsError.prototype);
        this.setUpStackTrace();
        this.recipients = InactiveRecipientsError.parseInactiveRecipients(message);
    }

    public static parseInactiveRecipients(message: string): string[] {
        let result: string[] = [];

        this.inactiveRecipientsPatterns.some(pattern => {
            const regexResult = message.match(pattern)
            if (regexResult !== null) {
                result = regexResult[1].split(',').map(element => element.trim());
                return result;
            }
            else {
                result = []
            }
        })

        return result;
    }
}

export class InvalidEmailRequestError extends ApiInputError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        Object.setPrototypeOf(this, InvalidEmailRequestError.prototype);
        this.setUpStackTrace();
    }
}
