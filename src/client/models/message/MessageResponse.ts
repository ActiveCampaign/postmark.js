import BaseMessageResponse from "./BaseMessageResponse";

export default interface MessageResponse extends BaseMessageResponse {

    To: string;
    Cc: string;
    Bcc: string;
    SubmittedAt: string;
    MessageId: string;
}
