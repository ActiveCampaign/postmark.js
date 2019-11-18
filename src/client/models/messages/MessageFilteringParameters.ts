import {FilteringParameters} from "../client/FilteringParameters";

export enum OutboundMessageStatus {
    Queued = "queued",
    Sent = "sent",
    Processed = "processed",
}

export enum InboundMessageStatus {
    Queued = "queued",
    Sent = "sent",
    Processed = "processed",
    Blocked = "blocked",
    Failed = "failed",
    Scheduled = "scheduled",
}

/**
 * Describes filtering parameters that can be used when retrieving outbound messages.
 * When pagination parameters are not specified, default values are set.
 */
export class OutboundMessagesFilteringParameters extends FilteringParameters {
    public recipient?: string;
    public fromEmail?: string;
    public tag?: string;
    public status?: OutboundMessageStatus;
    public fromDate?: string;
    public toDate?: string;
    public subject?: string;
    public messageStream?: string;
    constructor(count: number = 100, offset: number = 0,
                recipient?: string, fromEmail?: string, tag?: string,
                status?: OutboundMessageStatus, fromDate?: string,
                toDate?: string, subject?: string, messageStream?: string) {
        super(count, offset);

        this.recipient = recipient;
        this.fromEmail = fromEmail;
        this.tag = tag;
        this.status = status;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.subject = subject;
        this.messageStream = messageStream;
    }
}

/**
 * Describes filtering parameters that can be used when retrieving inbound messages.
 * When pagination parameters are not specified, default values are set.
 */
export class InboundMessagesFilteringParameters extends FilteringParameters {
    public mailboxHash?: string;
    public recipient?: string;
    public fromEmail?: string;
    public tag?: string;
    public status?: InboundMessageStatus;
    public fromDate?: string;
    public toDate?: string;
    public subject?: string;
    constructor(count: number = 100, offset = 0,
                mailboxHash?: string, recipient?: string, fromEmail?: string,
                tag?: string, status?: InboundMessageStatus,
                fromDate?: string,
                toDate?: string,
                subject?: string) {
        super(count, offset);
        this.status = status;
        this.mailboxHash = mailboxHash;
        this.recipient = recipient;
        this.fromEmail = fromEmail;
        this.tag = tag;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.subject = subject;
    }
}

/**
 * Describes filtering parameters that can be used when retrieving tracked outbound messages.
 * When pagination parameters are not specified, default values are set.
 */
export class OutboundMessageTrackingFilteringParameters extends FilteringParameters {
    public recipient?: string;
    public tag?: string;
    public client_name?: string;
    public client_company?: string;
    public client_family?: string;
    public os_name?: string;
    public os_family?: string;
    public os_company?: string;
    public platform?: string;
    public country?: string;
    public region?: string;
    public city?: string;
    public messageStream?: string;
    constructor(count: number = 100, offset: number = 0,
                recipient?: string, tag?: string, client_name?: string,
                client_company?: string, client_family?: string,
                os_name?: string, os_family?: string, os_company?: string,
                platform?: string, country?: string, region?: string, city?: string,
                messageStream?: string,
    ) {
        super(count, offset);
        this.recipient = recipient;
        this.tag = tag;
        this.client_name = client_name;
        this.client_company = client_company;
        this.client_family = client_family;
        this.os_name = os_name;
        this.os_family = os_family;
        this.os_company = os_company;
        this.platform = platform;
        this.country = country;
        this.region = region;
        this.city = city;
        this.messageStream = messageStream;
    }
}

export class OutboundMessageOpensFilteringParameters extends OutboundMessageTrackingFilteringParameters { }
export class OutboundMessageClicksFilteringParameters extends OutboundMessageTrackingFilteringParameters { }
