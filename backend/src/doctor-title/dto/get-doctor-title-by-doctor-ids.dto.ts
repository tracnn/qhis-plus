import { ApiProperty } from "@nestjs/swagger";

export class GetDoctorTitleByDoctorIdsDto {
  @ApiProperty({
    description: 'The IDs of the doctors to get the titles for',
    type: [Number],
    example: [1, 2, 3],
  })
  doctorIds: number[];
}
