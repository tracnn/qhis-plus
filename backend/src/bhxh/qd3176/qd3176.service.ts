import { Injectable } from '@nestjs/common';
import { CreateQd3176Dto } from './dto/create-qd3176.dto';
import { UpdateQd3176Dto } from './dto/update-qd3176.dto';

@Injectable()
export class Qd3176Service {
  create(createQd3176Dto: CreateQd3176Dto) {
    return 'This action adds a new qd3176';
  }

  findAll() {
    return `This action returns all qd3176`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qd3176`;
  }

  update(id: number, updateQd3176Dto: UpdateQd3176Dto) {
    return `This action updates a #${id} qd3176`;
  }

  remove(id: number) {
    return `This action removes a #${id} qd3176`;
  }
}
