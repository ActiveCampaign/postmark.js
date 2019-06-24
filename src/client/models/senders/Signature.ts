import { DomainDetails } from "../domains/Domain";

export interface Signature {
    ID: number;
    Name: string;
    Confirmed: boolean;
    Domain: string;
    EmailAddress: string;
    ReplyToEmailAddress: string;
}

export interface SignatureDetails extends DomainDetails {
    Domain: string;
    EmailAddress: string;
    ReplyToEmailAddress: string;
    Confirmed: boolean;
}

export interface Signatures {
    TotalCount: number;
    SenderSignatures: Signature[];
}

export class UpdateSignatureRequest {

    public Name?: string;
    public ReplyToEmail?: string;
    public ReturnPathDomain?: string;
    constructor(Name?: string, ReplyToEmail?: string, ReturnPathDomain?: string) {
        this.Name = Name;
        this.ReplyToEmail = ReplyToEmail;
        this.ReturnPathDomain = ReturnPathDomain;
    }
}

export class CreateSignatureRequest {

    public Name?: string;
    public FromEmail: string;
    public ReplyToEmail?: string;
    public ReturnPathDomain?: string;
    constructor(name: string, fromEmail: string, replyToEmail?: string, returnPathDomain?: string) {
        this.Name = name;
        this.ReplyToEmail = replyToEmail;
        this.ReturnPathDomain = returnPathDomain;
        this.FromEmail = fromEmail;
    }
}
