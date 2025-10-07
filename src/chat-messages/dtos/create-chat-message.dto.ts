import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsObject,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { MessageRole, ChatStage } from "../../common/enums/prisma-enums";

export class CreateChatMessageDto {
  @ApiProperty({
    description: "The conversation ID this message belongs to",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  conversation_id: string;

  @ApiProperty({
    description: "The role of the message sender",
    enum: MessageRole,
    example: MessageRole.User,
  })
  @IsEnum(MessageRole)
  role: MessageRole;

  @ApiPropertyOptional({
    description: "The current stage of the chat",
    enum: ChatStage,
    example: ChatStage.Response,
  })
  @IsOptional()
  @IsEnum(ChatStage)
  stage?: ChatStage;

  @ApiProperty({
    description: "The content of the message",
    example: "Hello, how can you help me today?",
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: "Additional metadata for the message",
    example: { source: "web", version: "1.0" },
  })
  @IsOptional()
  @IsObject()
  metadata?: any;

  @ApiPropertyOptional({
    description: "UI blocks for rich content display",
    example: { type: "text", content: "Hello world" },
  })
  @IsOptional()
  @IsObject()
  blocks?: any;

  @ApiPropertyOptional({
    description: "AI intent information",
    example: { type: "question", confidence: 0.95 },
  })
  @IsOptional()
  @IsObject()
  intent?: any;

  @ApiPropertyOptional({
    description: "Token usage information",
    example: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  })
  @IsOptional()
  @IsObject()
  token_usage?: any;

  @ApiPropertyOptional({
    description: "Associated project ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsOptional()
  @IsUUID()
  project_id?: string;

  @ApiPropertyOptional({
    description: "Associated task ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsOptional()
  @IsUUID()
  task_id?: string;

  @ApiPropertyOptional({
    description: "Embedding ID for semantic search",
    example: "emb_123456789",
  })
  @IsOptional()
  @IsString()
  embedding_id?: string;
}

export class UpdateChatMessageDto {
  @ApiPropertyOptional({
    description: "The current stage of the chat",
    enum: ChatStage,
    example: ChatStage.Response,
  })
  @IsOptional()
  @IsEnum(ChatStage)
  stage?: ChatStage;

  @ApiPropertyOptional({
    description: "The content of the message",
    example: "Updated message content",
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: "Additional metadata for the message",
    example: { source: "web", version: "1.0" },
  })
  @IsOptional()
  @IsObject()
  metadata?: any;

  @ApiPropertyOptional({
    description: "UI blocks for rich content display",
    example: { type: "text", content: "Hello world" },
  })
  @IsOptional()
  @IsObject()
  blocks?: any;

  @ApiPropertyOptional({
    description: "AI intent information",
    example: { type: "question", confidence: 0.95 },
  })
  @IsOptional()
  @IsObject()
  intent?: any;

  @ApiPropertyOptional({
    description: "Token usage information",
    example: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  })
  @IsOptional()
  @IsObject()
  token_usage?: any;

  @ApiPropertyOptional({
    description: "Associated project ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsOptional()
  @IsUUID()
  project_id?: string;

  @ApiPropertyOptional({
    description: "Associated task ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsOptional()
  @IsUUID()
  task_id?: string;

  @ApiPropertyOptional({
    description: "Embedding ID for semantic search",
    example: "emb_123456789",
  })
  @IsOptional()
  @IsString()
  embedding_id?: string;
}
