import { Injectable } from '@nestjs/common';
import { CreateClinicSpecialtyDto } from './dto/create-clinic-specialty.dto';
import { UpdateClinicSpecialtyDto } from './dto/update-clinic-specialty.dto';
import { CreateClinicSpecialtyCommand } from './commands/create-clinic-specialty.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetClinicSpecialtyDto } from './dto/get-clinic-specialty.dto';
import { GetClinicSpecialtyQuery } from './queries/get-clinic-specialty.query';
import { GetClinicSpecialtyByIdQuery } from './queries/get-clinic-specialty-by-id.query';
import { GetClinicSpecialtyBySpecialtyIdDto } from './dto/get-clinic-specialty-by-specialty-id.dto';
import { GetClinicSpecialtyBySpecialtyIdQuery } from './queries/get-clinic-specialty-by-specialty-id.query';

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

  findOne(id: string) {
    return this.queryBus.execute(new GetClinicSpecialtyByIdQuery(id));
  }

  getBySpecialtyId(specialtyId: string, dto: GetClinicSpecialtyBySpecialtyIdDto) {
    return this.queryBus.execute(new GetClinicSpecialtyBySpecialtyIdQuery(specialtyId, dto));
  }

  update(id: number, updateClinicSpecialtyDto: UpdateClinicSpecialtyDto) {
    return `This action updates a #${id} clinicSpecialty`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicSpecialty`;
  }
}
