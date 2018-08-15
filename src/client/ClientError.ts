import {PostmarkErrors} from "./models";

export class ClientError {
    public generate(statusCode: number, errorMessage: string): PostmarkErrors.StandardError {
        switch (statusCode) {
            case 401:
                return new PostmarkErrors.InvalidAPIKeyError(errorMessage);
                break;

            case 422:
                return new PostmarkErrors.InvalidMessageError(errorMessage);
                break;

            case 500:
                return new PostmarkErrors.InternalServerError(errorMessage);
                break;

            default:
                return new PostmarkErrors.UnknownError(errorMessage);
                break;
        }
    }
}
