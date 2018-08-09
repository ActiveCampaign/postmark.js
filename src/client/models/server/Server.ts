import { LinkTrackingOptions } from "../message/SupportingTypes";

export default interface Server {
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
    ClickHookUrl?: string,
    PostFirstOpenOnly: boolean,
    InboundDomain?: string,
    InboundHash: string,
    InboundSpamThreshold: number,
    TrackOpens?: boolean,
    TrackLinks: LinkTrackingOptions,
    IncludeBounceContentInHook: boolean,
    EnableSmtpApiErrorHooks: boolean
}

export interface ServerOptions {
    Name?: string
    Color?: string,
    SmtpApiActivated?: boolean,
    RawEmailEnabled?: boolean,
    InboundHookUrl?: string,
    BounceHookUrl?: string,
    OpenHookUrl?: string,
    DeliveryHookUrl?: string,
    ClickHookUrl?: string,
    PostFirstOpenOnly?: boolean,
    InboundSpamThreshold?: number,
    TrackOpens?: boolean,
    TrackLinks?: LinkTrackingOptions,
    IncludeBounceContentInHook?: boolean,
    EnableSmtpApiErrorHooks?: boolean
}