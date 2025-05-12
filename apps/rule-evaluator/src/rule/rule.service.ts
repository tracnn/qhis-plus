import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../../../shared/base/base.service';

@Injectable()
export class RuleService extends BaseService<Rule> {
  constructor(
    @InjectRepository(Rule)
    private readonly RuleRepository: Repository<Rule>,
  ) {
    super(RuleRepository);
  }

  async Hello(): Promise<string> {
    return 'Hello';
  }
}