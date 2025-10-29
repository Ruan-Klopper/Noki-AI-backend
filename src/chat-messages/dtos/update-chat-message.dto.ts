import { IsString, IsOptional, IsObject, IsArray } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateChatMessageDto {
  // NOTE: type, conversation_id, and user_id should NOT be updatable
  // Only allow updating optional fields

  @ApiPropertyOptional({
    description: "Update the prompt (only for Prompt type messages)",
    example: "Updated question",
  })
  @IsOptional()
  @IsString()
  prompt?: string;

  @ApiPropertyOptional({
    description: "Update the text response (only for Response type messages)",
    example: "Updated response",
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({
    description: "Update UI blocks",
    example: [{ type: "text", content: "Updated content" }],
  })
  @IsOptional()
  @IsObject()
  blocks?: any;

  @ApiPropertyOptional({
    description: "Update token usage",
    example: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  })
  @IsOptional()
  @IsObject()
  token_usage?: any;

  @ApiPropertyOptional({
    description: "Update projects context",
    example: [{ project_id: "proj-1" }],
  })
  @IsOptional()
  @IsArray()
  projects?: any;

  @ApiPropertyOptional({
    description: "Update tasks context",
    example: [{ task_id: "task-1" }],
  })
  @IsOptional()
  @IsArray()
  tasks?: any;

  @ApiPropertyOptional({
    description: "Update todos context",
    example: [{ todo_id: "todo-1" }],
  })
  @IsOptional()
  @IsArray()
  todos?: any;

  @ApiPropertyOptional({
    description: "Update metadata",
    example: { source: "web", version: "1.0" },
  })
  @IsOptional()
  @IsObject()
  metadata?: any;

  @ApiPropertyOptional({
    description: "Update embedding ID",
    example: "emb_123456789",
  })
  @IsOptional()
  @IsString()
  embedding_id?: string;
}
