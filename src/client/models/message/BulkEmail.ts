import { Hash } from "../client/SupportingTypes";
import { Attachment, Header, LinkTrackingOptions } from "./SupportingTypes";

/**
 * A single recipient entry in a Bulk Email request.
 *
 * Message content (subject, body or template) is defined once on the
 * {@link BulkEmailRequest}; each BulkEmailMessage supplies the recipient(s) and
 * any per-recipient personalization via the TemplateModel.
 */
export class BulkEmailMessage {
    public To: string;
    public Cc?: string;
    public Bcc?: string;
    public TemplateModel?: object;
    public Metadata?: Hash<string>;
    public Headers?: Header[];

    constructor(To: string, TemplateModel?: object, Cc?: string, Bcc?: string,
                Metadata?: Hash<string>, Headers?: Header[]) {
        this.To = To;
        this.TemplateModel = TemplateModel;
        this.Cc = Cc;
        this.Bcc = Bcc;
        this.Metadata = Metadata;
        this.Headers = Headers;
    }
}

/**
 * A Bulk Email request (POST /email/bulk).
 *
 * The Bulk API is intended for broadcast sends (newsletters, announcements,
 * marketing campaigns) and is distinct from the transactional batch endpoints.
 * Shared message content - or a hosted template - is defined once, together with
 * the list of recipients to send it to. Postmark manages the send-rate optimization
 * for deliverability and returns a request ID that can be polled with
 * getBulkEmailStatus().
 */
export class BulkEmailRequest {
    public From: string;
    public Messages: BulkEmailMessage[];
    public ReplyTo?: string;
    public Subject?: string;
    public HtmlBody?: string;
    public TextBody?: string;
    public TemplateId?: number;
    public TemplateAlias?: string;
    public InlineCss?: boolean;
    public Tag?: string;
    public Metadata?: Hash<string>;
    public MessageStream?: string;
    public TrackOpens?: boolean;
    public TrackLinks?: LinkTrackingOptions;
    public Attachments?: Attachment[];
    public Headers?: Header[];

    constructor(From: string, Messages: BulkEmailMessage[], Subject?: string,
                HtmlBody?: string, TextBody?: string, TemplateId?: number,
                TemplateAlias?: string, ReplyTo?: string, Tag?: string,
                TrackOpens?: boolean, TrackLinks?: LinkTrackingOptions,
                Headers?: Header[], Attachments?: Attachment[], Metadata?: Hash<string>,
                MessageStream?: string, InlineCss?: boolean) {
        this.From = From;
        this.Messages = Messages;
        this.Subject = Subject;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.TemplateId = TemplateId;
        this.TemplateAlias = TemplateAlias;
        this.ReplyTo = ReplyTo;
        this.Tag = Tag;
        this.TrackOpens = TrackOpens;
        this.TrackLinks = TrackLinks;
        this.Headers = Headers;
        this.Attachments = Attachments;
        this.Metadata = Metadata;
        this.MessageStream = MessageStream;
        this.InlineCss = InlineCss;
    }
}

/**
 * Possible states of a Bulk Email request.
 *
 * A submitted request reports "Accepted" or "Failed"; while Postmark is delivering
 * the messages the request progresses through "Processing" to "Completed".
 */
export enum BulkEmailStatus {
    Accepted = "Accepted",
    Processing = "Processing",
    Completed = "Completed",
    Failed = "Failed",
}

/**
 * Response returned when submitting a Bulk Email request (POST /email/bulk).
 */
export interface BulkEmailSendingResponse {
    Id: string;
    Status: BulkEmailStatus;
    SubmittedAt: string;
}

/**
 * Progress and details of a previously submitted Bulk Email request
 * (GET /email/bulk/{bulk-request-id}).
 */
export interface BulkEmailStatusResponse {
    Id: string;
    Status: BulkEmailStatus;
    SubmittedAt: string;
    TotalMessages: number;
    PercentageCompleted: number;
    Subject: string;
}
