import { Injectable } from '@nestjs/common';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { GetTitlesQuery } from './queries/get-titles.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTitlesDto } from './dto/get-titles.dto';
import { GetTitleQuery } from './queries/get-title.query';
import { CreateTitleCommand } from './commands/create-title.command';

@Injectable()
export class TitleService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  
  create(createTitleDto: CreateTitleDto) {
    return this.commandBus.execute(new CreateTitleCommand(createTitleDto));
  }

  findAll(getTitlesDto: GetTitlesDto) {
    return this.queryBus.execute(new GetTitlesQuery(getTitlesDto));
  }

  findOne(id: string) {
    return this.queryBus.execute(new GetTitleQuery(id));
  }

  update(id: number, updateTitleDto: UpdateTitleDto) {
    return `This action updates a #${id} title`;
  }

  remove(id: number) {
    return `This action removes a #${id} title`;
  }
}
