import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ConfirmRegMessage {
    @ApiProperty({
      example: '0909090909'
    })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        example: new Date().toISOString()
    })
    @IsNotEmpty()
    expiresAt: Date;

    @ApiProperty({
      example: '123456'
    })
    otp?: string;
  }
  
  export class ZaloMessageRequest {
    phone: string;
    template_id: string;
    template_data: Record<string, any>;
  }