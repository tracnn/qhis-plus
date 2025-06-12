import { IQuery } from '@nestjs/cqrs';

export class GetFamilyMembersByUserIdQuery implements IQuery {
  constructor(public readonly userId: string) {}
}