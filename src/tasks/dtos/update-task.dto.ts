import {
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  IsObject,
  IsBoolean,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Priority } from "../../common/interfaces";

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: "The title of the task",
    example: "Updated task title",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: "Detailed description of the task",
    example: "Updated task description",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Due date for the task",
    example: "2024-12-31T23:59:59.000Z",
  })
  @IsOptional()
  @IsDateString()
  due_date?: string;

  @ApiPropertyOptional({
    description: "Whether this task has been submitted",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  is_submitted?: boolean;

  @ApiPropertyOptional({
    description: "Priority level of the task",
    enum: Priority,
    example: Priority.High,
  })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiPropertyOptional({
    description: "Raw canvas data for visual representation",
    example: { nodes: [], edges: [] },
  })
  @IsOptional()
  @IsObject()
  raw_canvas_data?: any;
}
