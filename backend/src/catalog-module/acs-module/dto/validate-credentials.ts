import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ValidateCredentialsDto {
    @ApiProperty({
        description: 'Username',
        example: 'admin',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'Password',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}