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
    ConfirmationPersonalNote: string;
}

export interface Signatures {
    TotalCount: number;
    SenderSignatures: Signature[];
}

export class UpdateSignatureRequest {
    public Name?: string;
    public ReplyToEmail?: string;
    public ReturnPathDomain?: string;
    public ConfirmationPersonalNote?: string;
    constructor(Name?: string, ReplyToEmail?: string, ReturnPathDomain?: string, ConfirmationPersonalNote?: string) {
        this.Name = Name;
        this.ReplyToEmail = ReplyToEmail;
        this.ReturnPathDomain = ReturnPathDomain;
        this.ConfirmationPersonalNote = ConfirmationPersonalNote;
    }
}

export class CreateSignatureRequest {
    public Name: string;
    public FromEmail: string;
    public ReplyToEmail?: string;
    public ReturnPathDomain?: string;
    public ConfirmationPersonalNote?: string;
    constructor(Name: string, FromEmail: string, ReplyToEmail?: string, ReturnPathDomain?: string, ConfirmationPersonalNote?: string) {
        this.Name = Name;
        this.ReplyToEmail = ReplyToEmail;
        this.ReturnPathDomain = ReturnPathDomain;
        this.FromEmail = FromEmail;
        this.ConfirmationPersonalNote = ConfirmationPersonalNote;
    }
}
