import { IQuery } from "@nestjs/cqrs";

export class GetPatientFromFamilyMemberByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}