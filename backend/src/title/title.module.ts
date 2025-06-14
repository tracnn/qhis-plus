import { Module } from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './title.controller';
import { BASE_SCHEMA } from 'src/constant/common.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Title } from './entities/title.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetTitlesHandler } from './queries/get-titles.handler';
import { GetTitleHandler } from './queries/get-title.handler';
import { CreateTitleHandler } from './commands/create-title.handler';
import { GetTitleByIdsHandler } from './queries/get-title-by-ids.handler';

const QueryHandlers = [
  GetTitlesHandler,
  GetTitleHandler,
];

const CommandHandlers = [
  CreateTitleHandler,
  GetTitleByIdsHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Title], BASE_SCHEMA.DEFAULT),
    CqrsModule,
  ],
  controllers: [TitleController],
  providers: [TitleService, ...QueryHandlers, ...CommandHandlers],
  exports: [CqrsModule],
})
export class TitleModule {}
