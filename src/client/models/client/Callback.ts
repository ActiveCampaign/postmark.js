/**
 * A standard node callback. All errors returned to this callback will be a subclass of @type PostmarkError
 */
import {PostmarkErrors} from "./PostmarkError";

export interface Callback<T> {
    (error: (PostmarkErrors.PostmarkError | null), result: (T | null)): void;
}