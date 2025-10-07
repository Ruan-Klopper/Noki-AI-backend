import {
  IsString,
  IsOptional,
  MinLength,
  IsEnum,
  IsDateString,
  IsHexColor,
} from "class-validator";
import { ProjectSource } from "../../common/interfaces";

export class CreateProjectDto {
  @IsString()
  user_id: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectSource)
  source?: ProjectSource;

  @IsOptional()
  @IsString()
  external_id?: string;

  @IsOptional()
  @IsString()
  course_code?: string;

  @IsOptional()
  @IsHexColor()
  color_hex?: string;

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
  raw_canvas_data?: any;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectSource)
  source?: ProjectSource;

  @IsOptional()
  @IsString()
  external_id?: string;

  @IsOptional()
  @IsString()
  course_code?: string;

  @IsOptional()
  @IsHexColor()
  color_hex?: string;

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
  raw_canvas_data?: any;
}
