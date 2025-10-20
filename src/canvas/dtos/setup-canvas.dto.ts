import { IsString, IsNotEmpty, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SetupCanvasDto {
  @ApiProperty({
    description: "User ID to link the Canvas account to",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    description: "Canvas institutional URL (base URL without /api/v1)",
    example: "https://uxi.instructure.com",
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl({ require_protocol: true })
  canvas_institutional_url: string;

  @ApiProperty({
    description: "Canvas bearer token for API authentication",
    example: "1234~abcdefghijklmnopqrstuvwxyz1234567890",
  })
  @IsString()
  @IsNotEmpty()
  canvas_token: string;
}
