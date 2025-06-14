import { IQuery } from "@nestjs/cqrs";

export class GetDoctorTitleByIdQuery implements IQuery {
    constructor(public readonly id: string) {}
}