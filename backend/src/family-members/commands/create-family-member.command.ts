import { ICommand } from "@nestjs/cqrs";
import { CreateFamilyMemberDto } from "../dto/create-family-member.dto";

export class CreateFamilyMemberCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly dto: CreateFamilyMemberDto
    ) {}
}