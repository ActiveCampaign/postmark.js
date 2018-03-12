import Promise from 'ts-promise';
import { PostmarkError } from "./models";

export function coalesce<T>(target:T, ...sources:T[]):T {
    throw new Error("Not implemented.");
}

export interface PostmarkCallback<T> {
    (result?: T, error?: PostmarkError): void;
}