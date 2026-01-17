import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsArray, IsEnum } from "class-validator";

export enum TimePeriod {
  TODAY = "today",
  THIS_WEEK = "this_week",
  THIS_MONTH = "this_month",
  NEXT_TWO_MONTHS = "next_two_months",
  OVERDUE = "overdue",
  ALL = "all",
}

export enum DataType {
  PROJECTS = "projects",
  TASKS = "tasks",
  TODOS = "todos",
}

export class AIDataRequestDto {
  @ApiProperty({
    description: "Types of data requested",
    enum: DataType,
    isArray: true,
    example: [DataType.PROJECTS, DataType.TASKS],
  })
  @IsArray()
  @IsEnum(DataType, { each: true })
  data_types: DataType[];

  @ApiProperty({
    description: "Time period filter for tasks/todos",
    enum: TimePeriod,
    required: false,
    example: TimePeriod.THIS_WEEK,
  })
  @IsOptional()
  @IsEnum(TimePeriod)
  time_period?: TimePeriod;

  @ApiProperty({
    description: "Optional project IDs to filter by",
    type: [String],
    required: false,
    example: ["project-123", "project-456"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  project_ids?: string[];

  @ApiProperty({
    description: "Include completed items",
    required: false,
    default: false,
  })
  @IsOptional()
  include_completed?: boolean;
}
