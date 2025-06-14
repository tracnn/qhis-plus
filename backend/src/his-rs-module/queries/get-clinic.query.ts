import { IQuery } from "@nestjs/cqrs";

export class GetClinicQuery implements IQuery {
  constructor(public readonly id: number) {}
}