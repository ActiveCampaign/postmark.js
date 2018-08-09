import { LinkTrackingOptions, Header, Attachment } from "../message/SupportingTypes";

export default interface BaseMessage {
    From: string
    To?: string
    Cc?: string
    Bcc?: string
    Subject: string
    ReplyTo?: string
    HtmlBody?: string
    TextBody?: string
    Tag?: string
    TrackOpens?: boolean,
    TrackLinks?: LinkTrackingOptions,
    Headers?: Header[]
    Attachments?: Attachment[]
}
