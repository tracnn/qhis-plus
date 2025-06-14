import { Injectable } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { GetSpecialtiesDto } from './dto/get-specialties.dto';
import { GetSpecialtiesQuery } from './queries/get-specialties.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetSpecialtyQuery } from './queries/get-specialty.query';
import { CreateSpecialtyCommand } from './commands/create-specialty.command';

@Injectable()
export class SpecialtyService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  create(createSpecialtyDto: CreateSpecialtyDto) {
    return this.commandBus.execute(new CreateSpecialtyCommand(createSpecialtyDto));
  }

  findAll(getSpecialtiesDto: GetSpecialtiesDto) {
    return this.queryBus.execute(new GetSpecialtiesQuery(getSpecialtiesDto));
  }

  findOne(id: string) {
    return this.queryBus.execute(new GetSpecialtyQuery(id));
  }

  update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    return `This action updates a #${id} specialty`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialty`;
  }
}
