import { IsString, IsOptional, IsEnum, IsObject } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ResourceType } from "../../common/interfaces";

export class CreateResourceDto {
  @ApiProperty({
    description: "The user ID who owns this resource",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    description: "The title of the resource",
    example: "Important Documentation",
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: "Detailed description of the resource",
    example: "Comprehensive guide for the project",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Type of the resource",
    enum: ResourceType,
    example: ResourceType.Document,
  })
  @IsEnum(ResourceType)
  type: ResourceType;

  @ApiPropertyOptional({
    description: "URL link to the resource",
    example: "https://example.com/document.pdf",
  })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({
    description: "File path for local resources",
    example: "/uploads/document.pdf",
  })
  @IsOptional()
  @IsString()
  file_path?: string;

  @ApiPropertyOptional({
    description: "Additional metadata for the resource",
    example: { author: "John Doe", version: "1.0" },
  })
  @IsOptional()
  @IsObject()
  metadata?: any;

  @ApiPropertyOptional({
    description: "Associated task ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsOptional()
  @IsString()
  task_id?: string;

  @ApiPropertyOptional({
    description: "Associated project ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsOptional()
  @IsString()
  project_id?: string;
}

export class UpdateResourceDto {
  @ApiPropertyOptional({
    description: "The title of the resource",
    example: "Updated Resource Title",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: "Detailed description of the resource",
    example: "Updated resource description",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Type of the resource",
    enum: ResourceType,
    example: ResourceType.Link,
  })
  @IsOptional()
  @IsEnum(ResourceType)
  type?: ResourceType;

  @ApiPropertyOptional({
    description: "URL link to the resource",
    example: "https://example.com/updated-document.pdf",
  })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({
    description: "File path for local resources",
    example: "/uploads/updated-document.pdf",
  })
  @IsOptional()
  @IsString()
  file_path?: string;

  @ApiPropertyOptional({
    description: "Additional metadata for the resource",
    example: { author: "Jane Doe", version: "2.0" },
  })
  @IsOptional()
  @IsObject()
  metadata?: any;
}
