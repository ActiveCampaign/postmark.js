import FilteringParameters from "../client/FilteringParameters";

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

export interface OutboundMessagesFilteringParameters extends FilteringParameters {
    recipient?: string;
    fromEmail?: string;
    tag?: string;
    status?: OutboundMessageStatus;
    fromDate?:string;
    toDate?:string;
    subject?: string;
}

export interface InboundMessagesFilteringParameters extends FilteringParameters {
    mailboxHash?: string;
    recipient?: string;
    fromEmail?: string;
    tag?: string;
    status?: InboundMessageStatus;
    fromDate?:string;
    toDate?:string;
    subject?: string;
}

export interface OutboundMessageOpensFilteringParameters extends FilteringParameters {
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

export interface OutboundMessageClicksFilteringParameters extends  OutboundMessageOpensFilteringParameters {}