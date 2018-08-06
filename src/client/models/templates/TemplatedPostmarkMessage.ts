import { LinkTrackingOptions, Header, Attachment } from "../SupportingTypes";

export default interface TemplatedPostmarkMessage {
    From: string
    To?: string
    Cc?: string
    Bcc?:string 
    Tag?: string
    ReplyTo?: string
    Headers?: Header[],
    TrackOpens?: boolean,
    TrackLinks?: LinkTrackingOptions,
    Attachments?: Attachment[]
    TemplateID?: number
    TemplateAlias?: string
}