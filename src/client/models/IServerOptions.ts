import { LinkTrackingOptions } from "./SupportingTypes";

export default interface IServerOptions{
    Name?: string
    Color: string,
    SmtpApiActivated: boolean
    RawEmailEnabled: boolean
    DeliveryHookUrl?: string
    InboundHookUrl?: string
    BounceHookUrl?: string
    IncludeBounceContentInHook: boolean
    OpenHookUrl?:  string
    PostFirstOpenOnly: boolean
    TrackOpens: boolean
    TrackLinks?: LinkTrackingOptions
    ClickHookUrl?: string
    InboundDomain?: string 
    InboundSpamThreshold: number
}