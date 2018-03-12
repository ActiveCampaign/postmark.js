import { LinkTrackingOptions } from "./SupportingTypes";

export default interface Server
{
    ID: number
    Name: string
    ApiTokens: string[]
    ServerLink: string,
    Color: string,
    SmtpApiActivated: boolean,
    RawEmailEnabled: boolean,
    InboundAddress: string,
    InboundHookUrl?: string,
    BounceHookUrl?: string,
    OpenHookUrl?: string,
    DeliveryHookUrl?: string,
    PostFirstOpenOnly:boolean,
    InboundDomain?:string,
    InboundHash:string,
    InboundSpamThreshold: number,
    TrackOpens?:boolean,
    TrackLinks: LinkTrackingOptions,
    IncludeBounceContentInHook: boolean,
    ClickHookUrl?:string,
    EnableSmtpApiErrorHooks: boolean
}