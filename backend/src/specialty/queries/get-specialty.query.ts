import { IQuery } from "@nestjs/cqrs";

export class GetSpecialtyQuery implements IQuery {
  constructor(public readonly specialtyId: string) {}
}