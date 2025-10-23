import {
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Priority } from "../../common/interfaces";

export class CreateTodoDto {
  @ApiProperty({
    description: "The user ID who owns this todo",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    description: "The task ID this todo belongs to",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString()
  task_id: string;

  @ApiProperty({
    description: "The title of the todo",
    example: "Review code changes",
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: "Detailed description of the todo",
    example: "Review the latest pull request for bugs",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Priority level of the todo",
    enum: Priority,
    example: Priority.Medium,
  })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiPropertyOptional({
    description: "Due date for the todo",
    example: "2024-12-31T23:59:59.000Z",
  })
  @IsOptional()
  @IsDateString()
  due_date?: string;

  @ApiPropertyOptional({
    description: "Whether this todo is an all-day todo",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  is_all_day?: boolean;

  @ApiPropertyOptional({
    description: "Whether this todo has been submitted",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  is_submitted?: boolean;
}

export class UpdateTodoDto {
  @ApiPropertyOptional({
    description: "The title of the todo",
    example: "Updated todo title",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: "Detailed description of the todo",
    example: "Updated todo description",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Priority level of the todo",
    enum: Priority,
    example: Priority.High,
  })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiPropertyOptional({
    description: "Due date for the todo",
    example: "2024-12-31T23:59:59.000Z",
  })
  @IsOptional()
  @IsDateString()
  due_date?: string;

  @ApiPropertyOptional({
    description: "Whether this todo is an all-day todo",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  is_all_day?: boolean;

  @ApiPropertyOptional({
    description: "Whether this todo has been submitted",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  is_submitted?: boolean;
}
