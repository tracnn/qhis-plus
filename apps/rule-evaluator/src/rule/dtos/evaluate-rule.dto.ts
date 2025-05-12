import { IsObject, IsOptional } from 'class-validator';

export class EvaluateRuleDto {
    @IsObject()
    facts: Record<string, any>;

    @IsOptional()
    @IsObject()
    options?: {
        ruleGroup?: string;
    };
} 