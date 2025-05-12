import { Injectable } from '@nestjs/common';
import { RuleRepository } from '../rule/rule.repository';
import { Engine } from 'json-rules-engine';
import { EvaluateRuleDto } from './dtos/evaluate-rule.dto';

@Injectable()
export class RuleEvaluationService {
    constructor(private readonly ruleRepository: RuleRepository) {}

    async evaluateRules(evaluateDto: EvaluateRuleDto): Promise<{ 
        triggeredRules: Array<{
            ruleCode: string;
            ruleName: string;
            eventType: string;
            message: string;
        }>;
    }> {
        const { facts, options } = evaluateDto;
        const engine = new Engine();

        // Get all rules or filter by rule group
        const rules = await this.ruleRepository.find({
            where: options?.ruleGroup ? { rule_group: options.ruleGroup } : {}
        });

        // Add rules to engine
        for (const rule of rules) {
            try {
                const condition = JSON.parse(rule.condition);
                engine.addRule({
                    conditions: condition,
                    event: {
                        type: rule.event_type,
                        params: {
                            ruleCode: rule.rule_code,
                            ruleName: rule.rule_name,
                            message: rule.message
                        }
                    }
                });
            } catch (error) {
                console.error(`Error parsing rule condition for rule ${rule.rule_code}:`, error);
            }
        }

        // Run rules
        const results = await engine.run(facts);
        const triggeredRules = results.events.map(event => ({
            ruleCode: event.params?.ruleCode || '',
            ruleName: event.params?.ruleName || '',
            eventType: event.type,
            message: event.params?.message || ''
        }));

        return { triggeredRules };
    }
} 