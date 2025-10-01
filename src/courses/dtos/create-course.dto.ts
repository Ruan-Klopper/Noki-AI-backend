import { IsString, IsEnum, IsOptional, IsDateString, IsObject } from 'class-validator';
import { CourseSource } from '../../common/interfaces';

export class CreateCourseDto {
  @IsString()
  user_id: string;

  @IsEnum(CourseSource)
  source: CourseSource;

  @IsString()
  external_id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  course_code?: string;

  @IsOptional()
  @IsString()
  time_zone?: string;

  @IsOptional()
  @IsDateString()
  start_at?: string;

  @IsOptional()
  @IsDateString()
  end_at?: string;

  @IsOptional()
  @IsObject()
  raw_data?: any;
}

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  course_code?: string;

  @IsOptional()
  @IsString()
  time_zone?: string;

  @IsOptional()
  @IsDateString()
  start_at?: string;

  @IsOptional()
  @IsDateString()
  end_at?: string;

  @IsOptional()
  @IsObject()
  raw_data?: any;
}
