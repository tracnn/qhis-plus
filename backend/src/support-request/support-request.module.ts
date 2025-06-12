import { Module } from '@nestjs/common';
import { SupportRequestService } from './support-request.service';
import { SupportRequestController } from './support-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportRequest } from './entities/support-request.entity';
import { BASE_SCHEMA } from '../constant/common.constant';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSupportRequestCommandHandler } from './commands/create-support-request.handler';
import { UpdateSupportRequestCommandHandler } from './commands/update-support-request.handler';
import { GetSupportRequestsHandler } from './queries/get-support-requests.handler';
import { GetSupportRequestHandler } from './queries/get-support-request.handler';
import { DeleteSupportRequestHandler } from './commands/delete-support-request.handler';

const CommandHandlers = [
  CreateSupportRequestCommandHandler,
  UpdateSupportRequestCommandHandler,
];

const QueryHandlers = [
  GetSupportRequestsHandler,
  GetSupportRequestHandler,
  DeleteSupportRequestHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportRequest], BASE_SCHEMA.DEFAULT),
    CqrsModule,
  ],
  controllers: [SupportRequestController],
  providers: [SupportRequestService, ...CommandHandlers, ...QueryHandlers],
  exports: [CqrsModule],
})
export class SupportRequestModule {}
