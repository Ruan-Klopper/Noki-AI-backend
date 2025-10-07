import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
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
}
