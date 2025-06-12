import { CreateSupportRequestDto } from "../dto/create-support-request.dto";
import { ICommand } from "@nestjs/cqrs";

export class CreateSupportRequestCommand implements ICommand{
    constructor(
        public readonly userId: string, 
        public readonly createSupportRequestDto: CreateSupportRequestDto
    ) {}
}