import {
  IsString,
  IsOptional,
  MinLength,
  IsEnum,
  IsDateString,
  IsHexColor,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProjectSource } from "../../common/interfaces";

/**
 * DTO for creating a project with JWT authentication
 * User ID is automatically extracted from the JWT token
 */
export class CreateProjectAuthDto {
  @ApiProperty({
    description: "The title of the project",
    example: "My Awesome Project",
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiPropertyOptional({
    description: "Detailed description of the project",
    example: "A comprehensive project for learning new technologies",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Source of the project",
    enum: ProjectSource,
    example: ProjectSource.Personal,
  })
  @IsOptional()
  @IsEnum(ProjectSource)
  source?: ProjectSource;

  @ApiPropertyOptional({
    description: "External system ID for the project",
    example: "canvas_12345",
  })
  @IsOptional()
  @IsString()
  external_id?: string;

  @ApiPropertyOptional({
    description: "Course code if applicable",
    example: "CS101",
  })
  @IsOptional()
  @IsString()
  course_code?: string;

  @ApiPropertyOptional({
    description: "Hex color code for the project",
    example: "#FF5733",
  })
  @IsOptional()
  @IsHexColor()
  color_hex?: string;

  @ApiPropertyOptional({
    description: "Time zone for the project",
    example: "America/New_York",
  })
  @IsOptional()
  @IsString()
  time_zone?: string;

  @ApiPropertyOptional({
    description: "Project start date",
    example: "2024-01-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  start_at?: string;

  @ApiPropertyOptional({
    description: "Project end date",
    example: "2024-12-31T23:59:59.000Z",
  })
  @IsOptional()
  @IsDateString()
  end_at?: string;

  @ApiPropertyOptional({
    description: "Raw canvas data for visual representation",
    example: { nodes: [], edges: [] },
  })
  @IsOptional()
  raw_canvas_data?: any;
}
