export class CreateInboundRuleRequest {
    public Rule: string;
    constructor(Rule: string) {
        this.Rule = Rule;
    }
}

export interface InboundRule {
    Rule: string;
    ID: number;
}

export interface InboundRules {
    TotalCount: number;
    InboundRules: InboundRule[];
}
