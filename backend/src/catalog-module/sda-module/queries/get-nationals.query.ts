import { IQuery } from "@nestjs/cqrs";
import { GetNationalsDto } from "../dto/get-nationals.dto";

export class GetNationalsQuery implements IQuery {
  constructor(public readonly dto: GetNationalsDto) {}
}