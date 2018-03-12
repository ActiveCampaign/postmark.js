export interface BounceInfo{
    ID: number
    Type: string
    TypeCode: number
    Name: string
    Tag: string
    MessageID: string
    ServerID: string
    Description: string
    Details: string
    Email: string
    From: string
    BouncedAt:  string
    DumpAvailable: boolean
    Inactive: boolean
    CanActivate: boolean
    Subject: string
}

export default interface BounceListingResponse {
    TotalCount: number
    Bounces: BounceInfo[]
}