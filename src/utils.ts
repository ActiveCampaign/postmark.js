import Promise from 'ts-promise';
import { PostmarkError } from "./models";

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

export interface PostmarkCallback<T> {
    (result?: T, error?: PostmarkError): void;
}