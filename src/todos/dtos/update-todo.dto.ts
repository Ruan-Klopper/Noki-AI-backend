import {
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Priority } from "../../common/interfaces";

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
