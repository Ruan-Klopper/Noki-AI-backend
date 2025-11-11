import { ConfigService } from "@nestjs/config";
export interface EmailOptions {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    from?: string;
}
export declare class EmailService {
    private configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    private createTransporter;
    sendEmail(options: EmailOptions): Promise<boolean>;
    sendWelcomeEmail(to: string, name: string): Promise<boolean>;
    sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean>;
    sendNotificationEmail(to: string, title: string, message: string): Promise<boolean>;
}
