import { ICommand } from "@nestjs/cqrs";
import { CreateDoctorTitleDto } from "../dto/create-doctor-title.dto";

export class CreateDoctorTitleCommand implements ICommand {
    constructor(public readonly createDoctorTitleDto: CreateDoctorTitleDto) {}
}