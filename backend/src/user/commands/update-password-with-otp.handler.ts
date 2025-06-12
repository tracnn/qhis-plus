import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePasswordWithOtpCommand } from './update-password-with-otp.command';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { OtpService } from '../../otp/otp.service';
import { UserService } from '../user.service';
import { OTPType } from '../../otp/enums/otp.enums';
import { AuthService } from '../../auth/auth.service';
import { ERROR_404 } from '../../common/error-messages/error-404';
import { ERROR_400 } from '../../common/error-messages/error-400';
import { redisClient } from '../../redis/redis.provider';

@CommandHandler(UpdatePasswordWithOtpCommand)
export class UpdatePasswordWithOtpHandler implements ICommandHandler<UpdatePasswordWithOtpCommand> {
  constructor(
    private readonly otpService: OtpService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(command: UpdatePasswordWithOtpCommand): Promise<any> {
    const { dto } = command;
    const { phoneNumber, identity, otpCode } = dto;

    // 1. Xác thực OTP
    await this.otpService.verifyOtp(phoneNumber, otpCode, OTPType.UPDATE_PASSWORD);

    // 2. Tìm user theo phone + identity (username hoặc cccd)
    let user = null;
    if (/^\d{9,12}$/.test(identity)) {
      // Nếu là số (9-12 số, chỉnh lại theo chuẩn CCCD/CMND), coi là CCCD
      user = await this.userService.findByPhoneAndCCCD(phoneNumber, identity);
    } else {
      // Nếu không phải số, coi là username
      user = await this.userService.findByPhoneAndUsername(phoneNumber, identity);
    }
    if (!user) {
      throw new NotFoundException({ ...ERROR_404.USER_WITH_INFORMATION_NOT_FOUND });
    }

    // 3. Cập nhật mật khẩu
    // encrypt password
    const key = `update-password:${phoneNumber}:${identity}:${OTPType.UPDATE_PASSWORD}`;
    const redisData = await redisClient.get(key);  
    if (!redisData) {
      throw new NotFoundException({ ...ERROR_400.INVALID_REQUEST });
    }

    const { hashedPassword } = JSON.parse(redisData);
    const updatedUser = await this.userService.updatePassword(user.id, hashedPassword);
    if (!updatedUser) {
      throw new BadRequestException({ ...ERROR_400.INVALID_REQUEST });
    }
    return await redisClient.del(key);
  }
}