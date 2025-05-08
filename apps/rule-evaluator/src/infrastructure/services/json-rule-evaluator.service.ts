import { Injectable, Logger } from '@nestjs/common';
import { Engine } from 'json-rules-engine';
import { IRuleEvaluator, Rule, RuleResult } from '../../domain/interfaces/rule-evaluator.interface';

@Injectable()
export class JsonRuleEvaluatorService implements IRuleEvaluator {
  private readonly logger = new Logger(JsonRuleEvaluatorService.name);
  private engine: Engine;

  constructor() {
    this.engine = new Engine();
  }

  addRule(rule: Rule): void {
    try {
      this.engine.addRule({
        name: rule.name,
        conditions: rule.conditions,
        event: rule.event
      });
      this.logger.debug(`Added rule: ${rule.name}`);
    } catch (error) {
      this.logger.error(`Failed to add rule: ${error.message}`);
      throw error;
    }
  }

  async evaluate(facts: any): Promise<RuleResult> {
    try {
      const results = await this.engine.run(facts);
      return {
        events: results.events
      };
    } catch (error) {
      this.logger.error(`Failed to evaluate rules: ${error.message}`);
      throw error;
    }
  }

  removeRule(ruleName: string): void {
    try {
      this.engine.removeRule(ruleName);
      this.logger.debug(`Removed rule: ${ruleName}`);
    } catch (error) {
      this.logger.error(`Failed to remove rule: ${error.message}`);
      throw error;
    }
  }

  clearRules(): void {
    try {
      this.engine = new Engine();
      this.logger.debug('Cleared all rules');
    } catch (error) {
      this.logger.error(`Failed to clear rules: ${error.message}`);
      throw error;
    }
  }
} 