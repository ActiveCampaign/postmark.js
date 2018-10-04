import {Hash} from "../client/SupportingTypes"
import { LinkTrackingOptions, Header, Attachment } from "../message/SupportingTypes";
import {DefaultResponse} from "../client/PostmarkResponse";

export interface Message {
    From: string;
    To?: string;
    Cc?: string;
    Bcc?: string;
    Subject: string;
    ReplyTo?: string;
    HtmlBody?: string;
    TextBody?: string;
    Tag?: string;
    TrackOpens?: boolean;
    TrackLinks?: LinkTrackingOptions;
    Headers?: Header[];
    Attachments?: Attachment[];
    Metadata?: Hash<string>;
}

export interface MessageSendingResponse extends DefaultResponse {
    To?: string;
    Cc?: string;
    Bcc?: string;
    SubmittedAt: string;
    MessageID: string;
}
