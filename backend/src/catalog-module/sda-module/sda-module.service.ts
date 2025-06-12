import { Injectable } from '@nestjs/common';
import { CreateSdaModuleDto } from './dto/create-sda-module.dto';
import { UpdateSdaModuleDto } from './dto/update-sda-module.dto';

@Injectable()
export class SdaModuleService {
  create(createSdaModuleDto: CreateSdaModuleDto) {
    return 'This action adds a new sdaModule';
  }

  findAll() {
    return `This action returns all sdaModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sdaModule`;
  }

  update(id: number, updateSdaModuleDto: UpdateSdaModuleDto) {
    return `This action updates a #${id} sdaModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} sdaModule`;
  }
}
