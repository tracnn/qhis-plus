import { Controller, Get, Post, Body } from '@nestjs/common';
import { CheckRulesService } from './check-rules.service';
import { CheckPrescriptionDto } from './check-prescription/dtos/check-prescription.dto';
import { CheckPrescriptionService } from './check-prescription/check-prescription.service';

@Controller()
export class CheckRulesController {
  constructor(
    private readonly checkRulesService: CheckRulesService, 
    private readonly checkPrescriptionService: CheckPrescriptionService
  ) {}

  @Get()
  getHello(): string {
    return this.checkRulesService.getHello();
  }
  
  @Post('check-prescription')
  checkPrescription(@Body() checkPrescriptionDto: CheckPrescriptionDto) {
    return this.checkPrescriptionService.checkPrescription(checkPrescriptionDto);
  }
}
