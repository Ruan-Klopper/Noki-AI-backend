import { IsOptional, IsString, IsEmail, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: "User first name",
    example: "John",
    minLength: 2,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  firstname?: string;

  @ApiPropertyOptional({
    description: "User last name",
    example: "Doe",
    minLength: 2,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  lastname?: string;

  @ApiPropertyOptional({
    description: "User email address",
    example: "john.doe@example.com",
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: "User profile image URL",
    example: "https://example.com/profile.jpg",
  })
  @IsOptional()
  @IsString()
  profile_image?: string;

  @ApiPropertyOptional({
    description: "Google ID for OAuth integration",
    example: "google_123456789",
  })
  @IsOptional()
  @IsString()
  google_id?: string;
}
