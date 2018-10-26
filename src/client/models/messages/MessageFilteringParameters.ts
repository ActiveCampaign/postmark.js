import { FilteringParameters } from "../client/FilteringParameters";

export enum OutboundMessageStatus {
    Queued = "queued",
    Sent = "sent",
    Processed = "processed"
}

export enum InboundMessageStatus {
    Queued = "queued",
    Sent = "sent",
    Processed = "processed",
    Blocked = "blocked",
    Failed = "failed",
    Scheduled = "scheduled"
}

export class OutboundMessagesFilteringParameters extends FilteringParameters {
    constructor(count: number = 100, offset: number = 0,
        recipient?: string, fromEmail?: string, tag?: string,
        status?: OutboundMessageStatus, fromDate?: string,
        toDate?: string, subject?: string) {
        super(count, offset);

        this.recipient = recipient;
        this.fromEmail = fromEmail;
        this.tag = tag;
        this.status = status;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.subject = subject;
    }
    recipient?: string;
    fromEmail?: string;
    tag?: string;
    status?: OutboundMessageStatus;
    fromDate?: string;
    toDate?: string;
    subject?: string;
}

export class InboundMessagesFilteringParameters extends FilteringParameters {
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
    mailboxHash?: string;
    recipient?: string;
    fromEmail?: string;
    tag?: string;
    status?: InboundMessageStatus;
    fromDate?: string;
    toDate?: string;
    subject?: string;
}

export class OutboundMessageTrackingFilteringParameters extends FilteringParameters {
    constructor(count: number = 100, offset: number = 0,
        recipient?: string, tag?: string, client_name?: string,
        client_company?: string, client_family?: string,
        os_name?: string, os_family?: string, os_company?: string,
        platform?: string, country?: string, region?: string, city?: string,
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
    }
    recipient?: string;
    tag?: string;
    client_name?: string;
    client_company?: string;
    client_family?: string;
    os_name?: string;
    os_family?: string;
    os_company?: string;
    platform?: string;
    country?: string;
    region?: string;
    city?: string;
}

export class OutboundMessageOpensFilteringParameters extends OutboundMessageTrackingFilteringParameters { }
export class OutboundMessageClicksFilteringParameters extends OutboundMessageTrackingFilteringParameters { }