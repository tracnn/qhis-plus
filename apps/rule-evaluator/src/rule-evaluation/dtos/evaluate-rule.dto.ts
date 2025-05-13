import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EvaluateRuleDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  facts: Record<string, any>;

  @IsOptional()
  @IsString()
  ruleGroup?: string;
}