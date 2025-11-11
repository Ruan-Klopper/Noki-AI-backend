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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChatMessageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const prisma_enums_1 = require("../../common/enums/prisma-enums");
class CreateChatMessageDto {
    conversation_id;
    type;
    prompt;
    projects;
    tasks;
    todos;
    text;
    blocks;
    token_usage;
    metadata;
    embedding_id;
}
exports.CreateChatMessageDto = CreateChatMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The conversation ID this message belongs to",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateChatMessageDto.prototype, "conversation_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The type of message (Prompt or Response)",
        enum: prisma_enums_1.MessageType,
        example: prisma_enums_1.MessageType.Prompt,
    }),
    (0, class_validator_1.IsEnum)(prisma_enums_1.MessageType),
    __metadata("design:type", String)
], CreateChatMessageDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "The user's prompt/question (for Prompt type)",
        example: "What tasks do I have this week?",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChatMessageDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Array of project context (for Prompt type)",
        example: [
            {
                project_id: "proj-1",
                title: "Project Title",
                description: "Description",
                instructor: "",
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], CreateChatMessageDto.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Array of task context (for Prompt type)",
        example: [
            {
                task_id: "task-1",
                title: "Task Title",
                description: "Description",
                due_datetime: "2025-10-29T09:10:06.034Z",
                status: "not_started",
                project_id: "proj-1",
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], CreateChatMessageDto.prototype, "tasks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Array of todo context (for Prompt type)",
        example: [
            {
                todo_id: "todo-1",
                title: "Todo Title",
                description: "Description",
                due_date: "2025-10-29T09:10:06.034Z",
                status: "not_started",
                project_id: "proj-1",
                task_id: "task-1",
                priority: "High",
                estimated_duration: "",
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], CreateChatMessageDto.prototype, "todos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "AI's text response (for Response type)",
        example: "You have 3 tasks due this week...",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChatMessageDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "UI blocks for rich content display (for Response type)",
        example: [{ type: "text", content: "Hello world" }],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateChatMessageDto.prototype, "blocks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Token usage information (for Response type)",
        example: {
            prompt_tokens: 10,
            completion_tokens: 5,
            total_tokens: 15,
            embedding_tokens: 0,
            cost_estimate_usd: 0.001,
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateChatMessageDto.prototype, "token_usage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Additional metadata for the message",
        example: { source: "web", version: "1.0" },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateChatMessageDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Embedding ID for semantic search",
        example: "emb_123456789",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChatMessageDto.prototype, "embedding_id", void 0);
//# sourceMappingURL=create-chat-message.dto.js.map