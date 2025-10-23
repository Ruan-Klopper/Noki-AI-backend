import {
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsObject,
  IsBoolean,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TaskType, Priority } from "../../common/interfaces";

export class CreateTaskDto {
  @ApiProperty({
    description: "The user ID who owns this task",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString()
  user_id: string;

  @ApiPropertyOptional({
    description: "The project ID this task belongs to",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsOptional()
  @IsString()
  project_id?: string;

  @ApiProperty({
    description: "The title of the task",
    example: "Complete project documentation",
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: "Detailed description of the task",
    example: "Write comprehensive documentation for the new feature",
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
    description: "Whether this task is an all-day task",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  is_all_day?: boolean;

  @ApiPropertyOptional({
    description: "Whether this task has been submitted",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  is_submitted?: boolean;

  @ApiProperty({
    description: "Type of the task",
    enum: TaskType,
    example: TaskType.Personal,
  })
  @IsEnum(TaskType)
  type: TaskType;

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
  dueDate?: string;

  @ApiPropertyOptional({
    description: "Whether this task is an all-day task",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_all_day?: boolean;

  @ApiPropertyOptional({
    description: "Status of the task",
    example: "completed",
  })
  @IsOptional()
  @IsString()
  status?: string;
}
