import { IsNotEmpty, IsNumber } from "class-validator";
import { BaseDto } from "../../common/base.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class GetDocumentByIdDto extends BaseDto {
    @ApiProperty({
        description: "Document ID",
        example: 1,
    })
    @Transform(({ value }) => Number(value))
    @IsNotEmpty({ message: "Document ID không được để trống" })
    @IsNumber({}, { message: "Document ID phải là số" })
    documentId: number;
}
