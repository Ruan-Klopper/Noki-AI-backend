import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "User first name",
    example: "John",
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  firstname: string;

  @ApiProperty({
    description: "User last name",
    example: "Doe",
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  lastname: string;

  @ApiProperty({
    description: "User email address",
    example: "john.doe@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User password",
    example: "password123",
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

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
