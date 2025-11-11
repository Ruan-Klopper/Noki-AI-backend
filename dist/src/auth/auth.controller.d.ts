import { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
export declare class GoogleAuthResponseDto {
    access_token: string;
    user: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        profile_picture?: string;
        email_verified: boolean;
    };
    isNewUser: boolean;
    message: string;
}
export declare class AuthResponseDto {
    access_token: string;
    user: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    getProfile(req: any): Promise<any>;
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any, res: Response): Promise<void>;
    googleTokenExchange(body: {
        idToken: string;
    }): Promise<GoogleAuthResponseDto>;
}
