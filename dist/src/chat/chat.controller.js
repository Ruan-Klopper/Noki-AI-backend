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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chat_service_1 = require("./chat.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const interfaces_1 = require("../common/interfaces");
let ChatController = class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    async sendMessage(req, sendMessageDto) {
        return this.chatService.sendMessage(req.user.id, sendMessageDto);
    }
    async continueWithContext(req, conversationId, contextData) {
        return this.chatService.continueWithContext(req.user.id, conversationId, contextData);
    }
    async getConversationHistory(req, conversationId) {
        return this.chatService.getConversationHistory(req.user.id, conversationId);
    }
    async embedResource(req, resourceId, conversationId) {
        return this.chatService.embedResource(req.user.id, resourceId, conversationId);
    }
    async embedMessage(req, messageId, conversationId) {
        return this.chatService.embedMessage(req.user.id, messageId, conversationId);
    }
    async handleIntent(req, conversationId, intent) {
        return this.chatService.handleIntent(req.user.id, conversationId, intent);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)("send"),
    (0, swagger_1.ApiOperation)({ summary: "Send a chat message" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Message sent successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                message: { type: "string", description: "The message content" },
                conversationId: { type: "string", description: "Conversation ID" },
                contextSource: { type: "string", description: "Context source" },
                projectId: { type: "string", description: "Project ID" },
                taskId: { type: "string", description: "Task ID" },
            },
            required: ["message"],
        },
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)("continue/:conversationId"),
    (0, swagger_1.ApiOperation)({ summary: "Continue conversation with context" }),
    (0, swagger_1.ApiParam)({ name: "conversationId", description: "Conversation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversation continued successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Conversation not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                contextData: {
                    type: "object",
                    description: "Context data for continuation",
                },
            },
            required: ["contextData"],
        },
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("conversationId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "continueWithContext", null);
__decorate([
    (0, common_1.Get)("history/:conversationId"),
    (0, swagger_1.ApiOperation)({ summary: "Get conversation history" }),
    (0, swagger_1.ApiParam)({ name: "conversationId", description: "Conversation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversation history retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Conversation not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("conversationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getConversationHistory", null);
__decorate([
    (0, common_1.Post)("embed/resource/:resourceId"),
    (0, swagger_1.ApiOperation)({ summary: "Embed a resource into conversation" }),
    (0, swagger_1.ApiParam)({ name: "resourceId", description: "Resource ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Resource embedded successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Resource not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                conversationId: { type: "string", description: "Conversation ID" },
            },
            required: ["conversationId"],
        },
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("resourceId")),
    __param(2, (0, common_1.Body)("conversationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "embedResource", null);
__decorate([
    (0, common_1.Post)("embed/message/:messageId"),
    (0, swagger_1.ApiOperation)({ summary: "Embed a message into conversation" }),
    (0, swagger_1.ApiParam)({ name: "messageId", description: "Message ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Message embedded successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Message not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                conversationId: { type: "string", description: "Conversation ID" },
            },
            required: ["conversationId"],
        },
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("messageId")),
    __param(2, (0, common_1.Body)("conversationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "embedMessage", null);
__decorate([
    (0, common_1.Post)("intent/:conversationId"),
    (0, swagger_1.ApiOperation)({ summary: "Handle conversation intent" }),
    (0, swagger_1.ApiParam)({ name: "conversationId", description: "Conversation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Intent handled successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Conversation not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                intent: { type: "object", description: "Intent data" },
            },
            required: ["intent"],
        },
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("conversationId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "handleIntent", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)("Chat"),
    (0, common_1.Controller)("chat"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map