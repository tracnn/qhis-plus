import { IsString, IsBoolean, IsNotEmpty, IsOptional, IsIn, Validate, IsJSON, IsObject } from "class-validator";
import { EVENT_TYPES, RULE_GROUP_TYPE, RULE_GROUP_TYPES } from "../constant/rule.constants"

export class RuleDto {
    @IsString()
    @IsNotEmpty()
    rule_code: string;

    @IsString()
    @IsNotEmpty()
    rule_name: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(RULE_GROUP_TYPES)
    rule_group: RULE_GROUP_TYPE;

    @IsObject()
    @IsNotEmpty()
    conditions: any;

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