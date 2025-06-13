import { IQuery } from "@nestjs/cqrs";
import { GetExamRoomsDto } from "../dto/get-exam-rooms.dto";

export class GetExamRoomsQuery implements IQuery {
  constructor(public readonly dto: GetExamRoomsDto) {}
}