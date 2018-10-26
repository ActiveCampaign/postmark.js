export interface OutboundStatistics {
    Sent: number;
    Bounced: number;
    SMTPApiErrors: number;
    BounceRate: number;
    SpamComplaints: number;
    SpamComplaintsRate: number;
    Opens: number;
    UniqueOpens: number;
    Tracked: number;
    WithLinkTracking: number;
    WithOpenTracking: number;
    TotalTrackedLinksSent: number;
    UniqueLinksClicked: number;
    TotalClicks: number;
    WithClientRecorded: number;
    WithPlatformRecorded: number;
    WithReadTimeRecorded: number;
}

export interface SentCounts {
    Days: [{
        Date: string;
        Sent: number;
    }];
    Sent: number;
}

export interface BounceCounts {
    [key: string]: any;
}

export interface SpamCounts {
    Days: [{
        Date: string;
        SpamComplaint: number;
    }];
    SpamComplaint: number;
}

export interface TrackedEmailCounts {
    Days: [{
        Date: string;
        Tracked: number;
    }];
    Tracked: number;
}

export interface OpenCounts {
    Days: [{
        Date: string;
        Opens: number;
        Unique: number;
    }];
    Opens: number;
    Unique: number;
}


export interface EmailPlaformUsageCounts {
    Days: [{
        Date: string;
        Desktop?: number;
        WebMail?: number;
        Mobile?: number;
        Unknown?: number;
    }];
    Desktop?: number;
    WebMail?: number;
    Mobile?: number;
    Unknown?: number;
}

export interface EmailClientUsageCounts {
    Days: [{
        Date: string;
        [key: string]: any;
    }]
    [key: string]: any;
}

export interface EmailReadTimesCounts extends EmailClientUsageCounts { }

export interface ClickCounts {
    Days: [{
        Date: string;
        Clicks: number;
        Unique: number;
    }];
    Clicks: number;
    Unique: number;
}

export interface BrowserUsageCounts extends EmailClientUsageCounts { }

export interface ClickPlaformUsageCounts {
    Days: [{
        Date: string;
        Desktop: number;
        Mobile: number;
        Unknown: number;
    }];
    Desktop: number;
    Mobile: number;
    Unknown: number;
}

export interface ClickLocationCounts {
    Days: [{
        Date: string;
        HTML: number;
        Text: number;
    }];
    HTML: number;
    Text: number;
}