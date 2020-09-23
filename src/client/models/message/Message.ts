import { DefaultResponse } from "../client/DefaultResponse";
import { Hash } from "../client/SupportingTypes";
import { Attachment, Header, LinkTrackingOptions } from "../message/SupportingTypes";

export class Message {

    public From: string;
    public To?: string;
    public Cc?: string;
    public Bcc?: string;
    public MessageStream?: string;
    public Subject: string;
    public ReplyTo?: string;
    public HtmlBody?: string;
    public TextBody?: string;
    public Tag?: string;
    public TrackOpens?: boolean;
    public TrackLinks?: LinkTrackingOptions;
    public Headers?: Header[];
    public Attachments?: Attachment[];
    public Metadata?: Hash<string>;
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
}

export interface MessageSendingResponse extends DefaultResponse {
    To?: string;
    Cc?: string;
    Bcc?: string;
    SubmittedAt: string;
    MessageID?: string;
}
