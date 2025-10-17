import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.createTransporter();
  }

  private createTransporter() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.configService.get<string>("EMAIL_USER"),
        pass: this.configService.get<string>("EMAIL_PASSWORD"),
      },
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        this.logger.error("Email transporter verification failed:", error);
      } else {
        this.logger.log("Email transporter is ready to send messages");
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: options.from || this.configService.get<string>("EMAIL_FROM"),
        to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      const result = await this.transporter.sendMail(mailOptions);
      this.logger.log(
        `Email sent successfully to ${mailOptions.to}. Message ID: ${result.messageId}`
      );
      return true;
    } catch (error) {
      this.logger.error("Failed to send email:", error);
      return false;
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
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

  async sendPasswordResetEmail(
    to: string,
    resetToken: string
  ): Promise<boolean> {
    const subject = "Password Reset Request - Noki AI";
    const resetUrl = `${this.configService.get<string>("FRONTEND_URL")}/reset-password?token=${resetToken}`;

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

  async sendNotificationEmail(
    to: string,
    title: string,
    message: string
  ): Promise<boolean> {
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
}
