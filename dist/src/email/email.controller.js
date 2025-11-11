"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = exports.EmailResponseDto = exports.SendNotificationEmailDto = exports.SendPasswordResetEmailDto = exports.SendWelcomeEmailDto = exports.SendEmailDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const email_service_1 = require("./email.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
class SendEmailDto {
    to;
    subject;
    text;
    html;
    from;
}
exports.SendEmailDto = SendEmailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
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
    }),
    (0, class_validator_1.IsEmail)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SendEmailDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Email subject line",
        example: "Welcome to Noki AI!",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendEmailDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Plain text content of the email",
        example: "Welcome to our platform! We're excited to have you on board.",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendEmailDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "HTML content of the email",
        example: "<h1>Welcome!</h1><p>We're excited to have you on board.</p>",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendEmailDto.prototype, "html", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Sender email address (optional, defaults to configured EMAIL_FROM)",
        example: "noreply@nokiai.com",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SendEmailDto.prototype, "from", void 0);
class SendWelcomeEmailDto {
    to;
    name;
}
exports.SendWelcomeEmailDto = SendWelcomeEmailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Recipient email address",
        example: "newuser@example.com",
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendWelcomeEmailDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Recipient's name",
        example: "John Doe",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendWelcomeEmailDto.prototype, "name", void 0);
class SendPasswordResetEmailDto {
    to;
    resetToken;
}
exports.SendPasswordResetEmailDto = SendPasswordResetEmailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Recipient email address",
        example: "user@example.com",
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendPasswordResetEmailDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Password reset token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendPasswordResetEmailDto.prototype, "resetToken", void 0);
class SendNotificationEmailDto {
    to;
    title;
    message;
}
exports.SendNotificationEmailDto = SendNotificationEmailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Recipient email address",
        example: "user@example.com",
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendNotificationEmailDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Notification title",
        example: "New Message Received",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendNotificationEmailDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Notification message content",
        example: "You have received a new message from John Doe.",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendNotificationEmailDto.prototype, "message", void 0);
class EmailResponseDto {
    success;
    message;
}
exports.EmailResponseDto = EmailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether the email was sent successfully",
        example: true,
    }),
    __metadata("design:type", Boolean)
], EmailResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response message",
        example: "Email sent successfully",
    }),
    __metadata("design:type", String)
], EmailResponseDto.prototype, "message", void 0);
let EmailController = class EmailController {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async sendEmail(emailDto) {
        const success = await this.emailService.sendEmail(emailDto);
        return {
            success,
            message: success ? "Email sent successfully" : "Failed to send email",
        };
    }
    async sendWelcomeEmail(welcomeDto) {
        const success = await this.emailService.sendWelcomeEmail(welcomeDto.to, welcomeDto.name);
        return {
            success,
            message: success
                ? "Welcome email sent successfully"
                : "Failed to send welcome email",
        };
    }
    async sendPasswordResetEmail(resetDto) {
        const success = await this.emailService.sendPasswordResetEmail(resetDto.to, resetDto.resetToken);
        return {
            success,
            message: success
                ? "Password reset email sent successfully"
                : "Failed to send password reset email",
        };
    }
    async sendNotificationEmail(notificationDto) {
        const success = await this.emailService.sendNotificationEmail(notificationDto.to, notificationDto.title, notificationDto.message);
        return {
            success,
            message: success
                ? "Notification email sent successfully"
                : "Failed to send notification email",
        };
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)("send"),
    (0, swagger_1.ApiOperation)({
        summary: "Send a custom email",
        description: "Send a custom email with HTML or text content. Supports single recipient or multiple recipients.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Email sent successfully",
        type: EmailResponseDto,
        schema: {
            example: {
                success: true,
                message: "Email sent successfully",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid email format or missing required fields",
        schema: {
            example: {
                statusCode: 400,
                message: "Validation failed",
                error: "Bad Request",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SendEmailDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Post)("welcome"),
    (0, swagger_1.ApiOperation)({
        summary: "Send welcome email to new user",
        description: "Send a pre-formatted welcome email to new users with their name and onboarding information.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Welcome email sent successfully",
        type: EmailResponseDto,
        schema: {
            example: {
                success: true,
                message: "Welcome email sent successfully",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid email format or missing required fields",
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SendWelcomeEmailDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendWelcomeEmail", null);
__decorate([
    (0, common_1.Post)("password-reset"),
    (0, swagger_1.ApiOperation)({
        summary: "Send password reset email",
        description: "Send a password reset email with a secure token link that expires in 1 hour.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Password reset email sent successfully",
        type: EmailResponseDto,
        schema: {
            example: {
                success: true,
                message: "Password reset email sent successfully",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid email format or missing required fields",
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SendPasswordResetEmailDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendPasswordResetEmail", null);
__decorate([
    (0, common_1.Post)("notification"),
    (0, swagger_1.ApiOperation)({
        summary: "Send notification email",
        description: "Send a general notification email with custom title and message content.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Notification email sent successfully",
        type: EmailResponseDto,
        schema: {
            example: {
                success: true,
                message: "Notification email sent successfully",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid email format or missing required fields",
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SendNotificationEmailDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendNotificationEmail", null);
exports.EmailController = EmailController = __decorate([
    (0, swagger_1.ApiTags)("Email"),
    (0, common_1.Controller)("email"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=email.controller.js.map