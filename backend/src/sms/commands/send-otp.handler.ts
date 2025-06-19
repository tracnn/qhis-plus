import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SendOtpCommand } from "./send-otp.command";
import axios from "axios";
import { SMS_BRANCHNAME_PARAMS, SMS_URL } from "../constants/sms-branchname-bachmai.constant";

@CommandHandler(SendOtpCommand)
export class SendOtpHandler implements ICommandHandler<SendOtpCommand> {
    async execute(command: SendOtpCommand): Promise<any> {
        const { sendOtpDto } = command;
        const { phone, otp } = sendOtpDto;

        const body = {
            RQST: {
                ...SMS_BRANCHNAME_PARAMS,
                MOBILELIST: this.formatPhoneNumber(phone),
                PARAMS: [
                    {
                        NUM: '1',
                        CONTENT: otp
                    }
                ],
            }
        };

        const response = await axios.post(SMS_URL, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    }

    private formatPhoneNumber(phone: string): string {
        return phone.startsWith('84') ? phone : `84${phone.slice(1)}`;
    }
}