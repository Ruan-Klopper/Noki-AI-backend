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
exports.CanvasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const canvas_service_1 = require("./canvas.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const setup_canvas_dto_1 = require("./dtos/setup-canvas.dto");
const setup_canvas_response_dto_1 = require("./dtos/setup-canvas-response.dto");
const link_canvas_data_response_dto_1 = require("./dtos/link-canvas-data-response.dto");
let CanvasController = class CanvasController {
    canvasService;
    constructor(canvasService) {
        this.canvasService = canvasService;
    }
    async setupCanvasLink(setupCanvasDto, currentUser) {
        return this.canvasService.setupCanvasLink(currentUser.userId, setupCanvasDto);
    }
    async linkCanvasData(currentUser) {
        return this.canvasService.linkCanvasData(currentUser.userId);
    }
    async getProjects() {
        return this.canvasService.getProjects();
    }
    async getAssignments() {
        return this.canvasService.getAssignments();
    }
    async syncData(currentUser) {
        return this.canvasService.syncData(currentUser.userId);
    }
    async getCanvasProvider(currentUser) {
        return this.canvasService.getCanvasProvider(currentUser.userId);
    }
    async deleteAllCanvasData(currentUser) {
        return this.canvasService.deleteAllCanvasData(currentUser.userId);
    }
};
exports.CanvasController = CanvasController;
__decorate([
    (0, common_1.Post)("setup"),
    (0, swagger_1.ApiOperation)({
        summary: "Setup Canvas Integration",
        description: "Link a Canvas account by providing institutional URL and bearer token. This endpoint will test the connection and save the auth details. User ID is automatically extracted from the JWT token.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Canvas account linked successfully",
        type: setup_canvas_response_dto_1.SetupCanvasResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Invalid Canvas credentials or URL",
        schema: {
            example: {
                statusCode: 400,
                message: "Invalid Canvas token or insufficient permissions",
                error: "Bad Request",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing token",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal server error",
        schema: {
            example: {
                statusCode: 500,
                message: "Failed to setup Canvas integration",
                error: "Internal Server Error",
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setup_canvas_dto_1.SetupCanvasDto, Object]),
    __metadata("design:returntype", Promise)
], CanvasController.prototype, "setupCanvasLink", null);
__decorate([
    (0, common_1.Post)("link-data"),
    (0, swagger_1.ApiOperation)({
        summary: "Link Canvas Data to Noki",
        description: "Sync Canvas courses to Noki Projects and Canvas assignments to Noki Tasks. This endpoint fetches all active Canvas courses and their assignments, then creates corresponding Projects and Tasks in Noki. User ID is automatically extracted from the JWT token.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Canvas data linked successfully",
        type: link_canvas_data_response_dto_1.LinkCanvasDataResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Canvas account not found or invalid data",
        schema: {
            example: {
                statusCode: 400,
                message: "Canvas account not found. Please setup Canvas integration first.",
                error: "Bad Request",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing token",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal server error",
        schema: {
            example: {
                statusCode: 500,
                message: "Failed to link Canvas data",
                error: "Internal Server Error",
            },
        },
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CanvasController.prototype, "linkCanvasData", null);
__decorate([
    (0, common_1.Get)("projects"),
    (0, swagger_1.ApiOperation)({
        summary: "Get Canvas Projects",
        description: "Fetch Canvas courses as projects for the authenticated user",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Canvas projects retrieved successfully",
        schema: {
            example: {
                message: "Canvas projects integration",
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CanvasController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Get)("assignments"),
    (0, swagger_1.ApiOperation)({
        summary: "Get Canvas Assignments",
        description: "Fetch Canvas assignments for the authenticated user",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Canvas assignments retrieved successfully",
        schema: {
            example: {
                message: "Canvas assignments integration",
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CanvasController.prototype, "getAssignments", null);
__decorate([
    (0, common_1.Post)("sync"),
    (0, swagger_1.ApiOperation)({
        summary: "Sync Canvas Data",
        description: "Synchronize Canvas data for the authenticated user. User ID is automatically extracted from the JWT token.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Canvas data sync completed",
        schema: {
            example: {
                message: "Canvas data sync completed",
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing token",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CanvasController.prototype, "syncData", null);
__decorate([
    (0, common_1.Get)("provider"),
    (0, swagger_1.ApiOperation)({
        summary: "Get Canvas provider information",
        description: "Get Canvas integration details for the authenticated user. Returns null if Canvas is not connected.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Canvas provider information retrieved successfully",
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing token",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CanvasController.prototype, "getCanvasProvider", null);
__decorate([
    (0, common_1.Delete)("delete-all"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete all Canvas data",
        description: "Deletes all Canvas-linked data for the authenticated user in the order: todos -> tasks -> projects -> auth_providers. User ID is automatically extracted from the JWT token.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "All Canvas data deleted successfully",
        schema: {
            example: {
                message: "All Canvas data deleted successfully",
                deleted: {
                    todos: 10,
                    tasks: 25,
                    projects: 5,
                    auth_providers: 1,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing token",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CanvasController.prototype, "deleteAllCanvasData", null);
exports.CanvasController = CanvasController = __decorate([
    (0, common_1.Controller)("canvas"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)("Canvas Integration"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __metadata("design:paramtypes", [canvas_service_1.CanvasService])
], CanvasController);
//# sourceMappingURL=canvas.controller.js.map