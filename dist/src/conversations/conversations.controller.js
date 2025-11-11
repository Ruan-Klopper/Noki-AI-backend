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
exports.ConversationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const conversations_service_1 = require("./conversations.service");
const create_conversation_dto_1 = require("./dtos/create-conversation.dto");
const update_conversation_dto_1 = require("./dtos/update-conversation.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const interfaces_1 = require("../common/interfaces");
let ConversationsController = class ConversationsController {
    conversationsService;
    constructor(conversationsService) {
        this.conversationsService = conversationsService;
    }
    create(req, createConversationDto) {
        return this.conversationsService.create(req.user.id, createConversationDto);
    }
    findAll(req) {
        return this.conversationsService.findAll(req.user.id);
    }
    findOne(req, id) {
        return this.conversationsService.findOne(id, req.user.id);
    }
    update(req, id, updateConversationDto) {
        return this.conversationsService.update(id, req.user.id, updateConversationDto);
    }
    remove(req, id) {
        return this.conversationsService.remove(id, req.user.id);
    }
    findByAiEngineId(req, aiEngineId) {
        return this.conversationsService.findByAiEngineId(aiEngineId, req.user.id);
    }
    updateAiEngineId(req, id, aiEngineId) {
        return this.conversationsService.updateAiEngineId(id, req.user.id, aiEngineId);
    }
};
exports.ConversationsController = ConversationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new conversation" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Conversation successfully created",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: create_conversation_dto_1.CreateConversationDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_conversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all conversations for the current user" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversations retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a conversation by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Conversation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversation retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Conversation not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a conversation" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Conversation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversation updated successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Conversation not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: update_conversation_dto_1.UpdateConversationDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_conversation_dto_1.UpdateConversationDto]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a conversation" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Conversation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversation deleted successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Conversation not found",
        type: interfaces_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("ai-engine/:aiEngineId"),
    (0, swagger_1.ApiOperation)({ summary: "Get conversations by AI engine ID" }),
    (0, swagger_1.ApiParam)({ name: "aiEngineId", description: "AI Engine ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Conversations retrieved successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("aiEngineId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "findByAiEngineId", null);
__decorate([
    (0, common_1.Patch)(":id/ai-engine"),
    (0, swagger_1.ApiOperation)({ summary: "Update AI engine ID for a conversation" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Conversation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "AI engine ID updated successfully",
        type: interfaces_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid input data",
        type: interfaces_1.ApiErrorResponseDto,
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
                aiEngineId: {
                    type: "string",
                    description: "The AI engine ID",
                    example: "gpt-4",
                },
            },
            required: ["aiEngineId"],
        },
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)("aiEngineId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "updateAiEngineId", null);
exports.ConversationsController = ConversationsController = __decorate([
    (0, swagger_1.ApiTags)("Conversations"),
    (0, common_1.Controller)("conversations"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __metadata("design:paramtypes", [conversations_service_1.ConversationsService])
], ConversationsController);
//# sourceMappingURL=conversations.controller.js.map