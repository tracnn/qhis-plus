import { IsString, IsNotEmpty } from 'class-validator';

export class GetPatientQuery {
    @IsString()
    @IsNotEmpty()
    id: string;

    constructor(id: string) {
        this.id = id;
    }
} 