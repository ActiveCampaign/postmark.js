import { FilteringParameters } from "../client/FilteringParameters";

export class TagTriggerFilteringParameters extends FilteringParameters {
    constructor(count: number = 100, offset: number = 0, match_name?: string) {
        super(count, offset);
        this.match_name = match_name
    }
    match_name?: string;
}
