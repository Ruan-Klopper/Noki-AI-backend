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
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ai_service_1 = require("./ai.service");
const chat_ai_dto_1 = require("./dtos/chat-ai.dto");
const ai_data_request_dto_1 = require("./dtos/ai-data-request.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let AiController = class AiController {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    async healthCheck() {
        return this.aiService.healthCheck();
    }
    async chat(currentUser, req, chatDto) {
        const authHeader = req.headers.authorization;
        const authToken = authHeader?.startsWith("Bearer ")
            ? authHeader.substring(7)
            : null;
        return this.aiService.chat(currentUser.userId, chatDto, authToken);
    }
    async createConversation(currentUser) {
        return this.aiService.createConversation(currentUser.userId);
    }
    async getConversationHistory(currentUser, conversationId) {
        return this.aiService.getConversationHistory(currentUser.userId, conversationId);
    }
    async getAllConversations(currentUser) {
        return this.aiService.getAllConversations(currentUser.userId);
    }
    async renameConversation(currentUser, conversationId, title) {
        return this.aiService.renameConversation(currentUser.userId, conversationId, title);
    }
    async deleteConversation(currentUser, conversationId) {
        return this.aiService.deleteConversation(currentUser.userId, conversationId);
    }
    async fetchDataForAI(currentUser, dataRequest) {
        return this.aiService.fetchDataForAI(currentUser.userId, dataRequest);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Get)("health"),
    (0, swagger_1.ApiOperation)({
        summary: "Check AI server health",
        description: "Returns the health status of both this service and the AI server",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Health check successful",
        schema: {
            type: "object",
            properties: {
                status: { type: "string", example: "ok" },
                timestamp: { type: "string", example: "2024-01-01T00:00:00.000Z" },
                environment: { type: "string", example: "development" },
                ai_server_url: { type: "string", example: "http://localhost:8000/" },
                ai_server_response: {
                    type: "object",
                    description: "Response from AI server",
                },
                error: {
                    type: "string",
                    description: "Error message if AI server is unavailable",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 502, description: "AI server is not available" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Post)("chat"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({
        summary: "Send chat message to AI server",
        description: "Sends a chat message to the AI server with project, task, and todo context. " +
            "User ID is automatically extracted from the JWT bearer token. " +
            "The backend enriches the request by fetching full details for each provided project_id, task_id, and todo_id, " +
            "then forwards the enriched data to the AI server's /chat/chat endpoint.",
    }),
    (0, swagger_1.ApiBody)({
        type: chat_ai_dto_1.ChatAiDto,
        description: "Chat request with conversation ID, prompt, and optional context IDs",
        schema: {
            type: "object",
            required: ["conversation_id", "prompt"],
            properties: {
                conversation_id: {
                    type: "string",
                    description: "Unique identifier for the conversation",
                    example: "conv-1234567890-abc123",
                },
                prompt: {
                    type: "string",
                    description: "User's message/question to the AI",
                    example: "What tasks do I have due this week?",
                },
                projects: {
                    type: "array",
                    description: "Optional array of project IDs. Backend will fetch full project details (title, description, instructor) for each ID.",
                    items: {
                        type: "object",
                        required: ["project_id"],
                        properties: {
                            project_id: {
                                type: "string",
                                description: "Project ID to include in context",
                                example: "proj_123",
                            },
                        },
                    },
                    example: [{ project_id: "proj_123" }, { project_id: "proj_456" }],
                },
                tasks: {
                    type: "array",
                    description: "Optional array of task IDs. Backend will fetch full task details (title, description, due_datetime, status, project_id) for each ID.",
                    items: {
                        type: "object",
                        required: ["task_id"],
                        properties: {
                            task_id: {
                                type: "string",
                                description: "Task ID to include in context",
                                example: "task_123",
                            },
                        },
                    },
                    example: [{ task_id: "task_123" }],
                },
                todos: {
                    type: "array",
                    description: "Optional array of todo IDs. Backend will fetch full todo details (title, description, due_date, status, project_id, task_id, priority) for each ID.",
                    items: {
                        type: "object",
                        required: ["todo_id"],
                        properties: {
                            todo_id: {
                                type: "string",
                                description: "Todo ID to include in context",
                                example: "todo_123",
                            },
                        },
                    },
                    example: [{ todo_id: "todo_123" }],
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Chat response received successfully from AI server. Returns the exact response from the AI server without modifications.",
        schema: {
            type: "object",
            description: "Response structure from AI server. The exact fields may vary based on the AI's response. Common fields are listed below.",
            properties: {
                stage: {
                    type: "string",
                    description: "Current stage of the AI response",
                    example: "response",
                },
                conversation_id: {
                    type: "string",
                    description: "Conversation ID used for the chat",
                    example: "conv-1234567890-abc123",
                },
                text: {
                    type: "string",
                    description: "AI's text response",
                    example: "You have 3 tasks due this week...",
                },
                blocks: {
                    type: "array",
                    description: "Structured UI blocks from AI (if any)",
                    items: { type: "object" },
                },
                timestamp: {
                    type: "string",
                    description: "Response timestamp",
                    example: "2025-10-29T09:10:06.034Z",
                },
                token_usage: {
                    type: "object",
                    description: "Token usage statistics (if provided)",
                    properties: {
                        prompt_tokens: { type: "number", example: 150 },
                        completion_tokens: { type: "number", example: 200 },
                        total_tokens: { type: "number", example: 350 },
                        embedding_tokens: { type: "number", example: 0 },
                        cost_estimate_usd: { type: "number", example: 0.0052 },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data or missing required fields",
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Not found - One or more project/task/todo IDs not found",
    }),
    (0, swagger_1.ApiResponse)({
        status: 502,
        description: "Bad Gateway - AI server is not available or returned an error",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, chat_ai_dto_1.ChatAiDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "chat", null);
__decorate([
    (0, common_1.Post)("new_conversation"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({
        summary: "Create a new conversation",
        description: "Creates a new conversation for the current user. Returns only the conversation ID. " +
            "The conversation title will be 'New Conversation' with the current date.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Conversation created successfully",
        schema: {
            type: "object",
            properties: {
                conversation_id: {
                    type: "string",
                    description: "Unique identifier for the newly created conversation",
                    example: "123e4567-e89b-12d3-a456-426614174000",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Get)("get_conversation_history/:conversation_id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({
        summary: "Get conversation history",
        description: "Returns the full conversation history including all messages for a specific conversation ID.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversation history retrieved successfully",
        schema: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "123e4567-e89b-12d3-a456-426614174000",
                },
                title: {
                    type: "string",
                    example: "New Conversation - 2025-10-29",
                },
                description: { type: "string", nullable: true },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time" },
                messages: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            type: { type: "string", enum: ["Prompt", "Response"] },
                            prompt: { type: "string", nullable: true },
                            text: { type: "string", nullable: true },
                            blocks: { type: "object", nullable: true },
                            projects: { type: "array", nullable: true },
                            tasks: { type: "array", nullable: true },
                            todos: { type: "array", nullable: true },
                            created_at: { type: "string", format: "date-time" },
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You do not have access to this conversation",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Conversation not found",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("conversation_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getConversationHistory", null);
__decorate([
    (0, common_1.Get)("get_all_conversations"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({
        summary: "Get all conversations",
        description: "Returns all conversations for the current user with their IDs and titles.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversations retrieved successfully",
        schema: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        example: "123e4567-e89b-12d3-a456-426614174000",
                    },
                    title: {
                        type: "string",
                        example: "New Conversation - 2025-10-29",
                    },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" },
                    message_count: {
                        type: "number",
                        description: "Total number of messages in the conversation",
                        example: 10,
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getAllConversations", null);
__decorate([
    (0, common_1.Patch)("rename_conversation/:conversation_id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({
        summary: "Rename a conversation",
        description: "Updates the title of an existing conversation. User must own the conversation.",
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                title: {
                    type: "string",
                    description: "New title for the conversation",
                    example: "My Study Plan",
                },
            },
            required: ["title"],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversation renamed successfully",
        schema: {
            type: "object",
            properties: {
                id: { type: "string" },
                title: { type: "string" },
                updated_at: { type: "string", format: "date-time" },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid title or missing required field",
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You do not have access to this conversation",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Conversation not found",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("conversation_id")),
    __param(2, (0, common_1.Body)("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "renameConversation", null);
__decorate([
    (0, common_1.Delete)("delete_conversation/:conversation_id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete a conversation",
        description: "Deletes a conversation and all its associated chat messages. This action cannot be undone. User must own the conversation.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversation and all messages deleted successfully",
        schema: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    example: "Conversation deleted successfully",
                },
                conversation_id: { type: "string" },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - You do not have access to this conversation",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Conversation not found",
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("conversation_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "deleteConversation", null);
__decorate([
    (0, common_1.Post)("fetch-data"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({
        summary: "Fetch data for AI processing",
        description: "Endpoint for AI service to request specific user data. Returns projects, tasks, and/or todos based on the request parameters.",
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            required: ["data_types"],
            properties: {
                data_types: {
                    type: "array",
                    items: {
                        type: "string",
                        enum: ["projects", "tasks", "todos"],
                    },
                    example: ["projects", "tasks"],
                },
                time_period: {
                    type: "string",
                    enum: [
                        "today",
                        "this_week",
                        "this_month",
                        "next_two_months",
                        "overdue",
                        "all",
                    ],
                    example: "this_week",
                },
                project_ids: {
                    type: "array",
                    items: { type: "string" },
                    example: ["project-123"],
                },
                include_completed: {
                    type: "boolean",
                    default: false,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Data fetched successfully",
        schema: {
            type: "object",
            properties: {
                projects: { type: "array" },
                tasks: { type: "array" },
                todos: { type: "array" },
            },
        },
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ai_data_request_dto_1.AIDataRequestDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "fetchDataForAI", null);
exports.AiController = AiController = __decorate([
    (0, swagger_1.ApiTags)("AI"),
    (0, common_1.Controller)("ai"),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], AiController);
//# sourceMappingURL=ai.controller.js.map