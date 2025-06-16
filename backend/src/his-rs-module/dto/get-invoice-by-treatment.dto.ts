import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class GetInvoiceByTreatmentDto {
    @ApiProperty({
        description: 'The treatment ID',
        example: '123456',
        required: true,
      })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    treatmentId: number;
}