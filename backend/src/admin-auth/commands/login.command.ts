import { ICommand } from "@nestjs/cqrs";
import { AdminLoginDto } from "../dto/login.dto";

export class AdminLoginCommand implements ICommand {
    constructor(public readonly dto: AdminLoginDto) {}
}