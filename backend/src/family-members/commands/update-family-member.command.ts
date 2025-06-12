import { UpdateFamilyMemberDto } from "../dto/update-family-member.dto";
import { ICommand } from "@nestjs/cqrs";

export class UpdateFamilyMemberCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly id: string,
        public readonly updateFamilyMemberDto: UpdateFamilyMemberDto
    ) {}
}