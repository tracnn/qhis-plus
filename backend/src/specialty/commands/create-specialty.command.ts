import { CreateSpecialtyDto } from "../dto/create-specialty.dto";

export class CreateSpecialtyCommand {
    constructor(public readonly createSpecialtyDto: CreateSpecialtyDto) {}
}