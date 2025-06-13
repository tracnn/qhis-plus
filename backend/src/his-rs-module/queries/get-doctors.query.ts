import { IQuery } from "@nestjs/cqrs";
import { GetDoctorsDto } from "../dto/get-doctors.dto";

export class GetDoctorsQuery implements IQuery {
  constructor(public readonly dto: GetDoctorsDto) {}
}