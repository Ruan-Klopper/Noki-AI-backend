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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let EmailService = EmailService_1 = class EmailService {
    configService;
    logger = new common_1.Logger(EmailService_1.name);
    transporter;
    constructor(configService) {
        this.configService = configService;
        this.createTransporter();
    }
    createTransporter() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: this.configService.get("EMAIL_USER"),
                pass: this.configService.get("EMAIL_PASSWORD"),
            },
        });
        this.transporter.verify((error, success) => {
            if (error) {
                this.logger.error("Email transporter verification failed:", error);
            }
            else {
                this.logger.log("Email transporter is ready to send messages");
            }
        });
    }
    async sendEmail(options) {
        try {
            const mailOptions = {
                from: options.from || this.configService.get("EMAIL_FROM"),
                to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
            };
            const result = await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email sent successfully to ${mailOptions.to}. Message ID: ${result.messageId}`);
            return true;
        }
        catch (error) {
            this.logger.error("Failed to send email:", error);
            return false;
        }
    }
    async sendWelcomeEmail(to, name) {
        const subject = "Welcome to Noki AI!";
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Noki AI, ${name}!</h2>
        <p>Thank you for joining our educational AI platform. We're excited to have you on board!</p>
        <p>You can now start exploring our features and begin your learning journey.</p>
        <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
          <h3>Getting Started:</h3>
          <ul>
            <li>Complete your profile setup</li>
            <li>Explore our AI-powered learning tools</li>
            <li>Join conversations and start learning</li>
          </ul>
        </div>
        <p style="margin-top: 30px;">If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Noki AI Team</p>
      </div>
    `;
        return this.sendEmail({
            to,
            subject,
            html,
        });
    }
    async sendPasswordResetEmail(to, resetToken) {
        const subject = "Password Reset Request - Noki AI";
        const resetUrl = `${this.configService.get("FRONTEND_URL")}/reset-password?token=${resetToken}`;
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested a password reset for your Noki AI account.</p>
        <p>Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>The Noki AI Team</p>
      </div>
    `;
        return this.sendEmail({
            to,
            subject,
            html,
        });
    }
    async sendNotificationEmail(to, title, message) {
        const subject = `Noki AI Notification: ${title}`;
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${title}</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;">${message}</p>
        </div>
        <p>Best regards,<br>The Noki AI Team</p>
      </div>
    `;
        return this.sendEmail({
            to,
            subject,
            html,
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map