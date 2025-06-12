import { UpdateSupportRequestDto } from "../dto/update-support-request.dto";
import { ICommand } from "@nestjs/cqrs";

export class UpdateSupportRequestCommand implements ICommand{
    constructor(
        public readonly userId: string, 
        public readonly supportRequestId: string,
        public readonly updateSupportRequestDto: UpdateSupportRequestDto
    ) {}
}