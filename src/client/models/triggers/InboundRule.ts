export class InboundRuleToCreate {
    constructor(Rule: string) {
        this.Rule = Rule;
    }

    Rule: string;
}

export interface InboundRule extends InboundRuleToCreate {
    ID: number;
}

export interface InboundRules {
    TotalCount: number;
    InboundRules: InboundRule[];
}