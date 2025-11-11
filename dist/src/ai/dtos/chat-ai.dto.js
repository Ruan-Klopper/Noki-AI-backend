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
exports.ChatAiDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ProjectIdDto {
    project_id;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Project ID",
        example: "project_123",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectIdDto.prototype, "project_id", void 0);
class TaskIdDto {
    task_id;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Task ID",
        example: "task_123",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskIdDto.prototype, "task_id", void 0);
class TodoIdDto {
    todo_id;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Todo ID",
        example: "todo_123",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TodoIdDto.prototype, "todo_id", void 0);
class ChatAiDto {
    conversation_id;
    prompt;
    projects;
    tasks;
    todos;
}
exports.ChatAiDto = ChatAiDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Conversation ID",
        example: "conv-1234567890-abc123",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatAiDto.prototype, "conversation_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's message/prompt",
        example: "What tasks do I have due this week?",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatAiDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Array of project IDs",
        type: [ProjectIdDto],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProjectIdDto),
    __metadata("design:type", Array)
], ChatAiDto.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Array of task IDs",
        type: [TaskIdDto],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TaskIdDto),
    __metadata("design:type", Array)
], ChatAiDto.prototype, "tasks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Array of todo IDs",
        type: [TodoIdDto],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TodoIdDto),
    __metadata("design:type", Array)
], ChatAiDto.prototype, "todos", void 0);
//# sourceMappingURL=chat-ai.dto.js.map