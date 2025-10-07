import { IsString, IsOptional, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateConversationDto {
  @ApiPropertyOptional({
    description: "The title of the conversation",
    example: "Project Planning Discussion",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: "Description of the conversation",
    example: "Discussion about the new project requirements",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "AI engine ID to use for this conversation",
    example: "gpt-4",
  })
  @IsOptional()
  @IsString()
  ai_engine_id?: string;

  @ApiPropertyOptional({
    description: "Context source for the conversation",
    example: "web",
  })
  @IsOptional()
  @IsString()
  context_source?: string;
}

export class UpdateConversationDto {
  @ApiPropertyOptional({
    description: "The title of the conversation",
    example: "Updated Project Planning Discussion",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: "Description of the conversation",
    example: "Updated discussion about the new project requirements",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "AI engine ID to use for this conversation",
    example: "gpt-4",
  })
  @IsOptional()
  @IsString()
  ai_engine_id?: string;

  @ApiPropertyOptional({
    description: "Context source for the conversation",
    example: "web",
  })
  @IsOptional()
  @IsString()
  context_source?: string;
}
