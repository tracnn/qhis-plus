import { CreateTitleDto } from "../dto/create-title.dto";

export class CreateTitleCommand {
    constructor(public readonly createTitleDto: CreateTitleDto) {}
}