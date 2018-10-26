import { FilteringParameters } from "../client/FilteringParameters";

export enum BounceType {
    HardBounce = "HardBounce",
    Transient = "Transient",
    Unsubscribe = "Unsubscribe",
    Subscribe = "Subscribe",
    AutoResponder = "AutoResponder",
    AddressChange = "AddressChange",
    DnsError = "DnsError",
    SpamNotification = "SpamNotification",
    OpenRelayTest = "OpenRelayTest",
    Unknown = "Unknown",
    SoftBounce = "SoftBounce",
    VirusNotification = "VirusNotification",
    ChallengeVerification = "ChallengeVerification",
    BadEmailAddress = "BadEmailAddress",
    SpamComplaint = "SpamComplaint",
    ManuallyDeactivated = "ManuallyDeactivated",
    Unconfirmed = "Unconfirmed",
    Blocked = "Blocked",
    SMTPApiError = "SMTPApiError",
    InboundError = "InboundError",
    DMARCPolicy = "DMARCPolicy",
    TemplateRenderingFailed = "TemplateRenderingFailed"
}

export class BounceFilteringParameters extends FilteringParameters {
    constructor(count: number = 100, offset: number = 0, type?: BounceType,
        inactive?: boolean, emailFilter?: string,
        tag?: string, messageID?: string, fromDate?: string, toDate?: string) {
        super(count, offset);
        this.type = type;
        this.inactive = inactive;
        this.emailFilter = emailFilter;
        this.tag = tag;
        this.messageID = messageID;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
    type?: BounceType;
    inactive?: boolean;
    emailFilter?: string;
    tag?: string;
    messageID?: string;
    fromDate?: string;
    toDate?: string;
}
