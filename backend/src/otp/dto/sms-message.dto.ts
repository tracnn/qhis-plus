import { ApiProperty } from '@nestjs/swagger';

export class SmsMessageDto {
  @ApiProperty({
    example: '0123456789'
  })
  phoneNumber: string;
  @ApiProperty({
    example: 'otp'
  })
  functionCode: string;
  @ApiProperty({
    example: ['398399',
      'Quen mat khau app Bach Mai care',
      '5'
    ]
  })
  parameters: string[];
}