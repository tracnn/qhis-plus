import { PartialType } from '@nestjs/swagger';
import { CreateHisModuleDto } from './create-his-module.dto';

export class UpdateHisModuleDto extends PartialType(CreateHisModuleDto) {}
