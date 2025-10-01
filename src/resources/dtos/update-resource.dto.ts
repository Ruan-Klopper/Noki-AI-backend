import { IsOptional, IsString, IsEnum, IsObject } from 'class-validator';
import { ResourceType } from '../../common/interfaces';

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ResourceType)
  type?: ResourceType;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  file_path?: string;

  @IsOptional()
  @IsObject()
  metadata?: any;
}
