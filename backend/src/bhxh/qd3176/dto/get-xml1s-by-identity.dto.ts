import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class GetXml1sByIdentityDto {
  @ApiProperty({
    description: 'Mã CCCD/Mã thẻ BHYT',
    example: '123456789012',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-9]{12}|[A-Z]{2}[0-9]{13})$/, {
    message: 'Mã CCCD/Mã thẻ BHYT không hợp lệ',
  })
  identity: string;
}