import { ICommand } from "@nestjs/cqrs";
import { CreateClinicSpecialtyDto } from "../dto/create-clinic-specialty.dto";

export class CreateClinicSpecialtyCommand implements ICommand {
    constructor(public readonly dto: CreateClinicSpecialtyDto) {}
}