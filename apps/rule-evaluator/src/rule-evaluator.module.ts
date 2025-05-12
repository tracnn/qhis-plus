import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { RuleRepository } from './rule/rule.repository';
import { Rule } from './rule/entities/rule.entity';
import { RuleEvaluatorController } from './rule-evaluator.controller';
import { RuleService } from './rule/rule.service';
import { RuleEvaluationModule } from './rule-evaluation/rule-evaluation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Rule]),
    RuleEvaluationModule
  ],
  controllers: [RuleEvaluatorController],
  providers: [RuleService, RuleRepository],
})
export class RuleEvaluatorModule {}
