import { UpdatePasswordWithOtpDto } from '../dto/update-password-with-otp-dto';

export class UpdatePasswordWithOtpCommand {
  constructor(public readonly dto: UpdatePasswordWithOtpDto) {}
}