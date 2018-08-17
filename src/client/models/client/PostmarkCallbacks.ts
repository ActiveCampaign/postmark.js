/**
 * A standard node callback. All errors returned to this callback will be a subclass of @type PostmarkError
 */
import {PostmarkError} from "./PostmarkError";

export interface PostmarkCallback<T> {
    (error: (PostmarkError | null), result: (T | null)): void;
}