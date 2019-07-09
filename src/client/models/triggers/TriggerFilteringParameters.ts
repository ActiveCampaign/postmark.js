import {FilteringParameters} from "../client/FilteringParameters";

/**
 * Describes filtering parameters that can be used when retrieving tags.
 * When pagination parameters are not specified, default values are set.
 */
export class TagTriggerFilteringParameters extends FilteringParameters {
    public match_name?: string;
    constructor(count: number = 100, offset: number = 0, match_name?: string) {
        super(count, offset);
        this.match_name = match_name;
    }
}
