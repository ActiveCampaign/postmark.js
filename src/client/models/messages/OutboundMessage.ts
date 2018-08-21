import {Hash} from "../client/SupportingTypes"
import {Attachment, LinkTrackingOptions} from "../message/SupportingTypes";
import * as OutboundMessageEvents from "./OutboundMessageEvents"

export interface Recipient {
    Email: string
    Name: string
}

export interface OutboundMessage {
    MessageID: string;
    Tag?: string;
    To: Recipient[];
    Cc: Recipient[];
    Bcc: Recipient[];
    Recipients: string[];
    ReceivedAt: string;
    From: string;
    Subject: string;
    Attachments: Attachment[];
    Status: string;
    TrackOpens: boolean;
    TrackLinks: LinkTrackingOptions;
    Metadata: Hash<string>;
}

export interface OutboundMessageDetails extends OutboundMessage {
    TextBody?: string;
    HtmlBody?: string;
    Body: string;
    MessageEvents: OutboundMessageEvents.MessageEvent[];
}

export interface OutboundMessageDump {
    Body: string;
}

export interface OutboundMessages {
    TotalCount: string;
    Messages: OutboundMessage[];
}