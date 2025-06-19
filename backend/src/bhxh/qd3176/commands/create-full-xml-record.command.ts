import { ICommand } from "@nestjs/cqrs";

export class CreateFullXmlRecordCommand implements ICommand{
    constructor(public readonly xmlPayloads: { [key: string]: any }) {}
}