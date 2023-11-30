import {FilteringParameters} from "../client/FilteringParameters";

/**
 * Describes filtering parameters that can be used when retrieving servers.
 * When pagination parameters are not specified, default values are set.
 */
export class ServerFilteringParameters extends FilteringParameters {
    public name?: string;

    constructor(count = 100, offset = 0, name?: string) {
        super(count, offset);
        this.name = name;
    }
}
