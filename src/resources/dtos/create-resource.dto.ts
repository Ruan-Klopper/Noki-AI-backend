import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';
import { ResourceType } from '../../common/interfaces';

export class CreateResourceDto {
  @IsString()
  user_id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ResourceType)
  type: ResourceType;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  file_path?: string;

  @IsOptional()
  @IsObject()
  metadata?: any;

  @IsOptional()
  @IsString()
  task_id?: string;

  @IsOptional()
  @IsString()
  course_id?: string;

  @IsOptional()
  @IsString()
  project_id?: string;
}

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
