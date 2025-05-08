import { Test, TestingModule } from '@nestjs/testing';
import { RuleEvaluatorController } from './rule-evaluator.controller';
import { RuleEvaluatorService } from './rule-evaluator.service';

describe('RuleEvaluatorController', () => {
  let ruleEvaluatorController: RuleEvaluatorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RuleEvaluatorController],
      providers: [RuleEvaluatorService],
    }).compile();

    ruleEvaluatorController = app.get<RuleEvaluatorController>(RuleEvaluatorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ruleEvaluatorController.getHello()).toBe('Hello World!');
    });
  });
});
