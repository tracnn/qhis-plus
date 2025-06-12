import { PartialType } from '@nestjs/swagger';
import { CreateSdaModuleDto } from './create-sda-module.dto';

export class UpdateSdaModuleDto extends PartialType(CreateSdaModuleDto) {}
