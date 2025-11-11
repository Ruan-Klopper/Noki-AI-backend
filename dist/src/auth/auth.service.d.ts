import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../database/prisma.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { EmailService } from "../email/email.service";
export declare class AuthService {
    private prisma;
    private jwtService;
    private emailService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, emailService: EmailService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            firstname: string;
            lastname: string;
            email: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            firstname: string;
            lastname: string;
            email: string;
        };
    }>;
    googleAuth(googleUser: any): Promise<{
        access_token: string;
        user: {
            id: any;
            firstname: any;
            lastname: any;
            email: any;
            profile_picture: any;
            email_verified: boolean;
        };
        isNewUser: boolean;
        message: string;
    }>;
    exchangeGoogleIdToken(idToken: string): Promise<{
        access_token: string;
        user: {
            id: any;
            firstname: any;
            lastname: any;
            email: any;
            profile_picture: any;
            email_verified: boolean;
        };
        isNewUser: boolean;
        message: string;
    }>;
    private createOnboardingProjectAndTask;
    private createSampleConversation;
    validateGoogleUser(googleUser: any): Promise<{
        access_token: string;
        user: {
            id: any;
            firstname: any;
            lastname: any;
            email: any;
            profile_picture: any;
            email_verified: boolean;
        };
        isNewUser: boolean;
        message: string;
    }>;
}
