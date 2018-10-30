import {DefaultPaginationValues, FilteringParameters} from "../client/FilteringParameters";

/**
 * Describes filtering parameters that can be used when retrieving tags.
 * When pagination parameters are not specified, default values provided by [[DefaultPaginationFilterValues]] are set.
 */
export class TagTriggerFilteringParameters extends FilteringParameters {
    constructor(count: number = DefaultPaginationValues.count, offset: number = DefaultPaginationValues.offset, match_name?: string) {
        super(count, offset);
        this.match_name = match_name
    }
    match_name?: string;
}
