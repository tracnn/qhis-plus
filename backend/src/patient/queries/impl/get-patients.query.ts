import { IsInt, Min, IsOptional } from 'class-validator';

export class GetPatientsQuery {
    @IsInt()
    @Min(1)
    @IsOptional()
    page: number = 1;

    @IsInt()
    @Min(1)
    @IsOptional()
    limit: number = 10;

    constructor(partial: Partial<GetPatientsQuery>) {
        Object.assign(this, partial);
    }
} 