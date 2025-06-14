import { IQuery } from "@nestjs/cqrs";
import { GetClinicsDto } from "../dto/get-clinics.dto";

export class GetClinicsQuery implements IQuery {
  constructor(public readonly dto: GetClinicsDto) {}
}