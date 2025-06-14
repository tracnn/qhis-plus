import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { SLOT_TIME } from "../enums/slot-time.enum";
import { ApiProperty } from "@nestjs/swagger";
import { SLOT_TYPE } from "../enums/slot-type.enum";

export class CreateAppointmentSlotDto {
    @ApiProperty({
        description: 'Ngày của slot',
        example: '2025-01-01',
    })
    @IsNotEmpty()
    @IsString()
    slotDate: string;

    @ApiProperty({
        enum: SLOT_TIME,
        description: 'Thời gian của slot',
        example: SLOT_TIME.SLOT_06_00,
    })
    @IsNotEmpty()
    @IsEnum(SLOT_TIME)
    slotTime: SLOT_TIME;

    @ApiProperty({
        description: 'ID của phòng khám',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    clinicId: number;

    @ApiProperty({
        description: 'ID của bác sĩ',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    doctorId: number;

    @ApiProperty({
        description: 'Mã dịch vụ',
        example: 'XN001',
    })
    @IsOptional()
    @IsString()
    serviceCode?: string;

    @ApiProperty({
        description: 'Giá dịch vụ',
        example: 100000,
    })
    @IsOptional()
    @IsNumber()
    servicePrice?: number;

    @ApiProperty({
        description: 'Số lượng bệnh nhân tối đa',
        example: 10,
    })
    @IsOptional()
    @IsNumber()
    maxPatient?: number;

    @ApiProperty({
        enum: SLOT_TYPE,
        description: 'Loại slot',
        example: SLOT_TYPE.MORNING,
    })
    @IsOptional()
    @IsEnum(SLOT_TYPE)
    slotType?: SLOT_TYPE;
}