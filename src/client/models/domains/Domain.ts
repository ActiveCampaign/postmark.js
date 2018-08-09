export default interface Domain {
    ID: number
    Name: string
    SpfVerified: boolean
    DKIMVerified: boolean
    WeakDKIM: boolean
    ReturnPathDomainVerified: boolean
}

export interface DomainOptions {
    Name: string,
    ReturnPathDomain?: string
}