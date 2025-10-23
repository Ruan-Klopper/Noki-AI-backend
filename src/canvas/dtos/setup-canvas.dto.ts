import { IsString, IsNotEmpty, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SetupCanvasDto {
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
