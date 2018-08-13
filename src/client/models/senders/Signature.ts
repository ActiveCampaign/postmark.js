import DomainDetails from "../domains/DomainDetails";

export default interface Signature {
    ID: number
    Name: string
    Confirmed: boolean
    Domain: string
    EmailAddress: string
    ReplyToEmailAddress: string
}

export interface SignatureDetails extends DomainDetails {
    Domain: string
    EmailAddress: string
    ReplyToEmailAddress: string
    Confirmed: boolean
}

export interface Signatures {
    TotalCount: number;
    SenderSignatures: Signature[];
}

export interface BaseSignatureOptions {
    Name?: string
    ReplyToEmail?: string
    ReturnPathDomain?: string
}

export interface SignatureOptions extends BaseSignatureOptions{
    FromEmail: string
}

