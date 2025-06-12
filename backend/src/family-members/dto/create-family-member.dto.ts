import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateFamilyMemberDto {
    @ApiProperty({
        description: 'Họ và tên của người thân',
        example: 'Nguyễn Văn A',
    })
    @IsNotEmpty({ message: 'Họ tên không được để trống' })
    @IsString({ message: 'Họ tên phải là chuỗi' })
    @MinLength(3, { message: 'Họ tên phải có ít nhất 3 ký tự' })
    @MaxLength(255, { message: 'Họ tên không được vượt quá 255 ký tự' })
    fullName: string;

    @ApiProperty({
        description: 'Ngày sinh của người thân',
        example: '20/02/1979',
    })
    @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
    @IsString({ message: 'Ngày sinh phải là chuỗi' })
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Ngày sinh phải đúng định dạng DD/MM/YYYY' })
    birthDate: string;

    @ApiProperty({
        description: 'Giới tính của người thân',
        example: 1,
    })
    @IsNotEmpty({ message: 'Giới tính không được để trống' })
    @IsNumber({}, { message: 'Giới tính phải là số' })
    @IsIn([1, 2, 3], { message: 'Giới tính không hợp lệ' })
    genderCode: number;

    @ApiProperty({
        description: 'Số CCCD/định danh của người thân',
        example: '123456789012',
    })
    @IsNotEmpty({ message: 'Số CCCD/định danh không được để trống' })
    @IsString({ message: 'Số CCCD/định danh phải là chuỗi' })
    @Length(12, 12, { message: 'Số CCCD/định danh phải có 12 ký tự' })
    @Matches(/^\d+$/, { message: 'Số CCCD/định danh phải là số' })
    identityNumber: string;

    @ApiProperty({
        description: 'Số điện thoại của người thân',
        example: '0123456789',
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @IsString({ message: 'Số điện thoại phải là chuỗi' })
    @Length(10, 10, { message: 'Số điện thoại phải có 10 ký tự' })
    @Matches(/^\d+$/, { message: 'Số điện thoại phải là số' })
    phoneNumber: string;

    @ApiProperty({
        description: 'Email của người thân',
        example: 'john.doe@example.com',
    })
    @IsOptional()
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email: string;

    @ApiProperty({
        description: 'Mã quan hệ của người thân',
        example: 1,
    })
    @IsNotEmpty({ message: 'Mã quan hệ không được để trống' })
    @IsNumber({}, { message: 'Mã quan hệ phải là số' })
    relationshipId: number;

    @ApiProperty({
        description: 'Mã tỉnh/thành phố của người thân',
        example: 1,
    })
    @IsNumber({}, { message: 'Mã tỉnh/thành phố phải là số' })
    provinceId: number;

    @ApiProperty({
        description: 'Mã quận/huyện của người thân',
        example: 1,
    })
    @IsNumber({}, { message: 'Mã quận/huyện phải là số' })
    districtId: number;

    @ApiProperty({
        description: 'Mã xã/phường của người thân',
        example: 1,
    })
    communeId: number;

    @ApiProperty({
        description: 'Mã thẻ BHYT của người thân',
        example: 'HC4011234567890',
    })
    @IsOptional()
    @IsString({ message: 'Mã thẻ BHYT phải là chuỗi' })
    @Length(15, 15, { message: 'Mã thẻ BHYT phải có 15 ký tự' })
    @Matches(/^[A-Z]{2}\d{13}$/, { message: 'Mã thẻ BHYT không đúng định dạng' })
    heinCardNumber: string;

    @ApiProperty({
        description: 'Mã số BHXH của người thân',
        example: '1234567890',
    })
    @IsOptional()
    @IsString({ message: 'Mã số BHXH phải là chuỗi' })
    @Length(10, 10, { message: 'Mã số BHXH phải có 10 ký tự' })
    @Matches(/^\d+$/, { message: 'Mã số BHXH phải là số' })
    insuranceNumber: string;

    @ApiProperty({
        description: 'Địa chỉ của người thân',
        example: '123 Đường ABC, Quận XYZ, Tỉnh ABC',
    })
    @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
    @IsString({ message: 'Địa chỉ phải là chuỗi' })
    address: string;

    @ApiProperty({
        description: 'Mã nghề nghiệp của người thân',
        example: 1,
    })
    @IsNotEmpty({ message: 'Mã nghề nghiệp không được để trống' })
    @IsNumber({}, { message: 'Mã nghề nghiệp phải là số' })
    careerId: number;

    @ApiProperty({
        description: 'Mã dân tộc của người thân',
        example: 1,
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Mã dân tộc không được để trống' })
    @IsNumber({}, { message: 'Mã dân tộc phải là số' })
    ethnicId: number;

    @ApiProperty({
        description: 'Mã quốc tịch của người thân',
        example: 1,
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Mã quốc tịch không được để trống' })
    @IsNumber({}, { message: 'Mã quốc tịch phải là số' })
    nationalId: number;
}
