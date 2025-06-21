import { IQuery } from "@nestjs/cqrs";

export class GetPatientFromUserByIdsQuery implements IQuery {
  constructor(public readonly ids: string[]) {}
}