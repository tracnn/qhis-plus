import { IQuery } from "@nestjs/cqrs";
import { GetEthnicsDto } from "../dto/get-ethnics.dto";

export class GetEthnicsQuery implements IQuery {
  constructor(public readonly dto: GetEthnicsDto) {}
}