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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dtos/create-task.dto");
const update_task_dto_1 = require("./dtos/update-task.dto");
const create_task_auth_dto_1 = require("./dtos/create-task-auth.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const interfaces_1 = require("../common/interfaces");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let TasksController = class TasksController {
    tasksService;
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async create(createTaskDto) {
        return this.tasksService.create(createTaskDto);
    }
    async findAll() {
        return this.tasksService.findAll();
    }
    async findOne(id) {
        return this.tasksService.findOne(id);
    }
    async update(id, updateTaskDto) {
        return this.tasksService.update(id, updateTaskDto);
    }
    async remove(id) {
        return this.tasksService.remove(id);
    }
    async createTask(createTaskDto, currentUser) {
        const taskData = {
            ...createTaskDto,
            user_id: currentUser.userId,
        };
        return this.tasksService.create(taskData);
    }
    async updateTask(id, updateTaskDto, currentUser) {
        return this.tasksService.updateByUser(id, currentUser.userId, updateTaskDto);
    }
    async deleteTask(id, currentUser) {
        return this.tasksService.removeByUser(id, currentUser.userId);
    }
    async completeTask(id, currentUser) {
        return this.tasksService.completeTask(id, currentUser.userId);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new task" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Task successfully created",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: create_task_dto_1.CreateTaskDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all tasks" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Tasks retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get task by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Task ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Task retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Task not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update task by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Task ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Task updated successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Task not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: update_task_dto_1.UpdateTaskDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete task by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Task ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Task deleted successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Task not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("create_task"),
    (0, swagger_1.ApiOperation)({
        summary: "Create a new task (user from JWT token)",
        description: "Create a task for the authenticated user. User ID is extracted from the JWT token automatically. NO user_id needed in request body.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Task successfully created",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    (0, swagger_1.ApiBody)({ type: create_task_auth_dto_1.CreateTaskAuthDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_auth_dto_1.CreateTaskAuthDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Put)("update_task/:id"),
    (0, swagger_1.ApiOperation)({
        summary: "Update a task (user from JWT token)",
        description: "Update a task owned by the authenticated user. User ID is verified from the JWT token.",
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Task ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Task updated successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Task not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You can only update your own tasks",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    (0, swagger_1.ApiBody)({ type: update_task_dto_1.UpdateTaskDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)("delete_task/:id"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete a task (user from JWT token)",
        description: "Delete a task owned by the authenticated user. User ID is verified from the JWT token.",
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Task ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Task deleted successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Task not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You can only delete your own tasks",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.Put)("complete_task/:id"),
    (0, swagger_1.ApiOperation)({
        summary: "Mark a task as complete (user from JWT token)",
        description: "Mark a task as submitted/complete by setting is_submitted to true. User ID is verified from the JWT token.",
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Task ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Task marked as complete successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Task not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You can only complete your own tasks",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "completeTask", null);
exports.TasksController = TasksController = __decorate([
    (0, swagger_1.ApiTags)("Tasks"),
    (0, common_1.Controller)("tasks"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map