import { Controller, Post, Body } from '@nestjs/common';
import { RuleEvaluationService } from './rule-evaluation.service';
import { EvaluateRuleDto } from './dtos/evaluate-rule.dto';

@Controller('rule-evaluation')
export class RuleEvaluationController {
    constructor(private readonly ruleEvaluationService: RuleEvaluationService) {}

    @Post('evaluate')
    async evaluateRules(@Body() evaluateDto: EvaluateRuleDto) {
        return this.ruleEvaluationService.evaluateRules(evaluateDto);
    }
} 