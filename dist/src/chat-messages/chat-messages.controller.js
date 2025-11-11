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
exports.ChatMessagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chat_messages_service_1 = require("./chat-messages.service");
const create_chat_message_dto_1 = require("./dtos/create-chat-message.dto");
const update_chat_message_dto_1 = require("./dtos/update-chat-message.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const prisma_enums_1 = require("../common/enums/prisma-enums");
const interfaces_1 = require("../common/interfaces");
let ChatMessagesController = class ChatMessagesController {
    chatMessagesService;
    constructor(chatMessagesService) {
        this.chatMessagesService = chatMessagesService;
    }
    create(req, createChatMessageDto) {
        return this.chatMessagesService.create(req.user.id, createChatMessageDto);
    }
    findAll(req, conversationId) {
        return this.chatMessagesService.findAll(req.user.id, conversationId);
    }
    findOne(req, id) {
        return this.chatMessagesService.findOne(id, req.user.id);
    }
    update(req, id, updateChatMessageDto) {
        return this.chatMessagesService.update(id, req.user.id, updateChatMessageDto);
    }
    remove(req, id) {
        return this.chatMessagesService.remove(id, req.user.id);
    }
    findByConversation(req, conversationId) {
        return this.chatMessagesService.findByConversation(conversationId, req.user.id);
    }
    updateStage(req, id, stage) {
        throw new Error("updateStage is deprecated - messages cannot change type after creation");
    }
    findByType(req, conversationId, type) {
        return this.chatMessagesService.findByType(conversationId, req.user.id, type);
    }
};
exports.ChatMessagesController = ChatMessagesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new chat message" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Chat message successfully created",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: create_chat_message_dto_1.CreateChatMessageDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_chat_message_dto_1.CreateChatMessageDto]),
    __metadata("design:returntype", void 0)
], ChatMessagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all chat messages" }),
    (0, swagger_1.ApiQuery)({
        name: "conversationId",
        required: false,
        description: "Filter messages by conversation ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Chat messages retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("conversationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChatMessagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get chat message by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Chat message ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Chat message retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Chat message not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChatMessagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update chat message by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Chat message ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Chat message updated successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Chat message not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: update_chat_message_dto_1.UpdateChatMessageDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_chat_message_dto_1.UpdateChatMessageDto]),
    __metadata("design:returntype", void 0)
], ChatMessagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete chat message by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Chat message ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Chat message deleted successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Chat message not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChatMessagesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("conversation/:conversationId"),
    (0, swagger_1.ApiOperation)({ summary: "Get chat messages by conversation ID" }),
    (0, swagger_1.ApiParam)({ name: "conversationId", description: "Conversation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Chat messages retrieved successfully",
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
    __metadata("design:returntype", void 0)
], ChatMessagesController.prototype, "findByConversation", null);
__decorate([
    (0, common_1.Patch)(":id/stage"),
    (0, swagger_1.ApiOperation)({ summary: "Update chat message stage" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Chat message ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Chat message stage updated successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Chat message not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                stage: {
                    type: "string",
                    enum: Object.values(prisma_enums_1.MessageType),
                    description: "New stage for the chat message",
                },
            },
            required: ["stage"],
        },
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)("stage")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ChatMessagesController.prototype, "updateStage", null);
__decorate([
    (0, common_1.Get)("conversation/:conversationId/type/:type"),
    (0, swagger_1.ApiOperation)({ summary: "Get chat messages by conversation ID and type" }),
    (0, swagger_1.ApiParam)({ name: "conversationId", description: "Conversation ID" }),
    (0, swagger_1.ApiParam)({
        name: "type",
        description: "Message type (Prompt or Response)",
        enum: prisma_enums_1.MessageType,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Chat messages retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Conversation not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("conversationId")),
    __param(2, (0, common_1.Param)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ChatMessagesController.prototype, "findByType", null);
exports.ChatMessagesController = ChatMessagesController = __decorate([
    (0, swagger_1.ApiTags)("Chat Messages"),
    (0, common_1.Controller)("chat-messages"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __metadata("design:paramtypes", [chat_messages_service_1.ChatMessagesService])
], ChatMessagesController);
//# sourceMappingURL=chat-messages.controller.js.map