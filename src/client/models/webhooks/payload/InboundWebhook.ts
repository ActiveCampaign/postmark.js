import {InboundRecipient} from "../../messages/InboundMessage";
import {Attachment, Header} from "../../message/SupportingTypes";

export interface InboundWebhook {
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
    OriginalRecipient: string;
    Subject: string;
    Date: string;
    MailboxHash: string;
    Tag?: string;
    MessageID: string;
    MessageStream: string;
    RawEmail?: string;
    TextBody: string;
    HtmlBody: string;
    StrippedTextReply: string;
    Headers: Header[];
    Attachments: Attachment[];
}