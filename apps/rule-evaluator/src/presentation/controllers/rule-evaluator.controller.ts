import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { RuleEvaluatorDto } from '../../application/dtos/rule-evaluator.dto';
import { IRuleEvaluatorUseCase } from '../../application/interfaces/inbound/rule-evaluator.usecase.interface';

@Controller('rule-evaluator')
export class RuleEvaluatorController {
  constructor(
	@Inject('IRuleEvaluatorUseCase')
	private readonly useCase: IRuleEvaluatorUseCase
  ) {}

  @Get()
  async hello(@Body() dto: RuleEvaluatorDto) {
    return await this.useCase.hello();
  }

  @Post('execute')
  async execute(@Body() dto: RuleEvaluatorDto) {
    return await this.useCase.execute(dto);
  }
}

