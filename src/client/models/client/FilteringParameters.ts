import { Hash } from "./SupportingTypes";

/**
 * Describes default filtering parameters that can be used.
 * When pagination parameters are not specified, default values are set.
 */
export class FilteringParameters implements Hash<any> {
    public count?: number;
    public offset?: number;
    constructor(count = 100, offset = 0) {
        this.count = count;
        this.offset = offset;
    }
}
