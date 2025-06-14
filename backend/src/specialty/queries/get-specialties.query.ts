import { IQuery } from "@nestjs/cqrs";
import { GetSpecialtiesDto } from "../dto/get-specialties.dto";

export class GetSpecialtiesQuery implements IQuery {
  constructor(public readonly getSpecialtiesDto: GetSpecialtiesDto) {}
}