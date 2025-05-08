import { Injectable } from '@nestjs/common';

@Injectable()
export class RuleEvaluatorService {
  getHello(): string {
    return 'Hello World!';
  }
}
