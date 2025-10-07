import { IsString, IsOptional, IsUUID } from "class-validator";

export class UpdateConversationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  ai_engine_id?: string;

  @IsOptional()
  @IsString()
  context_source?: string;
}
