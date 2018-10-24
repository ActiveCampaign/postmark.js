import {Hash} from "../client/SupportingTypes"
import { LinkTrackingOptions, Header, Attachment } from "../message/SupportingTypes";
import {DefaultResponse} from "../client/DefaultResponse";

export class Message {
    constructor(From: string, Subject: string, HtmlBody?: string, TextBody?: string,
                To?: string, Cc?: string, Bcc?: string, ReplyTo?: string, Tag?: string,
                TrackOpens?: boolean, TrackLinks?: LinkTrackingOptions, Headers?: Header[],
                Attachments?: Attachment[], Metadata?: Hash<string>) {

        this.From = From;
        this.To = To;
        this.Cc = Cc;
        this.Bcc = Bcc;
        this.Subject = Subject;
        this.ReplyTo = ReplyTo;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.Tag = Tag;
        this.TrackOpens = TrackOpens;
        this.TrackLinks = TrackLinks;
        this.Headers = Headers;
        this.Attachments = Attachments;
        this.Metadata = Metadata;
    }

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
};

export interface MessageSendingResponse extends DefaultResponse {
    To?: string;
    Cc?: string;
    Bcc?: string;
    SubmittedAt: string;
    MessageID: string;
};

