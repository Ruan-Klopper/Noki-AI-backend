import { EmailService } from "./email.service";
export declare class SendEmailDto {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    from?: string;
}
export declare class SendWelcomeEmailDto {
    to: string;
    name: string;
}
export declare class SendPasswordResetEmailDto {
    to: string;
    resetToken: string;
}
export declare class SendNotificationEmailDto {
    to: string;
    title: string;
    message: string;
}
export declare class EmailResponseDto {
    success: boolean;
    message: string;
}
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(emailDto: SendEmailDto): Promise<EmailResponseDto>;
    sendWelcomeEmail(welcomeDto: SendWelcomeEmailDto): Promise<EmailResponseDto>;
    sendPasswordResetEmail(resetDto: SendPasswordResetEmailDto): Promise<EmailResponseDto>;
    sendNotificationEmail(notificationDto: SendNotificationEmailDto): Promise<EmailResponseDto>;
}
