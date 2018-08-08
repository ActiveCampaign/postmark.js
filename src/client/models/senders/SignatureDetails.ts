import DomainDetails from "../domains/DomainDetails";

export default interface SignatureDetails extends DomainDetails {
    domain: string
    emailAddress: string
    ReplyToEmailAddress: string
    Confirmed: boolean
}
