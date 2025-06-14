import { Injectable } from '@nestjs/common';
import { CreateDoctorTitleDto } from './dto/create-doctor-title.dto';
import { UpdateDoctorTitleDto } from './dto/update-doctor-title.dto';
import { CreateDoctorTitleCommand } from './commands/create-doctor-title.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetDoctorTitleDto } from './dto/get-doctor-title.dto';
import { GetDoctorTitleQuery } from './queries/get-doctor-title.query';
import { GetDoctorTitleByIdQuery } from './queries/get-doctor-title-by-id.query';

@Injectable()
export class DoctorTitleService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createDoctorTitleDto: CreateDoctorTitleDto) {
    return this.commandBus.execute(new CreateDoctorTitleCommand(createDoctorTitleDto));
  }

  findAll(getDoctorTitleDto: GetDoctorTitleDto) {
    return this.queryBus.execute(new GetDoctorTitleQuery(getDoctorTitleDto));
  }

  findOne(id: string) {
    return this.queryBus.execute(new GetDoctorTitleByIdQuery(id));
  }

  update(id: number, updateDoctorTitleDto: UpdateDoctorTitleDto) {
    return `This action updates a #${id} doctorTitle`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorTitle`;
  }
}
