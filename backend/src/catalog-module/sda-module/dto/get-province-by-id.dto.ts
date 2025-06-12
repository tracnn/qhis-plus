import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class GetProvinceByIdDto {
  @ApiProperty({
    description: 'Province id',
    example: 1,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;
}