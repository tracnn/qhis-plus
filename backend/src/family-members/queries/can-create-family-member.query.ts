import { IQuery } from "@nestjs/cqrs";
import { CanCreateFamilyMemberDto } from "../dto/can-create-family-member.dto";

export class CanCreateFamilyMemberQuery implements IQuery {
    constructor(
        public readonly req: any,
        public readonly dto: CanCreateFamilyMemberDto,
    ) {}
}