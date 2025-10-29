import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ProjectIdDto {
  @ApiProperty({
    description: "Project ID",
    example: "project_123",
  })
  @IsString()
  project_id: string;
}

class TaskIdDto {
  @ApiProperty({
    description: "Task ID",
    example: "task_123",
  })
  @IsString()
  task_id: string;
}

class TodoIdDto {
  @ApiProperty({
    description: "Todo ID",
    example: "todo_123",
  })
  @IsString()
  todo_id: string;
}

export class ChatAiDto {
  @ApiProperty({
    description: "Conversation ID",
    example: "conv-1234567890-abc123",
  })
  @IsString()
  conversation_id: string;

  @ApiProperty({
    description: "User's message/prompt",
    example: "What tasks do I have due this week?",
  })
  @IsString()
  prompt: string;

  @ApiProperty({
    description: "Array of project IDs",
    type: [ProjectIdDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectIdDto)
  projects?: ProjectIdDto[];

  @ApiProperty({
    description: "Array of task IDs",
    type: [TaskIdDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskIdDto)
  tasks?: TaskIdDto[];

  @ApiProperty({
    description: "Array of todo IDs",
    type: [TodoIdDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TodoIdDto)
  todos?: TodoIdDto[];
}
