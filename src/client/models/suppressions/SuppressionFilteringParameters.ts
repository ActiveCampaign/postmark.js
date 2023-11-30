import {FilteringParameters} from "../client/FilteringParameters";

export enum SuppressionReason {
    HardBounce = "HardBounce",
    SpamComplaint = "SpamComplaint",
    ManualSuppression = "ManualSuppression",
}

export enum SuppressionOrigin {
  Recipient = "Recipient",
  Customer = "Customer",
  Admin = "Admin",
}

/**
 * Describes filtering parameters that can be used when retrieving bounces.
 * When pagination parameters are not specified, default values are set.
 */
export class SuppressionFilteringParameters extends FilteringParameters {
    public suppressionReason?: SuppressionReason;
    public origin?: SuppressionOrigin;
    public toDate?: string;
    public fromDate?: string;
    public emailAddress?: string;

    constructor(count = 100, offset = 0, suppressionReason?: SuppressionReason,
                origin?: SuppressionOrigin, emailAddress?: string,
                fromDate?: string, toDate?: string) {
        super(count, offset);
        this.suppressionReason = suppressionReason;
        this.origin = origin;
        this.emailAddress = emailAddress;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
}
