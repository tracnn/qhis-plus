import { Controller, Get, Post, Req, Body, Patch, Param } from '@nestjs/common';
import { RuleEvaluatorService } from './rule-evaluator.service';
import { Rule } from './rule/entities/rule.entity';
import { RuleService } from './rule/rule.service';
import { RuleDto } from './rule/dtos/rule.dto';

@Controller('rules')
export class RuleEvaluatorController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  getRules(): Promise<Rule[]> {
    return this.ruleService.findAll();
  }

  @Get('hello')
  hello(): Promise<string> {
    return this.ruleService.Hello();
  }

  @Post()
  createRule(@Body() ruleData: RuleDto): Promise<Rule> {
    return this.ruleService.create(ruleData);
  }
  
  @Patch(':id')
  updateRule(@Param('id') id: number, @Body() ruleData: RuleDto): Promise<Rule> {
    return this.ruleService.update(id, ruleData);
  }
}
