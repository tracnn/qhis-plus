import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SendOtpCommand } from "./send-otp.command";
import { OTP_CONSTANTS } from "../constants/send-otp.constant";
import axios from "axios";

@CommandHandler(SendOtpCommand)
export class SendOtpHandler implements ICommandHandler<SendOtpCommand> {
    async execute(command: SendOtpCommand) {
        const { sendOtpDto } = command;
        const { phone } = sendOtpDto;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const content = OTP_CONSTANTS.ContentTemplate.replace("{otp}", otp);
        const apiKey = OTP_CONSTANTS.ApiKey;
        const secretKey = OTP_CONSTANTS.SecretKey;
        const smsType = OTP_CONSTANTS.SmsType;
        const brandname = OTP_CONSTANTS.Brandname;
        const rootUrl = OTP_CONSTANTS.RootUrl;
        
        const response = await axios.post(rootUrl, {
            ApiKey: apiKey,
            SecretKey: secretKey,
            SmsType: smsType,
            Phone: phone,
            Content: content,
            Brandname: brandname,
        });

        return response.data;
    }
}