export class CreateDomainRequest {

    public Name: string;
    public ReturnPathDomain?: string;
    constructor(Name: string, ReturnPathDomain?: string) {
        this.Name = Name;
        this.ReturnPathDomain = ReturnPathDomain;
    }
}

export class UpdateDomainRequest {
    public ReturnPathDomain?: string;
    constructor(ReturnPathDomain: string) {
        this.ReturnPathDomain = ReturnPathDomain;
    }
}

export interface Domain {
    ID: number;
    Name: string;
    SpfVerified: boolean;
    DKIMVerified: boolean;
    WeakDKIM: boolean;
    ReturnPathDomainVerified: boolean;
}

export interface DomainDetails extends Domain {
    SpfHost: string;
    SpfTextValue: string;
    DKIMHost: string;
    DKIMTextValue: string;
    DKIMPendingHost: string;
    DKIMPendingTextValue: string;
    DKIMRevokedHost: string;
    DKIMRevokedTextValue: string;
    SafeToRemoveRevokedKeyFromDNS: string;
    DKIMUpdateStatus: string;
    ReturnPathDomain: string;
    ReturnPathDomainCNAMEValue: string;
}

export interface Domains {
    TotalCount: number;
    Domains: Domain[];
}
