import * as Errors from "./Errors";

/**
 * A standard node callback. All errors returned to this callback will be a in namespace 'PostmarkError'
 */
export type Callback<T> = (error: (Errors.PostmarkError | null), result: (T | null)) => void;
