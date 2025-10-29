import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsObject,
  IsArray,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { MessageType } from "../../common/enums/prisma-enums";

export class CreateChatMessageDto {
  @ApiProperty({
    description: "The conversation ID this message belongs to",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  conversation_id: string;

  @ApiProperty({
    description: "The type of message (Prompt or Response)",
    enum: MessageType,
    example: MessageType.Prompt,
  })
  @IsEnum(MessageType)
  type: MessageType;

  // For Prompt type messages
  @ApiPropertyOptional({
    description: "The user's prompt/question (for Prompt type)",
    example: "What tasks do I have this week?",
  })
  @IsOptional()
  @IsString()
  prompt?: string;

  @ApiPropertyOptional({
    description: "Array of project context (for Prompt type)",
    example: [
      {
        project_id: "proj-1",
        title: "Project Title",
        description: "Description",
        instructor: "",
      },
    ],
  })
  @IsOptional()
  @IsArray()
  projects?: any;

  @ApiPropertyOptional({
    description: "Array of task context (for Prompt type)",
    example: [
      {
        task_id: "task-1",
        title: "Task Title",
        description: "Description",
        due_datetime: "2025-10-29T09:10:06.034Z",
        status: "not_started",
        project_id: "proj-1",
      },
    ],
  })
  @IsOptional()
  @IsArray()
  tasks?: any;

  @ApiPropertyOptional({
    description: "Array of todo context (for Prompt type)",
    example: [
      {
        todo_id: "todo-1",
        title: "Todo Title",
        description: "Description",
        due_date: "2025-10-29T09:10:06.034Z",
        status: "not_started",
        project_id: "proj-1",
        task_id: "task-1",
        priority: "High",
        estimated_duration: "",
      },
    ],
  })
  @IsOptional()
  @IsArray()
  todos?: any;

  // For Response type messages
  @ApiPropertyOptional({
    description: "AI's text response (for Response type)",
    example: "You have 3 tasks due this week...",
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({
    description: "UI blocks for rich content display (for Response type)",
    example: [{ type: "text", content: "Hello world" }],
  })
  @IsOptional()
  @IsObject()
  blocks?: any;

  @ApiPropertyOptional({
    description: "Token usage information (for Response type)",
    example: {
      prompt_tokens: 10,
      completion_tokens: 5,
      total_tokens: 15,
      embedding_tokens: 0,
      cost_estimate_usd: 0.001,
    },
  })
  @IsOptional()
  @IsObject()
  token_usage?: any;

  // Common fields
  @ApiPropertyOptional({
    description: "Additional metadata for the message",
    example: { source: "web", version: "1.0" },
  })
  @IsOptional()
  @IsObject()
  metadata?: any;

  @ApiPropertyOptional({
    description: "Embedding ID for semantic search",
    example: "emb_123456789",
  })
  @IsOptional()
  @IsString()
  embedding_id?: string;
}
