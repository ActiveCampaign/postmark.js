import { LinkTrackingOptions, Header, Attachment } from "./SupportingTypes";

export default interface PostmarkMessage {
    From: string
    To?: string
    Cc?: string
    Bcc?:string 
    Subject?:string
    Tag?: string
    HtmlBody?: string
    TextBody?:string
    ReplyTo?: string
    Headers?: Header[],
    TrackOpens?: boolean,
    TrackLinks?: LinkTrackingOptions,
    Attachments?: Attachment[]
}