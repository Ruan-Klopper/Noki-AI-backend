import { IsString, IsOptional, IsDateString, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Priority } from "../../common/interfaces";

/**
 * DTO for creating a todo with JWT authentication
 * User ID and Task ID are automatically provided (user from JWT, task from URL param)
 */
export class CreateTodoAuthDto {
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
}
