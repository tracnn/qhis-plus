import { Injectable } from '@nestjs/common';
import { CreateHisModuleDto } from './dto/create-his-module.dto';
import { UpdateHisModuleDto } from './dto/update-his-module.dto';

@Injectable()
export class HisModuleService {
  create(createHisModuleDto: CreateHisModuleDto) {
    return 'This action adds a new hisModule';
  }

  findAll() {
    return `This action returns all hisModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hisModule`;
  }

  update(id: number, updateHisModuleDto: UpdateHisModuleDto) {
    return `This action updates a #${id} hisModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} hisModule`;
  }
}
