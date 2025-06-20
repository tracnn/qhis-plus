import { IQuery } from "@nestjs/cqrs";
import { GetDoctorTitleByDoctorIdsDto } from "../dto/get-doctor-title-by-doctor-ids.dto";

export class GetDoctorTitleByDoctorIdsQuery implements IQuery {
  constructor(public readonly doctorIds: number[]) {}
}