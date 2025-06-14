import { Injectable } from '@nestjs/common';
import { CreateClinicSpecialtyDto } from './dto/create-clinic-specialty.dto';
import { UpdateClinicSpecialtyDto } from './dto/update-clinic-specialty.dto';
import { CreateClinicSpecialtyCommand } from './commands/create-clinic-specialty.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetClinicSpecialtyDto } from './dto/get-clinic-specialty.dto';
import { GetClinicSpecialtyQuery } from './queries/get-clinic-specialty.query';

@Injectable()
export class ClinicSpecialtyService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createClinicSpecialtyDto: CreateClinicSpecialtyDto) {
    return this.commandBus.execute(new CreateClinicSpecialtyCommand(createClinicSpecialtyDto));
  }

  findAll(dto: GetClinicSpecialtyDto) {
    return this.queryBus.execute(new GetClinicSpecialtyQuery(dto));
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicSpecialty`;
  }

  update(id: number, updateClinicSpecialtyDto: UpdateClinicSpecialtyDto) {
    return `This action updates a #${id} clinicSpecialty`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicSpecialty`;
  }
}
