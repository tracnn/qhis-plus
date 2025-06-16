import { ICommand } from "@nestjs/cqrs";
import { SendOtpDto } from "../dto/send-otp.dto";

export class SendOtpCommand implements ICommand {
    constructor(
        public readonly sendOtpDto: SendOtpDto,
    ) {}
}