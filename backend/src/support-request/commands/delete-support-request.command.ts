import { ICommand } from "@nestjs/cqrs";

export class DeleteSupportRequestCommand implements ICommand {
    constructor(public readonly id: string, public readonly userId: string) {}
}