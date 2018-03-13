import { PostmarkError } from "./models";

/**
 * @internal
 */
export function coalesce<T>(target: T, ...sources: T[]): T {
    target = target || {};
    for (let s of sources) {
        for (let p in s) {
            let targetVal = target[p];
            if (targetVal == undefined && targetVal == null) {
                target[p] = s[p];
            }
        }
    }
    return target;
}

/**
 * A standard node callback. All errors returned to this callback will be a subclass of @type PostmarkError
 */
export interface PostmarkCallback<T> {
    (error: (PostmarkError | null), result: (T | null)): void;
}