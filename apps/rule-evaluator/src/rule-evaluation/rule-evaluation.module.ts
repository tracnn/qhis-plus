import { Module } from '@nestjs/common';
import { RuleEvaluationController } from './rule-evaluation.controller';
import { RuleEvaluationService } from './rule-evaluation.service';
import { RuleRepository } from '../rule/rule.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from '../rule/entities/rule.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Rule])],
    controllers: [RuleEvaluationController],
    providers: [RuleEvaluationService, RuleRepository],
    exports: [RuleEvaluationService]
})
export class RuleEvaluationModule {} 