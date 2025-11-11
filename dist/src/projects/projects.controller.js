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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const projects_service_1 = require("./projects.service");
const create_project_dto_1 = require("./dtos/create-project.dto");
const update_project_dto_1 = require("./dtos/update-project.dto");
const create_project_auth_dto_1 = require("./dtos/create-project-auth.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let ProjectsController = class ProjectsController {
    projectsService;
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async create(createProjectDto) {
        return this.projectsService.create(createProjectDto);
    }
    async findAll() {
        return this.projectsService.findAll();
    }
    async findOne(id) {
        return this.projectsService.findOne(id);
    }
    async update(id, updateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }
    async remove(id) {
        return this.projectsService.remove(id);
    }
    async findByUser(userId) {
        return this.projectsService.findByUser(userId);
    }
    async createProject(createProjectDto, currentUser) {
        const projectData = {
            ...createProjectDto,
            user_id: currentUser.userId,
        };
        return this.projectsService.create(projectData);
    }
    async updateProject(id, updateProjectDto, currentUser) {
        return this.projectsService.updateByUser(id, currentUser.userId, updateProjectDto);
    }
    async deleteProject(id, currentUser) {
        return this.projectsService.removeByUser(id, currentUser.userId);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new project" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Project successfully created" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad request - Invalid input data" }),
    (0, swagger_1.ApiBody)({ type: create_project_dto_1.CreateProjectDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all projects" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Projects retrieved successfully" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get project by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Project ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Project retrieved successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Project not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update project by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Project ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Project updated successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Project not found" }),
    (0, swagger_1.ApiBody)({ type: update_project_dto_1.UpdateProjectDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete project by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Project ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Project deleted successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Project not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    (0, swagger_1.ApiOperation)({ summary: "Get projects by user ID" }),
    (0, swagger_1.ApiParam)({ name: "userId", description: "User ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User projects retrieved successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Post)("create_project"),
    (0, swagger_1.ApiOperation)({
        summary: "Create a new project (user from JWT token)",
        description: "Create a project for the authenticated user. User ID is extracted from the JWT token automatically. NO user_id needed in request body.",
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Project successfully created" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad request - Invalid input data" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    (0, swagger_1.ApiBody)({ type: create_project_auth_dto_1.CreateProjectAuthDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_auth_dto_1.CreateProjectAuthDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Put)("update_project/:id"),
    (0, swagger_1.ApiOperation)({
        summary: "Update a project (user from JWT token)",
        description: "Update a project owned by the authenticated user. User ID is verified from the JWT token.",
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Project ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Project updated successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Project not found" }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You can only update your own projects",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    (0, swagger_1.ApiBody)({ type: update_project_dto_1.UpdateProjectDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)("delete_project/:id"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete a project (user from JWT token)",
        description: "Delete a project owned by the authenticated user. User ID is verified from the JWT token.",
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Project ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Project deleted successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Project not found" }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You can only delete your own projects",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)("Projects"),
    (0, common_1.Controller)("projects"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map