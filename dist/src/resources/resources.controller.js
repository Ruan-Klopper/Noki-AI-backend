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
exports.ResourcesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const resources_service_1 = require("./resources.service");
const create_resource_dto_1 = require("./dtos/create-resource.dto");
const update_resource_dto_1 = require("./dtos/update-resource.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const interfaces_1 = require("../common/interfaces");
let ResourcesController = class ResourcesController {
    resourcesService;
    constructor(resourcesService) {
        this.resourcesService = resourcesService;
    }
    async create(createResourceDto) {
        return this.resourcesService.create(createResourceDto);
    }
    async findAll() {
        return this.resourcesService.findAll();
    }
    async findOne(id) {
        return this.resourcesService.findOne(id);
    }
    async update(id, updateResourceDto) {
        return this.resourcesService.update(id, updateResourceDto);
    }
    async remove(id) {
        return this.resourcesService.remove(id);
    }
    async findByUser(userId) {
        return this.resourcesService.findByUser(userId);
    }
    async findByTask(taskId) {
        return this.resourcesService.findByTask(taskId);
    }
    async findByProject(projectId) {
        return this.resourcesService.findByProject(projectId);
    }
};
exports.ResourcesController = ResourcesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new resource" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Resource successfully created",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: create_resource_dto_1.CreateResourceDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resource_dto_1.CreateResourceDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all resources" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Resources retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get resource by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Resource ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Resource retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Resource not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update resource by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Resource ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Resource updated successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Resource not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: update_resource_dto_1.UpdateResourceDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_resource_dto_1.UpdateResourceDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete resource by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Resource ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Resource deleted successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Resource not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    (0, swagger_1.ApiOperation)({ summary: "Get resources by user ID" }),
    (0, swagger_1.ApiParam)({ name: "userId", description: "User ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User resources retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "User not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)("task/:taskId"),
    (0, swagger_1.ApiOperation)({ summary: "Get resources by task ID" }),
    (0, swagger_1.ApiParam)({ name: "taskId", description: "Task ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Task resources retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Task not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)("taskId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "findByTask", null);
__decorate([
    (0, common_1.Get)("project/:projectId"),
    (0, swagger_1.ApiOperation)({ summary: "Get resources by project ID" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Project resources retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Project not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "findByProject", null);
exports.ResourcesController = ResourcesController = __decorate([
    (0, swagger_1.ApiTags)("Resources"),
    (0, common_1.Controller)("resources"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __metadata("design:paramtypes", [resources_service_1.ResourcesService])
], ResourcesController);
//# sourceMappingURL=resources.controller.js.map