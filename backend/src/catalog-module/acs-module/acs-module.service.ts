import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ValidateCredentialsDto } from './dto/validate-credentials';
import { ValidateCredentialsCommand } from './queries/validate-credentials.command';

@Injectable()
export class AcsModuleService {
  constructor(private readonly queryBus: QueryBus) {}

  validateCredentials(dto: ValidateCredentialsDto) {
    return this.queryBus.execute(new ValidateCredentialsCommand(dto));
  }
}
