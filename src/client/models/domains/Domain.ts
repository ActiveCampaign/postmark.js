export default interface Domain {
    ID: number
    Name: string
    SpfVerified: boolean
    DKIMVerified: boolean
    WeakDKIM: boolean
    ReturnPathDomainVerified: boolean
}