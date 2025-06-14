import { IQuery } from "@nestjs/cqrs";
import { GetTitlesDto } from "../dto/get-titles.dto";

export class GetTitlesQuery implements IQuery {
  constructor(public readonly getTitlesDto: GetTitlesDto) {}
}