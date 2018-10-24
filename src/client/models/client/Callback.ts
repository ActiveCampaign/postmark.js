/**
 * A standard node callback. All errors returned to this callback will be a in namespace 'PostmarkError'
 */
import {Errors} from "./Errors";

export interface Callback<T> {
    (error: (Errors.PostmarkError | null), result: (T | null)): void;
}