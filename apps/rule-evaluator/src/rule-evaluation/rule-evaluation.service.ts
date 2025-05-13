import { Injectable } from '@nestjs/common';
import { RuleRepository } from '../rule/rule.repository';
import { Engine } from 'json-rules-engine';
import { EvaluateRuleDto } from './dtos/evaluate-rule.dto';
import { medicalCustomOperators } from './custom-operators/medical-custom-operators';

@Injectable()
export class RuleEvaluationService {
    constructor(private readonly ruleRepository: RuleRepository) {}

    async evaluate(evaluateDto: EvaluateRuleDto): Promise<any> {
        const { facts, ruleGroup } = evaluateDto;
        //Ignore undefined facts
        const engine = new Engine(undefined, { allowUndefinedFacts: true });

        // Get all custom operators
        Object.entries(medicalCustomOperators).forEach(([operatorName, evaluator]) => {
            engine.addOperator(operatorName, evaluator);
        });

        // Build where condition for rules
        const whereCondition: any = { is_active: true };
        if (ruleGroup) {
            whereCondition.rule_group = ruleGroup;
        }
        
        // Get all rules or filter by is_active and rule_group
        const rules = await this.ruleRepository.find({ where: whereCondition });

        // Add rules to engine
        for (const rule of rules) {
            try {
                engine.addRule({
                    conditions: rule.conditions,
                    event: {
                        type: rule.event_type,
                        params: {
                            ruleCode: rule.rule_code,
                            ruleName: rule.rule_name,
                            ruleGroup: rule.rule_group,
                            message: rule.message
                        }
                    }
                });
            } catch (error) {
                console.error(`Error parsing rule conditions for rule ${rule.rule_code}:`, error);
            }
        }

        // Run rules
        const results = await engine.run(facts);
        
        //Get triggered rules
        const triggeredRules = results.events.map(event => ({
            ruleCode: event.params?.ruleCode || '',
            ruleName: event.params?.ruleName || '',
            ruleGroup: event.params?.ruleGroup || '',
            eventType: event.type,
            message: event.params?.message || ''
        }));

        // Calculate summary of eventType
        const eventTypeSummary = this.calculateEventTypeSummary(triggeredRules);

        return { 
            eventTypeSummary,
            triggeredRules 
        };
    }

    // Phương thức tính tổng số theo eventType
    private calculateEventTypeSummary(triggeredRules: Array<{ eventType: string }>): Record<string, number> {
        const summary: Record<string, number> = {};

        triggeredRules.forEach(rule => {
            const type = rule.eventType;
            if (summary[type]) {
                summary[type]++;
            } else {
                summary[type] = 1;
            }
        });

        return summary;
    }
} 