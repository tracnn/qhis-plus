import { IsString, IsBoolean, IsNotEmpty, IsOptional, IsIn, Validate, IsJSON } from "class-validator";
import { EVENT_TYPES } from "../constant/rule.constants"

export class RuleDto {
    @IsString()
    @IsNotEmpty()
    rule_code: string;

    @IsString()
    @IsNotEmpty()
    rule_name: string;

    @IsString()
    @IsNotEmpty()
    rule_group: string;

    @IsString()
    @IsNotEmpty()
    condition: string;

    @IsString()
    @IsString()
    @IsIn(EVENT_TYPES)
    event_type: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean = true;
}