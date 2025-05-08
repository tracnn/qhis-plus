export interface Rule {
  name: string;
  conditions: any;
  event: {
    type: string;
    params?: any;
  };
}

export interface RuleResult {
  events: Array<{
    type: string;
    params?: any;
  }>;
}

export interface IRuleEvaluator {
  addRule(rule: Rule): void;
  evaluate(facts: any): Promise<RuleResult>;
  removeRule(ruleName: string): void;
  clearRules(): void;
} 