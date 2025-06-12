import { Controller, Post, Body } from '@nestjs/common';
import { AcsModuleService } from './acs-module.service';
import { ApiTags } from '@nestjs/swagger';
import { ValidateCredentialsDto } from './dto/validate-credentials';

@ApiTags('ACS Module')
@Controller('acs-module')
export class AcsModuleController {
  constructor(private readonly acsModuleService: AcsModuleService) {}

  // @Post('validate-credentials')
  // validateCredentials(@Body() dto: ValidateCredentialsDto) {
  //   return this.acsModuleService.validateCredentials(dto);
  // }
}
