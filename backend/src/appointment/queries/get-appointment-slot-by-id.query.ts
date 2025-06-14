import { IQuery } from "@nestjs/cqrs";

export class GetAppointmentSlotByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}