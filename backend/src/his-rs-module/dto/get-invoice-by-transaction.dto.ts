import { ApiProperty } from "@nestjs/swagger";

export class GetInvoiceByTransactionDto {
    @ApiProperty({
        description: 'ID của giao dịch',
        example: 123456,
        required: true
    })
    transactionId: number;
}
