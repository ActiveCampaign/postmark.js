import { LinkTrackingOptions } from "../message/SupportingTypes";

export interface Server {
    ID: number;
    Name: string;
    ApiTokens: string[];
    ServerLink: string;
    Color: string;
    SmtpApiActivated: boolean;
    RawEmailEnabled: boolean;
    InboundAddress: string;
    InboundHookUrl?: string;
    BounceHookUrl?: string;
    OpenHookUrl?: string;
    DeliveryHookUrl?: string;
    ClickHookUrl?: string;
    PostFirstOpenOnly: boolean;
    InboundDomain?: string;
    InboundHash: string;
    InboundSpamThreshold: number;
    TrackOpens?: boolean;
    TrackLinks: LinkTrackingOptions;
    IncludeBounceContentInHook: boolean;
    EnableSmtpApiErrorHooks: boolean;
}

export class ServerOptions {

    constructor(Name?: string, Color?: string, SmtpApiActivated?: boolean, RawEmailEnabled?: boolean,
                InboundHookUrl?: string, BounceHookUrl?: string, OpenHookUrl?: string, DeliveryHookUrl?: string,
                ClickHookUrl?: string, PostFirstOpenOnly?: boolean, InboundSpamThreshold?: number, TrackOpens?: boolean,
                TrackLinks?: LinkTrackingOptions, IncludeBounceContentInHook?: boolean, EnableSmtpApiErrorHooks?: boolean) {

        this.Name = Name;
        this.Color = Color;
        this.SmtpApiActivated = SmtpApiActivated;
        this.RawEmailEnabled = RawEmailEnabled;
        this.InboundHookUrl = InboundHookUrl;
        this.BounceHookUrl = BounceHookUrl;
        this.OpenHookUrl = OpenHookUrl;
        this.DeliveryHookUrl = DeliveryHookUrl;
        this.ClickHookUrl = ClickHookUrl;
        this.PostFirstOpenOnly = PostFirstOpenOnly;
        this.InboundSpamThreshold = InboundSpamThreshold;
        this.TrackOpens = TrackOpens;
        this.TrackLinks = TrackLinks;
        this.IncludeBounceContentInHook = IncludeBounceContentInHook;
        this.EnableSmtpApiErrorHooks = EnableSmtpApiErrorHooks;
    }

    Name?: string;
    Color?: string;
    SmtpApiActivated?: boolean;
    RawEmailEnabled?: boolean;
    InboundHookUrl?: string;
    BounceHookUrl?: string;
    OpenHookUrl?: string;
    DeliveryHookUrl?: string;
    ClickHookUrl?: string;
    PostFirstOpenOnly?: boolean;
    InboundSpamThreshold?: number;
    TrackOpens?: boolean;
    TrackLinks?: LinkTrackingOptions;
    IncludeBounceContentInHook?: boolean;
    EnableSmtpApiErrorHooks?: boolean;
}

export class ServerToCreate extends ServerOptions {
    constructor(Name: string, Color?: string, SmtpApiActivated?: boolean, RawEmailEnabled?: boolean,
                InboundHookUrl?: string, BounceHookUrl?: string, OpenHookUrl?: string, DeliveryHookUrl?: string,
                ClickHookUrl?: string, PostFirstOpenOnly?: boolean, InboundSpamThreshold?: number, TrackOpens?: boolean,
                TrackLinks?: LinkTrackingOptions, IncludeBounceContentInHook?: boolean, EnableSmtpApiErrorHooks?: boolean) {

       super(Name, Color, SmtpApiActivated, RawEmailEnabled, InboundHookUrl, BounceHookUrl, OpenHookUrl,
           DeliveryHookUrl, ClickHookUrl, PostFirstOpenOnly, InboundSpamThreshold, TrackOpens, TrackLinks,
           IncludeBounceContentInHook, EnableSmtpApiErrorHooks);
    }
}