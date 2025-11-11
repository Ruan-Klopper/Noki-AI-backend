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
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const todos_service_1 = require("./todos.service");
const create_todo_dto_1 = require("./dtos/create-todo.dto");
const update_todo_dto_1 = require("./dtos/update-todo.dto");
const create_todo_auth_dto_1 = require("./dtos/create-todo-auth.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const interfaces_1 = require("../common/interfaces");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let TodosController = class TodosController {
    todosService;
    constructor(todosService) {
        this.todosService = todosService;
    }
    async create(createTodoDto) {
        return this.todosService.create(createTodoDto);
    }
    async findAll() {
        return this.todosService.findAll();
    }
    async findOne(id) {
        return this.todosService.findOne(id);
    }
    async update(id, updateTodoDto) {
        return this.todosService.update(id, updateTodoDto);
    }
    async remove(id) {
        return this.todosService.remove(id);
    }
    async findByUser(userId) {
        return this.todosService.findByUser(userId);
    }
    async findByTask(taskId) {
        return this.todosService.findByTask(taskId);
    }
    async createTodo(taskId, createTodoDto, currentUser) {
        const todoData = {
            ...createTodoDto,
            user_id: currentUser.userId,
            task_id: taskId,
        };
        return this.todosService.createByUser(todoData, currentUser.userId);
    }
    async updateTodo(body, currentUser) {
        return this.todosService.updateManyByUser(body.todoIds, currentUser.userId, body.updates);
    }
    async deleteTodo(body, currentUser) {
        return this.todosService.removeManyByUser(body.todoIds, currentUser.userId);
    }
    async completeTodo(id, currentUser) {
        return this.todosService.completeTodo(id, currentUser.userId);
    }
};
exports.TodosController = TodosController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new todo" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Todo successfully created",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: create_todo_dto_1.CreateTodoDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all todos" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Todos retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get todo by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Todo ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Todo retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Todo not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update todo by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Todo ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Todo updated successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Todo not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: update_todo_dto_1.UpdateTodoDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_todo_dto_1.UpdateTodoDto]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete todo by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Todo ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Todo deleted successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Todo not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    (0, swagger_1.ApiOperation)({ summary: "Get todos by user ID" }),
    (0, swagger_1.ApiParam)({ name: "userId", description: "User ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User todos retrieved successfully",
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
], TodosController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)("task/:taskId"),
    (0, swagger_1.ApiOperation)({ summary: "Get todos by task ID" }),
    (0, swagger_1.ApiParam)({ name: "taskId", description: "Task ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Task todos retrieved successfully",
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
], TodosController.prototype, "findByTask", null);
__decorate([
    (0, common_1.Post)("create_todo/:taskId"),
    (0, swagger_1.ApiOperation)({
        summary: "Create a new todo (user from JWT token)",
        description: "Create a todo for a specific task. User ID is extracted from the JWT token automatically. Task ID from URL parameter. NO user_id or task_id needed in request body.",
    }),
    (0, swagger_1.ApiParam)({ name: "taskId", description: "Task ID" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Todo successfully created",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Task not found" }),
    (0, swagger_1.ApiBody)({ type: create_todo_auth_dto_1.CreateTodoAuthDto }),
    __param(0, (0, common_1.Param)("taskId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_todo_auth_dto_1.CreateTodoAuthDto, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "createTodo", null);
__decorate([
    (0, common_1.Put)("update_todo"),
    (0, swagger_1.ApiOperation)({
        summary: "Update one or more todos (user from JWT token)",
        description: "Update todos owned by the authenticated user. Supports single or bulk updates. User ID is verified from the JWT token.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Todo(s) updated successfully",
        schema: {
            example: {
                updated: 2,
                todos: [
                    { id: "todo-id-1", title: "Updated title 1" },
                    { id: "todo-id-2", title: "Updated title 2" },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Todo(s) not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You can only update your own todos",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                todoIds: {
                    type: "array",
                    items: { type: "string" },
                    description: "Array of todo IDs to update",
                    example: ["todo-id-1", "todo-id-2"],
                },
                updates: {
                    type: "object",
                    description: "Fields to update",
                    example: {
                        title: "Updated title",
                        description: "Updated description",
                        priority: "High",
                    },
                },
            },
            required: ["todoIds", "updates"],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.Delete)("delete_todo"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete one or more todos (user from JWT token)",
        description: "Delete todos owned by the authenticated user. Supports single or bulk deletion. User ID is verified from the JWT token.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Todo(s) deleted successfully",
        schema: {
            example: {
                deleted: 2,
                todoIds: ["todo-id-1", "todo-id-2"],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Todo(s) not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You can only delete your own todos",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                todoIds: {
                    type: "array",
                    items: { type: "string" },
                    description: "Array of todo IDs to delete",
                    example: ["todo-id-1", "todo-id-2"],
                },
            },
            required: ["todoIds"],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "deleteTodo", null);
__decorate([
    (0, common_1.Put)("complete_todo/:id"),
    (0, swagger_1.ApiOperation)({
        summary: "Mark a todo as complete (user from JWT token)",
        description: "Mark a todo as submitted/complete by setting is_submitted to true. User ID is verified from the JWT token.",
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Todo ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Todo marked as complete successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Todo not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You can only complete your own todos",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized - Invalid token" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "completeTodo", null);
exports.TodosController = TodosController = __decorate([
    (0, swagger_1.ApiTags)("Todos"),
    (0, common_1.Controller)("todos"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
//# sourceMappingURL=todos.controller.js.map