import { Controller, Post, Body } from '@nestjs/common';
import { RuleEvaluationService } from './rule-evaluation.service';
import { EvaluateRuleDto } from './dtos/evaluate-rule.dto';
@Controller('rule-evaluation')
export class RuleEvaluationController {
    constructor(private readonly ruleEvaluationService: RuleEvaluationService) {}

    @Post('evaluate')
    async evaluate(@Body() evaluateDto: EvaluateRuleDto): Promise<any> {
        return this.ruleEvaluationService.evaluate(evaluateDto);
    }
} 