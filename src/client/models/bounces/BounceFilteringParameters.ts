import {FilteringParameters} from "../client/FilteringParameters";
import {BounceType} from "./Bounce";

/**
 * Describes filtering parameters that can be used when retrieving bounces.
 * When pagination parameters are not specified, default values are set.
 */
export class BounceFilteringParameters extends FilteringParameters {
    public type?: BounceType;
    public inactive?: boolean;
    public emailFilter?: string;
    public tag?: string;
    public messageID?: string;
    public fromDate?: string;
    public toDate?: string;
    public messageStream?: string;

    constructor(count = 100, offset = 0, type?: BounceType,
                inactive?: boolean, emailFilter?: string,
                tag?: string, messageID?: string, fromDate?: string, toDate?: string, messageStream?: string) {
        super(count, offset);
        this.type = type;
        this.inactive = inactive;
        this.emailFilter = emailFilter;
        this.tag = tag;
        this.messageID = messageID;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.messageStream = messageStream;
    }
}
