import { Module } from '@nestjs/common';
import { CheckRulesController } from './check-rules.controller';
import { CheckRulesService } from './check-rules.service';
import { CheckPrescriptionService } from './check-prescription/check-prescription.service';

@Module({
  imports: [],
  controllers: [CheckRulesController],
  providers: [CheckRulesService, CheckPrescriptionService],
})
export class CheckRulesModule {}
