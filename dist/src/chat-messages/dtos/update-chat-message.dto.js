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
exports.UpdateChatMessageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateChatMessageDto {
    prompt;
    text;
    blocks;
    token_usage;
    projects;
    tasks;
    todos;
    metadata;
    embedding_id;
}
exports.UpdateChatMessageDto = UpdateChatMessageDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Update the prompt (only for Prompt type messages)",
        example: "Updated question",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateChatMessageDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Update the text response (only for Response type messages)",
        example: "Updated response",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateChatMessageDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Update UI blocks",
        example: [{ type: "text", content: "Updated content" }],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateChatMessageDto.prototype, "blocks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Update token usage",
        example: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateChatMessageDto.prototype, "token_usage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Update projects context",
        example: [{ project_id: "proj-1" }],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], UpdateChatMessageDto.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Update tasks context",
        example: [{ task_id: "task-1" }],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], UpdateChatMessageDto.prototype, "tasks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Update todos context",
        example: [{ todo_id: "todo-1" }],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], UpdateChatMessageDto.prototype, "todos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Update metadata",
        example: { source: "web", version: "1.0" },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateChatMessageDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Update embedding ID",
        example: "emb_123456789",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateChatMessageDto.prototype, "embedding_id", void 0);
//# sourceMappingURL=update-chat-message.dto.js.map