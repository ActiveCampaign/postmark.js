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

export class UpdateServerRequest {

    public Name?: string;
    public Color?: string;
    public SmtpApiActivated?: boolean;
    public RawEmailEnabled?: boolean;
    public InboundHookUrl?: string;
    public BounceHookUrl?: string;
    public OpenHookUrl?: string;
    public DeliveryHookUrl?: string;
    public ClickHookUrl?: string;
    public PostFirstOpenOnly?: boolean;
    public InboundSpamThreshold?: number;
    public TrackOpens?: boolean;
    public TrackLinks?: LinkTrackingOptions;
    public IncludeBounceContentInHook?: boolean;
    public EnableSmtpApiErrorHooks?: boolean;

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
}

export class CreateServerRequest extends UpdateServerRequest {
    constructor(Name: string, Color?: string, SmtpApiActivated?: boolean, RawEmailEnabled?: boolean,
                InboundHookUrl?: string, BounceHookUrl?: string, OpenHookUrl?: string, DeliveryHookUrl?: string,
                ClickHookUrl?: string, PostFirstOpenOnly?: boolean, InboundSpamThreshold?: number, TrackOpens?: boolean,
                TrackLinks?: LinkTrackingOptions, IncludeBounceContentInHook?: boolean, EnableSmtpApiErrorHooks?: boolean) {

        super(Name, Color, SmtpApiActivated, RawEmailEnabled, InboundHookUrl, BounceHookUrl, OpenHookUrl,
            DeliveryHookUrl, ClickHookUrl, PostFirstOpenOnly, InboundSpamThreshold, TrackOpens, TrackLinks,
            IncludeBounceContentInHook, EnableSmtpApiErrorHooks);
    }
}
