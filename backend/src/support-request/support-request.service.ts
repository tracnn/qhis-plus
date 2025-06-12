import { Injectable } from '@nestjs/common';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { UpdateSupportRequestDto } from './dto/update-support-request.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSupportRequestCommand } from './commands/create-support-request.command';
import { UpdateSupportRequestCommand } from './commands/update-support-request.command';
import { GetSupportRequestsDto } from './dto/get-support-requests.dto';
import { GetSupportRequestsQuery } from './queries/get-support-requests.query';
import { GetSupportRequestQuery } from './queries/get-support-request.query';
import { DeleteSupportRequestCommand } from './commands/delete-support-request.command';
import { SUPPORT_REQUEST_TYPE_LIST } from './enums/support-request.enum';

@Injectable()
export class SupportRequestService {
  constructor(
    private readonly commandBus: CommandBus, 
    private readonly queryBus: QueryBus
  ) {}

  create(userId: string, createSupportRequestDto: CreateSupportRequestDto) {
    return this.commandBus.execute(new CreateSupportRequestCommand(userId, createSupportRequestDto));
  }

  findAll(userId: string, getSupportRequestsDto: GetSupportRequestsDto) {
    return this.queryBus.execute(new GetSupportRequestsQuery(userId, getSupportRequestsDto));
  }

  findOne(userId: string, id: string) {
    return this.queryBus.execute(new GetSupportRequestQuery(id, userId));
  }

  update(userId: string, supportRequestId: string, updateSupportRequestDto: UpdateSupportRequestDto) {
    return this.commandBus.execute(new UpdateSupportRequestCommand(userId, supportRequestId, updateSupportRequestDto));
  }

  remove(userId: string, id: string) {
    return this.commandBus.execute(new DeleteSupportRequestCommand(id, userId));
  }

  getSupportRequestTypes() {
    return SUPPORT_REQUEST_TYPE_LIST;
  }
}
