import { Hash } from "./SupportingTypes";

export enum DefaultPaginationValues {
    count = 100,
    offset = 0
}

/**
 * Describes default filtering parameters that can be used.
 * When pagination parameters are not specified, default values provided by [[DefaultPaginationFilterValues]] are set.
 */
export class FilteringParameters implements Hash<any>{
    constructor(count: number = DefaultPaginationValues.count, offset: number = DefaultPaginationValues.offset) {
        this.count = count;
        this.offset = offset;
    }
    count?: number;
    offset?: number;
}