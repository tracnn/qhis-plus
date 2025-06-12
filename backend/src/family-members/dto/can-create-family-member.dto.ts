import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CanCreateFamilyMemberDto {
    @ApiProperty({
        description: 'Họ và tên của người thân',
        example: 'Nguyễn Ngọc Trác',
    })
    @IsNotEmpty({ message: 'Họ tên không được để trống' })
    @Length(2, 100, { message: 'Họ tên phải có ít nhất 2 ký tự và tối đa 100 ký tự' })
    @IsString({ message: 'Họ tên phải là chuỗi' })
    fullName: string;
    
    @ApiProperty({
        description: 'Ngày sinh của người thân',
        example: '20/02/1979',
    })
    @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
    @IsString({ message: 'Ngày sinh phải là chuỗi' })
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Ngày sinh phải có định dạng dd/mm/yyyy' })
    birthDate: string;
    
    @ApiProperty({
        description: 'Số CCCD/định danh của người thân',
        example: '001079003213',
    })
    @IsNotEmpty({ message: 'Số CCCD/định danh không được để trống' })
    @IsString({ message: 'Số CCCD/định danh phải là chuỗi' })
    @Length(12, 12, { message: 'Số CCCD/định danh phải có 12 ký tự' })
    identityNumber: string;
    
}