import DefaultResponse from "../client/PostmarkResponse";

export default interface MessageResponse extends DefaultResponse {
    To: string;
    Cc: string;
    Bcc: string;
    SubmittedAt: string;
    MessageID: string;
}
