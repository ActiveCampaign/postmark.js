import {PostmarkErrors} from "./models";
import {StatusCodeError} from "request-promise/errors";

export class ClientError {
    public generate(error: Error): PostmarkErrors.StandardError {
        let errorToHandle:StatusCodeError = <StatusCodeError>error;

        console.log(errorToHandle.options);

        switch (errorToHandle.statusCode) {
            case 401:
                return new PostmarkErrors.InvalidAPIKeyError(error.message);
                break;

            case 422:
                return new PostmarkErrors.InvalidMessageError(error.message);
                break;

            case 500:
                return new PostmarkErrors.InternalServerError(error.message);
                break;

            default:
                return new PostmarkErrors.UnknownError(error.message);
                break;
        }
    }
}
