/**
 * A standard node callback. All errors returned to this callback will be a in namespace 'PostmarkError'
 */
import {PostmarkError} from "./PostmarkError";

export interface Callback<T> {
    (error: (PostmarkError.StandardError | null), result: (T | null)): void;
}