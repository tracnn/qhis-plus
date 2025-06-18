import { IQuery } from "@nestjs/cqrs";
import { GetDoctorTitleByTitleDto } from "../dto/get-doctor-title-by-title.dto";

export class GetDoctorTitleByTitleQuery implements IQuery {
  constructor(public readonly dto: GetDoctorTitleByTitleDto) {}
}