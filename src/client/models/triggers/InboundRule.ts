export interface InboundRuleOptions {
    Rule: string;
}

export interface InboundRule extends InboundRuleOptions {
    ID: number;
}

export interface InboundRules {
    TotalCount: number;
    InboundRules: InboundRule[];
}