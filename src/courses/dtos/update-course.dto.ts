import { IsOptional, IsString, IsDateString, IsObject } from 'class-validator';

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
