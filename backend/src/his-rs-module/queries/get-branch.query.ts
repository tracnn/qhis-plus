import { IQuery } from "@nestjs/cqrs";
import { GetBranchDto } from "../dto/get-branch.dto";

export class GetBranchQuery implements IQuery {
  constructor(public readonly dto: GetBranchDto) {}
}