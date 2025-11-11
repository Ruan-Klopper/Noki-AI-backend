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
exports.AuthController = exports.AuthResponseDto = exports.GoogleAuthResponseDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dtos/login.dto");
const register_dto_1 = require("./dtos/register.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
class GoogleAuthResponseDto {
    access_token;
    user;
    isNewUser;
    message;
}
exports.GoogleAuthResponseDto = GoogleAuthResponseDto;
class AuthResponseDto {
    access_token;
    user;
}
exports.AuthResponseDto = AuthResponseDto;
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async getProfile(req) {
        return req.user;
    }
    async googleAuth() {
    }
    async googleAuthCallback(req, res) {
        try {
            const result = await this.authService.validateGoogleUser(req.user);
            const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
            const redirectUrl = `${frontendUrl}/auth/callback?token=${result.access_token}&isNewUser=${result.isNewUser}`;
            res.redirect(redirectUrl);
        }
        catch (error) {
            const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
            const errorUrl = `${frontendUrl}/auth/error?message=${encodeURIComponent(error.message)}`;
            res.redirect(errorUrl);
        }
    }
    async googleTokenExchange(body) {
        const { idToken } = body || {};
        return this.authService.exchangeGoogleIdToken(idToken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiOperation)({
        summary: "Register a new user",
        description: "Create a new user account with email and password",
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "User successfully registered",
        type: AuthResponseDto,
        schema: {
            example: {
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                user: {
                    id: "user-uuid",
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@example.com",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        schema: {
            example: {
                statusCode: 400,
                message: "Validation failed",
                error: "Bad Request",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: "Conflict - User already exists",
        schema: {
            example: {
                statusCode: 409,
                message: "User already exists",
                error: "Conflict",
            },
        },
    }),
    (0, swagger_1.ApiBody)({ type: register_dto_1.RegisterDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, swagger_1.ApiOperation)({
        summary: "Login user",
        description: "Authenticate user with email and password",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User successfully logged in",
        type: AuthResponseDto,
        schema: {
            example: {
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                user: {
                    id: "user-uuid",
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@example.com",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid credentials",
        schema: {
            example: {
                statusCode: 401,
                message: "Invalid credentials",
                error: "Unauthorized",
            },
        },
    }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("profile"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({
        summary: "Get user profile",
        description: "Retrieve the authenticated user's profile information",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User profile retrieved successfully",
        schema: {
            example: {
                id: "user-uuid",
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
                profile_picture: "https://example.com/avatar.jpg",
                email_verified: true,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing token",
        schema: {
            example: {
                statusCode: 401,
                message: "Unauthorized",
                error: "Unauthorized",
            },
        },
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)("google"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
    (0, swagger_1.ApiOperation)({
        summary: "Initiate Google OAuth authentication",
        description: "Redirects to Google OAuth consent screen. This endpoint initiates the Google OAuth flow.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 302,
        description: "Redirect to Google OAuth consent screen",
        headers: {
            Location: {
                description: "Google OAuth URL",
                schema: {
                    type: "string",
                    example: "https://accounts.google.com/oauth/authorize?...",
                },
            },
        },
    }),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)("google/callback"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
    (0, swagger_1.ApiOperation)({
        summary: "Handle Google OAuth callback",
        description: "Handles the callback from Google OAuth. Automatically creates a new account if the user doesn't exist, or logs in existing users.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Google authentication successful",
        type: GoogleAuthResponseDto,
        schema: {
            example: {
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                user: {
                    id: "user-uuid",
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@gmail.com",
                    profile_picture: "https://lh3.googleusercontent.com/...",
                    email_verified: true,
                },
                isNewUser: false,
                message: "Login successful",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Google authentication failed",
        schema: {
            example: {
                statusCode: 401,
                message: "Google authentication failed",
                error: "Unauthorized",
            },
        },
    }),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
__decorate([
    (0, common_1.Post)("google/token"),
    (0, swagger_1.ApiOperation)({
        summary: "Exchange Google token for JWT",
        description: "Alternative endpoint for frontend applications to exchange Google ID token for JWT. Useful for mobile apps or SPAs.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Token exchange successful",
        type: GoogleAuthResponseDto,
        schema: {
            example: {
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                user: {
                    id: "user-uuid",
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@gmail.com",
                    profile_picture: "https://lh3.googleusercontent.com/...",
                    email_verified: true,
                },
                isNewUser: true,
                message: "Account created successfully",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid Google token",
        schema: {
            example: {
                statusCode: 400,
                message: "Invalid Google token",
                error: "Bad Request",
            },
        },
    }),
    (0, swagger_1.ApiBody)({
        description: "Google ID token for authentication",
        schema: {
            type: "object",
            properties: {
                idToken: {
                    type: "string",
                    description: "Google ID token from Google Sign-In",
                    example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzAyNzQ4...",
                },
            },
            required: ["idToken"],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleTokenExchange", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Authentication"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map