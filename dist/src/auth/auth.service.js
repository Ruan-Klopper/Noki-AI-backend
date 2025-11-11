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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../database/prisma.service");
const email_service_1 = require("../email/email.service");
const interfaces_1 = require("../common/interfaces");
const axios_1 = require("axios");
const bcrypt = require("bcryptjs");
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwtService;
    emailService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(prisma, jwtService, emailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async register(registerDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException("User already exists");
        }
        const password_hash = await bcrypt.hash(registerDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                firstname: registerDto.firstname,
                lastname: registerDto.lastname,
                email: registerDto.email,
                password_hash,
            },
        });
        await this.createOnboardingProjectAndTask(user.id);
        await this.createSampleConversation(user.id);
        this.emailService
            .sendWelcomeEmail(user.email, `${user.firstname} ${user.lastname}`.trim() || user.email)
            .catch(() => { });
        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.sign(payload);
        return {
            access_token,
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            },
        };
    }
    async login(loginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.sign(payload);
        return {
            access_token,
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            },
        };
    }
    async googleAuth(googleUser) {
        try {
            this.logger.log(`Google OAuth attempt for email: ${googleUser.email}`);
            const existingUser = await this.prisma.user.findUnique({
                where: { email: googleUser.email },
            });
            let user;
            let isNewUser = false;
            if (existingUser) {
                user = await this.prisma.user.update({
                    where: { email: googleUser.email },
                    data: {
                        google_id: googleUser.googleId,
                        firstname: googleUser.firstname || existingUser.firstname,
                        lastname: googleUser.lastname || existingUser.lastname,
                        profile_image: googleUser.picture || existingUser.profile_image,
                    },
                });
                this.logger.log(`Existing user logged in: ${user.email}`);
            }
            else {
                user = await this.prisma.user.create({
                    data: {
                        email: googleUser.email,
                        firstname: googleUser.firstname || "",
                        lastname: googleUser.lastname || "",
                        google_id: googleUser.googleId,
                        password_hash: "",
                        profile_image: googleUser.picture || "",
                    },
                });
                isNewUser = true;
                this.logger.log(`New user created: ${user.email}`);
                await this.createOnboardingProjectAndTask(user.id);
                await this.createSampleConversation(user.id);
                this.emailService
                    .sendWelcomeEmail(user.email, `${user.firstname} ${user.lastname}`.trim() || user.email)
                    .catch(() => { });
            }
            const payload = {
                email: user.email,
                sub: user.id,
                isGoogleUser: true,
                isNewUser,
            };
            const access_token = this.jwtService.sign(payload);
            return {
                access_token,
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    profile_picture: user.profile_image,
                    email_verified: true,
                },
                isNewUser,
                message: isNewUser
                    ? "Account created successfully"
                    : "Login successful",
            };
        }
        catch (error) {
            this.logger.error(`Google OAuth error: ${error.message}`, error.stack);
            throw new common_1.UnauthorizedException("Google authentication failed");
        }
    }
    async exchangeGoogleIdToken(idToken) {
        if (!idToken || typeof idToken !== "string") {
            throw new common_1.BadRequestException("Missing or invalid Google ID token");
        }
        try {
            const tokenInfoUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
            const { data } = await axios_1.default.get(tokenInfoUrl, { timeout: 8000 });
            const googleUser = {
                googleId: data.sub,
                email: data.email,
                firstname: data.given_name || "",
                lastname: data.family_name || "",
                name: data.name || "",
                picture: data.picture || "",
                accessToken: "",
                refreshToken: "",
                emailVerified: String(data.email_verified) === "true",
            };
            if (!googleUser.email) {
                throw new common_1.UnauthorizedException("Invalid Google token: email missing");
            }
            return await this.googleAuth(googleUser);
        }
        catch (error) {
            this.logger.error(`Google ID token verification failed: ${error?.message || error}`);
            if (error?.response?.data?.error_description) {
                throw new common_1.UnauthorizedException(`Invalid Google token: ${error.response.data.error_description}`);
            }
            if (error instanceof common_1.UnauthorizedException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.UnauthorizedException("Invalid Google token");
        }
    }
    async createOnboardingProjectAndTask(userId) {
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);
        const project = await this.prisma.project.create({
            data: {
                user_id: userId,
                title: "General",
                description: "Your default project in Noki AI",
                source: interfaces_1.ProjectSource.Personal,
                color_hex: "#1d72a6",
            },
        });
        await this.prisma.task.create({
            data: {
                user_id: userId,
                project_id: project.id,
                title: "Explore Noki AI",
                description: "Take a quick tour and explore what Noki AI can do for you.",
                due_date: startOfDay,
                type: interfaces_1.TaskType.Personal,
                priority: interfaces_1.Priority.Medium,
            },
        });
    }
    async createSampleConversation(userId) {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        await this.prisma.conversation.create({
            data: {
                user_id: userId,
                title: `New Conversation - ${formattedDate}`,
                description: "Your first conversation with Noki AI",
            },
        });
        this.logger.log(`Sample conversation created for user: ${userId}`);
    }
    async validateGoogleUser(googleUser) {
        if (!googleUser || !googleUser.email) {
            throw new common_1.UnauthorizedException("Invalid Google user data");
        }
        return this.googleAuth(googleUser);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map