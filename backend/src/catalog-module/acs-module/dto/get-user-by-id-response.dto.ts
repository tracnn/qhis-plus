import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class GetUserByIdResponseDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @IsString()
    username: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @IsString()
    fullname: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    email: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    mobile: string;
}