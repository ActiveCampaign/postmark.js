export interface Bounce {
    RecordType: "Bounce";
    ID: number;
    Type: string;
    TypeCode: number;
    Name: string;
    Tag?: string;
    MessageID: string;
    ServerID: number;
    Description: string;
    Details: string;
    Email: string;
    From: string;
    BouncedAt: string;
    DumpAvailable: boolean;
    Inactive: boolean;
    CanActivate: boolean;
    Subject: string;
    Content?: string;
    MessageStream: string;
}

export enum BounceType {
    HardBounce = "HardBounce",
    Transient = "Transient",
    Unsubscribe = "Unsubscribe",
    Subscribe = "Subscribe",
    AutoResponder = "AutoResponder",
    AddressChange = "AddressChange",
    DnsError = "DnsError",
    SpamNotification = "SpamNotification",
    OpenRelayTest = "OpenRelayTest",
    Unknown = "Unknown",
    SoftBounce = "SoftBounce",
    VirusNotification = "VirusNotification",
    ChallengeVerification = "ChallengeVerification",
    BadEmailAddress = "BadEmailAddress",
    SpamComplaint = "SpamComplaint",
    ManuallyDeactivated = "ManuallyDeactivated",
    Unconfirmed = "Unconfirmed",
    Blocked = "Blocked",
    SMTPApiError = "SMTPApiError",
    InboundError = "InboundError",
    DMARCPolicy = "DMARCPolicy",
    TemplateRenderingFailed = "TemplateRenderingFailed",
}

export enum BounceTypeCode {
    HardBounce = 1,
    Transient = 2,
    Unsubscribe = 16,
    Subscribe = 32,
    AutoResponder = 64,
    AddressChange = 128,
    DnsError = 256,
    SpamNotification = 512,
    OpenRelayTest = 1024,
    Unknown = 2048,
    SoftBounce = 4096,
    VirusNotification = 8192,
    ChallengeVerification = 16384,
    BadEmailAddress = 100000,
    SpamComplaint = 100001,
    ManuallyDeactivated = 100002,
    Unconfirmed = 100003,
    Blocked = 100006,
    SMTPApiError = 100007,
    InboundError = 100008,
    DMARCPolicy = 100009,
    TemplateRenderingFailed = 100010,
}

export interface BounceDump {
    Body: string;
}

export interface BounceActivationResponse {
    Message: string;
    Bounce: Bounce;
}

export interface Bounces {
    TotalCount: number;
    Bounces: Bounce[];
}

export interface BounceMetric {
    Name: string;
    Count: number;
    Type?: string;
}

export interface DeliveryStatistics {
    InactiveMails: number;
    Bounces: BounceMetric[];
}
