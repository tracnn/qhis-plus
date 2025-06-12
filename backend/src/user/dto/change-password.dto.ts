import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { MESSAGE_COMMON } from "../../common/message.common";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
    @ApiProperty({ description: 'Mật khẩu cũ' })
    @IsNotEmpty({ message: MESSAGE_COMMON.PASSWORD_NOT_EMPTY })
    @IsString({ message: MESSAGE_COMMON.PASSWORD_IS_STRING })
    oldPassword: string;

    @ApiProperty({ description: 'Mật khẩu mới' })
    @IsNotEmpty({ message: MESSAGE_COMMON.PASSWORD_NOT_EMPTY })
    @IsString({ message: MESSAGE_COMMON.PASSWORD_IS_STRING })
    @MinLength(6, { message: MESSAGE_COMMON.PASSWORD_MIN_LENGTH })
    newPassword: string;

    @ApiProperty({ description: 'Xác nhận mật khẩu mới' })
    @IsNotEmpty({ message: MESSAGE_COMMON.PASSWORD_NOT_EMPTY })
    @IsString({ message: MESSAGE_COMMON.PASSWORD_IS_STRING })
    @MinLength(6, { message: MESSAGE_COMMON.PASSWORD_MIN_LENGTH })
    confirmPassword: string;
}