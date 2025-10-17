import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
} from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from "class-validator";
import { EmailService, EmailOptions } from "./email.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

export class SendEmailDto {
  @ApiProperty({
    description: "Recipient email address(es)",
    example: "user@example.com",
    oneOf: [
      { type: "string", example: "user@example.com" },
      {
        type: "array",
        items: { type: "string" },
        example: ["user1@example.com", "user2@example.com"],
      },
    ],
  })
  @IsEmail({}, { each: true })
  @IsNotEmpty()
  to: string | string[];

  @ApiProperty({
    description: "Email subject line",
    example: "Welcome to Noki AI!",
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiPropertyOptional({
    description: "Plain text content of the email",
    example: "Welcome to our platform! We're excited to have you on board.",
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({
    description: "HTML content of the email",
    example: "<h1>Welcome!</h1><p>We're excited to have you on board.</p>",
  })
  @IsOptional()
  @IsString()
  html?: string;

  @ApiPropertyOptional({
    description:
      "Sender email address (optional, defaults to configured EMAIL_FROM)",
    example: "noreply@nokiai.com",
  })
  @IsOptional()
  @IsEmail()
  from?: string;
}

export class SendWelcomeEmailDto {
  @ApiProperty({
    description: "Recipient email address",
    example: "newuser@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: "Recipient's name",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class SendPasswordResetEmailDto {
  @ApiProperty({
    description: "Recipient email address",
    example: "user@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: "Password reset token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @IsString()
  @IsNotEmpty()
  resetToken: string;
}

export class SendNotificationEmailDto {
  @ApiProperty({
    description: "Recipient email address",
    example: "user@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: "Notification title",
    example: "New Message Received",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Notification message content",
    example: "You have received a new message from John Doe.",
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class EmailResponseDto {
  @ApiProperty({
    description: "Whether the email was sent successfully",
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: "Response message",
    example: "Email sent successfully",
  })
  message: string;
}

@ApiTags("Email")
@Controller("email")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post("send")
  @ApiOperation({
    summary: "Send a custom email",
    description:
      "Send a custom email with HTML or text content. Supports single recipient or multiple recipients.",
  })
  @ApiResponse({
    status: 200,
    description: "Email sent successfully",
    type: EmailResponseDto,
    schema: {
      example: {
        success: true,
        message: "Email sent successfully",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad request - Invalid email format or missing required fields",
    schema: {
      example: {
        statusCode: 400,
        message: "Validation failed",
        error: "Bad Request",
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  async sendEmail(@Body() emailDto: SendEmailDto): Promise<EmailResponseDto> {
    const success = await this.emailService.sendEmail(emailDto);
    return {
      success,
      message: success ? "Email sent successfully" : "Failed to send email",
    };
  }

  @Post("welcome")
  @ApiOperation({
    summary: "Send welcome email to new user",
    description:
      "Send a pre-formatted welcome email to new users with their name and onboarding information.",
  })
  @ApiResponse({
    status: 200,
    description: "Welcome email sent successfully",
    type: EmailResponseDto,
    schema: {
      example: {
        success: true,
        message: "Welcome email sent successfully",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad request - Invalid email format or missing required fields",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  async sendWelcomeEmail(
    @Body() welcomeDto: SendWelcomeEmailDto
  ): Promise<EmailResponseDto> {
    const success = await this.emailService.sendWelcomeEmail(
      welcomeDto.to,
      welcomeDto.name
    );
    return {
      success,
      message: success
        ? "Welcome email sent successfully"
        : "Failed to send welcome email",
    };
  }

  @Post("password-reset")
  @ApiOperation({
    summary: "Send password reset email",
    description:
      "Send a password reset email with a secure token link that expires in 1 hour.",
  })
  @ApiResponse({
    status: 200,
    description: "Password reset email sent successfully",
    type: EmailResponseDto,
    schema: {
      example: {
        success: true,
        message: "Password reset email sent successfully",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad request - Invalid email format or missing required fields",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  async sendPasswordResetEmail(
    @Body() resetDto: SendPasswordResetEmailDto
  ): Promise<EmailResponseDto> {
    const success = await this.emailService.sendPasswordResetEmail(
      resetDto.to,
      resetDto.resetToken
    );
    return {
      success,
      message: success
        ? "Password reset email sent successfully"
        : "Failed to send password reset email",
    };
  }

  @Post("notification")
  @ApiOperation({
    summary: "Send notification email",
    description:
      "Send a general notification email with custom title and message content.",
  })
  @ApiResponse({
    status: 200,
    description: "Notification email sent successfully",
    type: EmailResponseDto,
    schema: {
      example: {
        success: true,
        message: "Notification email sent successfully",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad request - Invalid email format or missing required fields",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  async sendNotificationEmail(
    @Body() notificationDto: SendNotificationEmailDto
  ): Promise<EmailResponseDto> {
    const success = await this.emailService.sendNotificationEmail(
      notificationDto.to,
      notificationDto.title,
      notificationDto.message
    );
    return {
      success,
      message: success
        ? "Notification email sent successfully"
        : "Failed to send notification email",
    };
  }
}
