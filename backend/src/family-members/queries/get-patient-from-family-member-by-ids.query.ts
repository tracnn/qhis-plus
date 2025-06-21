import { IQuery } from "@nestjs/cqrs";

export class GetPatientFromFamilyMemberByIdsQuery implements IQuery {
  constructor(public readonly ids: string[]) {}
}