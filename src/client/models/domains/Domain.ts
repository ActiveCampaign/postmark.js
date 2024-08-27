export class CreateDomainRequest {
    public Name: string;
    public ReturnPathDomain?: string;
    public CustomTrackingDomain?: string;
    constructor(Name: string, ReturnPathDomain?: string, CustomTrackingDomain?: string) {
        this.Name = Name;
        this.ReturnPathDomain = ReturnPathDomain;
        this.CustomTrackingDomain = CustomTrackingDomain;
    }
}

export class UpdateDomainRequest {
    public ReturnPathDomain?: string;
    public CustomTrackingDomain?: string;
    constructor(ReturnPathDomain: string, CustomTrackingDomain?: string) {
        this.ReturnPathDomain = ReturnPathDomain;
        this.CustomTrackingDomain = CustomTrackingDomain;
    }
}

export interface Domain {
    ID: number;
    Name: string;
    SPFVerified: boolean;
    DKIMVerified: boolean;
    WeakDKIM: boolean;
    ReturnPathDomainVerified: boolean;
    CustomTrackingVerified: boolean;
}

export interface DomainDetails extends Domain {
    SPFHost: string;
    SPFTextValue: string;
    DKIMHost: string;
    DKIMTextValue: string;
    DKIMPendingHost: string;
    DKIMPendingTextValue: string;
    DKIMRevokedHost: string;
    DKIMRevokedTextValue: string;
    SafeToRemoveRevokedKeyFromDNS: boolean;
    DKIMUpdateStatus: string;
    ReturnPathDomain: string;
    ReturnPathDomainCNAMEValue: string;
    CustomTrackingDomain: string;
    CustomTrackingDomainCNAMEValue: string;
}

export interface Domains {
    TotalCount: number;
    Domains: Domain[];
}
