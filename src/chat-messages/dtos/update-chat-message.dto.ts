import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsObject,
} from "class-validator";
import { ChatStage } from "../../../generated/prisma";

export class UpdateChatMessageDto {
  @IsOptional()
  @IsEnum(ChatStage)
  stage?: ChatStage;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsObject()
  metadata?: any;

  @IsOptional()
  @IsObject()
  blocks?: any;

  @IsOptional()
  @IsObject()
  intent?: any;

  @IsOptional()
  @IsObject()
  token_usage?: any;

  @IsOptional()
  @IsUUID()
  project_id?: string;

  @IsOptional()
  @IsUUID()
  task_id?: string;

  @IsOptional()
  @IsString()
  embedding_id?: string;
}
