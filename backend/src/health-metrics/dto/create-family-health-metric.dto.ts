import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

import { ApiProperty } from "@nestjs/swagger";

export class CreateFamilyHealthMetricDto {
    @ApiProperty({
        description: 'The family member id',
        example: '3714f267-47cf-4bd5-81fa-8bb728b96f77',
    })
    @IsNotEmpty()
    @IsString()
    familyMemberId: string;

    @ApiProperty({
        description: 'The pulse',
        example: 70,
    })
    @IsNotEmpty()
    @IsNumber()
    pulse: number;

    @ApiProperty({
        description: 'The systolic',
        example: 120,
    })
    @IsNotEmpty()
    @IsNumber()
    systolic: number;

    @ApiProperty({
        description: 'The diastolic',
        example: 80,
    })
    @IsNotEmpty()
    @IsNumber()
    diastolic: number;

    @ApiProperty({
        description: 'The height in cm',
        example: 170,
    })
    @IsNotEmpty()
    @IsNumber()
    heightCm: number;
    
    @ApiProperty({
        description: 'The weight in kg',
        example: 70,
    })
    @IsNotEmpty()
    @IsNumber()
    weightKg: number;

    @ApiProperty({
        description: 'The note',
        example: 'Note',
    })
    @IsNotEmpty()
    @IsString()
    note: string;

    @ApiProperty({
        description: 'The metric date',
        example: '2021-01-01',
    })
    @IsNotEmpty()
    @Type(() => Date) 
    @IsDate()
    metricDate: Date;
}   