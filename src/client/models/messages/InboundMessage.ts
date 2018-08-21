import {Attachment, Header} from "../message/SupportingTypes";
import {Recipient} from "./OutboundMessage";

export interface InboundRecipient extends Recipient{
    MailboxHash: string
}

export interface InboundMessage {
    From: string;
    FromName: string;
    FromFull: InboundRecipient;
    To: string;
    ToFull: InboundRecipient[];
    Cc: string;
    CcFull: InboundRecipient[];
    Bcc: string;
    BccFull: InboundRecipient[];
    ReplyTo: string;
    OriginalRecipient:string;
    Subject: string;
    Date: string;
    MailboxHash: string;
    Tag?: string;
    MessageID: string;
    Status: string
    Attachments: Attachment[];
}

export interface InboundMessageDetails extends InboundMessage{
    TextBody: string;
    HtmlBody: string;
    StrippedTextReply: string;
    Headers: Header[]
    BlockedReason: string;
}

export interface InboundMessages {
    TotalCount: string;
    InboundMessages: InboundMessage[];
}