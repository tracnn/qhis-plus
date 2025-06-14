import { IQuery } from "@nestjs/cqrs";
import { GetDoctorTitleDto } from "../dto/get-doctor-title.dto";

export class GetDoctorTitleQuery implements IQuery {
    constructor(public readonly getDoctorTitleDto: GetDoctorTitleDto) {}
}