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
exports.MiscController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const misc_service_1 = require("./misc.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let MiscController = class MiscController {
    miscService;
    constructor(miscService) {
        this.miscService = miscService;
    }
    async healthCheck() {
        return this.miscService.healthCheck();
    }
    async getAllUserData(currentUser) {
        return this.miscService.getAllUserData(currentUser.userId);
    }
    async getUserDataSummary(userId, currentUser) {
        return this.miscService.getUserDataSummary(userId, currentUser.userId);
    }
    async deleteAllUserData(userId, currentUser) {
        await this.miscService.deleteAllUserData(userId, currentUser.userId);
    }
};
exports.MiscController = MiscController;
__decorate([
    (0, common_1.Get)("health"),
    (0, swagger_1.ApiOperation)({
        summary: "System health check",
        description: "Checks the health of the backend, database connection, and AI service. " +
            "This endpoint does not require authentication and can be used for monitoring.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Health check completed",
        schema: {
            type: "object",
            properties: {
                status: {
                    type: "string",
                    description: "Overall system status",
                    enum: ["healthy", "degraded", "unhealthy"],
                    example: "healthy",
                },
                timestamp: {
                    type: "string",
                    format: "date-time",
                    description: "Timestamp of the health check",
                    example: "2025-10-29T10:30:00.000Z",
                },
                services: {
                    type: "object",
                    properties: {
                        backend: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                    enum: ["up", "down"],
                                    example: "up",
                                },
                                uptime: {
                                    type: "number",
                                    description: "Backend uptime in seconds",
                                    example: 3600,
                                },
                                environment: {
                                    type: "string",
                                    example: "development",
                                },
                            },
                        },
                        database: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                    enum: ["connected", "disconnected", "error"],
                                    example: "connected",
                                },
                                responseTime: {
                                    type: "number",
                                    description: "Database response time in milliseconds",
                                    example: 15,
                                },
                                error: {
                                    type: "string",
                                    description: "Error message if connection failed",
                                    nullable: true,
                                },
                            },
                        },
                        ai_service: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                    enum: ["available", "unavailable", "error"],
                                    example: "available",
                                },
                                url: {
                                    type: "string",
                                    description: "AI service URL",
                                    example: "http://localhost:8000",
                                },
                                responseTime: {
                                    type: "number",
                                    description: "AI service response time in milliseconds",
                                    example: 125,
                                },
                                error: {
                                    type: "string",
                                    description: "Error message if AI service is unavailable",
                                    nullable: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MiscController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)("all-user-data"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({
        summary: "Get all user data",
        description: "Retrieve all projects, tasks, and todos for the authenticated user in a hierarchical structure. Projects contain tasks, and tasks contain todos.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User data retrieved successfully",
        schema: {
            example: {
                resultForUserId: "1e2db1ca-2d20-4744-a2da-18b112c41219",
                data: {
                    projects: [
                        {
                            id: "proj-uuid-1",
                            user_id: "1e2db1ca-2d20-4744-a2da-18b112c41219",
                            title: "Web Development Project",
                            description: "Building a new web application",
                            source: "Personal",
                            external_id: null,
                            course_code: "CS101",
                            color_hex: "#1D72A6",
                            time_zone: "America/New_York",
                            start_at: "2024-01-01T00:00:00.000Z",
                            end_at: "2024-12-31T23:59:59.000Z",
                            raw_canvas_data: {
                                id: 12345,
                                name: "Web Development",
                                original_name: "CS101 - Web Development",
                            },
                            created_at: "2024-01-01T00:00:00.000Z",
                            updated_at: "2024-01-05T00:00:00.000Z",
                            tasks: [
                                {
                                    id: "task-uuid-1",
                                    user_id: "1e2db1ca-2d20-4744-a2da-18b112c41219",
                                    project_id: "proj-uuid-1",
                                    title: "Design Homepage",
                                    description: "Create wireframes and design",
                                    due_date: "2024-01-15T23:59:59.000Z",
                                    is_all_day: false,
                                    created_at: "2024-01-02T00:00:00.000Z",
                                    updated_at: "2024-01-03T00:00:00.000Z",
                                    type: "Project",
                                    priority: "High",
                                    raw_canvas_data: {
                                        id: 67890,
                                        name: "Design Homepage Assignment",
                                        html_url: "https://canvas.instructure.com/...",
                                    },
                                    todos: [
                                        {
                                            id: "todo-uuid-1",
                                            user_id: "1e2db1ca-2d20-4744-a2da-18b112c41219",
                                            task_id: "task-uuid-1",
                                            title: "Create wireframes",
                                            description: "Design initial wireframes for mobile and desktop",
                                            priority: "High",
                                            due_date: "2024-01-10T00:00:00.000Z",
                                            created_at: "2024-01-02T00:00:00.000Z",
                                            updated_at: "2024-01-02T00:00:00.000Z",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing token",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "User not found",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MiscController.prototype, "getAllUserData", null);
__decorate([
    (0, common_1.Get)("user-data-summary/:userId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({
        summary: "Get user data summary",
        description: "Retrieve a summary of all data associated with a user. Useful for confirming what will be deleted.",
    }),
    (0, swagger_1.ApiParam)({
        name: "userId",
        description: "User ID",
        example: "1e2db1ca-2d20-4744-a2da-18b112c41219",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User data summary retrieved successfully",
        schema: {
            example: {
                user: {
                    id: "1e2db1ca-2d20-4744-a2da-18b112c41219",
                    email: "user@example.com",
                    firstname: "John",
                    lastname: "Doe",
                    created_at: "2024-01-01T00:00:00.000Z",
                },
                counts: {
                    authProviders: 2,
                    projects: 5,
                    tasks: 12,
                    todos: 8,
                    resources: 15,
                    conversations: 3,
                    chatMessages: 25,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing token",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - Can only view your own data summary",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "User not found",
    }),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MiscController.prototype, "getUserDataSummary", null);
__decorate([
    (0, common_1.Delete)("delete-all-user-data/:userId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: "Delete all user data",
        description: "Permanently delete ALL data associated with a user including auth providers, projects, tasks, todos, resources, conversations, and chat messages. This operation is IRREVERSIBLE!",
    }),
    (0, swagger_1.ApiParam)({
        name: "userId",
        description: "User ID",
        example: "1e2db1ca-2d20-4744-a2da-18b112c41219",
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: "All user data deleted successfully",
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing token",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - Can only delete your own data",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "User not found",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal server error - Failed to delete user data",
    }),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MiscController.prototype, "deleteAllUserData", null);
exports.MiscController = MiscController = __decorate([
    (0, swagger_1.ApiTags)("Misc"),
    (0, common_1.Controller)("misc"),
    __metadata("design:paramtypes", [misc_service_1.MiscService])
], MiscController);
//# sourceMappingURL=misc.controller.js.map