import { IsString, IsNotEmpty } from 'class-validator';

export class DeletePatientCommand {
    @IsString()
    @IsNotEmpty()
    id: string;

    constructor(id: string) {
        this.id = id;
    }
} 