export class CreateInboundRuleRequest {
    constructor(Rule: string) {
        this.Rule = Rule;
    }
    Rule: string;
}

export interface InboundRule {
    Rule: string;
    ID: number;
}

export interface InboundRules {
    TotalCount: number;
    InboundRules: InboundRule[];
}