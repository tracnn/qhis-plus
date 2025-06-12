import { IQuery } from "@nestjs/cqrs";
import { GetProvinceByIdDto } from "../dto/get-province-by-id.dto";

export class GetProvinceByIdQuery implements IQuery {
  constructor(public readonly dto: GetProvinceByIdDto) {}
}