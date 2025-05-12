import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { RuleRepository } from './rule/rule.repository';
import { Rule } from './rule/entities/rule.entity';
import { RuleEvaluatorController } from './rule-evaluator.controller';
import { RuleService } from './rule/rule.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Rule])
  ],
  controllers: [RuleEvaluatorController],
  providers: [RuleService, RuleRepository],
})
export class RuleEvaluatorModule {}
