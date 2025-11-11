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
var MiscService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const ai_service_1 = require("../ai/ai.service");
let MiscService = MiscService_1 = class MiscService {
    prisma;
    aiService;
    logger = new common_1.Logger(MiscService_1.name);
    startTime = Date.now();
    constructor(prisma, aiService) {
        this.prisma = prisma;
        this.aiService = aiService;
    }
    async healthCheck() {
        const timestamp = new Date().toISOString();
        const uptime = Math.floor((Date.now() - this.startTime) / 1000);
        const backendHealth = {
            status: "up",
            uptime,
            environment: process.env.NODE_ENV || "development",
        };
        const databaseHealth = await this.checkDatabaseHealth();
        const aiServiceHealth = await this.checkAiServiceHealth();
        let overallStatus = "healthy";
        if (databaseHealth.status === "error" ||
            aiServiceHealth.status === "error") {
            overallStatus = "unhealthy";
        }
        else if (databaseHealth.status === "disconnected" ||
            aiServiceHealth.status === "unavailable") {
            overallStatus = "degraded";
        }
        return {
            status: overallStatus,
            timestamp,
            services: {
                backend: backendHealth,
                database: databaseHealth,
                ai_service: aiServiceHealth,
            },
        };
    }
    async checkDatabaseHealth() {
        const startTime = Date.now();
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            const responseTime = Date.now() - startTime;
            this.logger.log(`Database health check passed (${responseTime}ms)`);
            return {
                status: "connected",
                responseTime,
            };
        }
        catch (error) {
            const responseTime = Date.now() - startTime;
            this.logger.error(`Database health check failed: ${error.message}`, error.stack);
            return {
                status: "error",
                responseTime,
                error: error.message,
            };
        }
    }
    async checkAiServiceHealth() {
        const startTime = Date.now();
        try {
            const aiHealth = await this.aiService.healthCheck();
            const responseTime = Date.now() - startTime;
            if (aiHealth.ai_server_response) {
                this.logger.log(`AI service health check passed (${responseTime}ms)`);
                return {
                    status: "available",
                    url: aiHealth.ai_server_url,
                    responseTime,
                };
            }
            else {
                this.logger.warn(`AI service health check degraded: ${aiHealth.error}`);
                return {
                    status: "unavailable",
                    url: aiHealth.ai_server_url,
                    responseTime,
                    error: aiHealth.error,
                };
            }
        }
        catch (error) {
            const responseTime = Date.now() - startTime;
            this.logger.error(`AI service health check failed: ${error.message}`, error.stack);
            return {
                status: "error",
                url: "unknown",
                responseTime,
                error: error.message,
            };
        }
    }
    async deleteAllUserData(userId, requestingUserId) {
        const requestingUser = await this.prisma.user.findUnique({
            where: { id: requestingUserId },
        });
        if (!requestingUser) {
            throw new common_1.NotFoundException("Requesting user not found");
        }
        const targetUser = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!targetUser) {
            throw new common_1.NotFoundException("Target user not found");
        }
        if (userId !== requestingUserId) {
            throw new common_1.ForbiddenException("You can only delete your own data");
        }
        try {
            await this.prisma.$transaction(async (tx) => {
                await tx.chatMessage.deleteMany({
                    where: { user_id: userId },
                });
                const conversations = await tx.conversation.findMany({
                    where: { user_id: userId },
                    select: { id: true },
                });
                for (const conversation of conversations) {
                    await tx.chatMessage.deleteMany({
                        where: { conversation_id: conversation.id },
                    });
                }
                await tx.conversation.deleteMany({
                    where: { user_id: userId },
                });
                await tx.todo.deleteMany({
                    where: { user_id: userId },
                });
                await tx.resource.deleteMany({
                    where: { user_id: userId },
                });
                await tx.task.deleteMany({
                    where: { user_id: userId },
                });
                await tx.project.deleteMany({
                    where: { user_id: userId },
                });
                await tx.authProvider.deleteMany({
                    where: { user_id: userId },
                });
                await tx.user.delete({
                    where: { id: userId },
                });
            });
            console.log(`Successfully deleted all data for user: ${userId}`);
        }
        catch (error) {
            console.error(`Failed to delete user data for user: ${userId}`, error);
            throw new Error("Failed to delete user data. Please try again.");
        }
    }
    async getUserDataSummary(userId, requestingUserId) {
        const requestingUser = await this.prisma.user.findUnique({
            where: { id: requestingUserId },
        });
        if (!requestingUser) {
            throw new common_1.NotFoundException("Requesting user not found");
        }
        const targetUser = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!targetUser) {
            throw new common_1.NotFoundException("Target user not found");
        }
        if (userId !== requestingUserId) {
            throw new common_1.ForbiddenException("You can only view your own data summary");
        }
        const [authProvidersCount, projectsCount, tasksCount, todosCount, resourcesCount, conversationsCount, chatMessagesCount,] = await Promise.all([
            this.prisma.authProvider.count({ where: { user_id: userId } }),
            this.prisma.project.count({ where: { user_id: userId } }),
            this.prisma.task.count({ where: { user_id: userId } }),
            this.prisma.todo.count({ where: { user_id: userId } }),
            this.prisma.resource.count({ where: { user_id: userId } }),
            this.prisma.conversation.count({ where: { user_id: userId } }),
            this.prisma.chatMessage.count({ where: { user_id: userId } }),
        ]);
        return {
            user: {
                id: targetUser.id,
                email: targetUser.email,
                firstname: targetUser.firstname,
                lastname: targetUser.lastname,
                created_at: targetUser.created_at,
            },
            counts: {
                authProviders: authProvidersCount,
                projects: projectsCount,
                tasks: tasksCount,
                todos: todosCount,
                resources: resourcesCount,
                conversations: conversationsCount,
                chatMessages: chatMessagesCount,
            },
        };
    }
    async getAllUserData(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const projects = await this.prisma.project.findMany({
            where: { user_id: userId },
            include: {
                tasks: {
                    include: {
                        todos: {
                            orderBy: [
                                { priority: "desc" },
                                { due_date: "asc" },
                                { created_at: "desc" },
                            ],
                        },
                    },
                    orderBy: [{ due_date: "asc" }, { created_at: "desc" }],
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });
        return {
            resultForUserId: userId,
            data: {
                projects,
            },
        };
    }
};
exports.MiscService = MiscService;
exports.MiscService = MiscService = MiscService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ai_service_1.AiService])
], MiscService);
//# sourceMappingURL=misc.service.js.map