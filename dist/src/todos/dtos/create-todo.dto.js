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
exports.UpdateTodoDto = exports.CreateTodoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const interfaces_1 = require("../../common/interfaces");
class CreateTodoDto {
    user_id;
    task_id;
    title;
    description;
    priority;
    due_date;
    is_all_day;
    is_submitted;
}
exports.CreateTodoDto = CreateTodoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user ID who owns this todo",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The task ID this todo belongs to",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "task_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The title of the todo",
        example: "Review code changes",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Detailed description of the todo",
        example: "Review the latest pull request for bugs",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Priority level of the todo",
        enum: interfaces_1.Priority,
        example: interfaces_1.Priority.Medium,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(interfaces_1.Priority),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Due date for the todo",
        example: "2024-12-31T23:59:59.000Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "due_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Whether this todo is an all-day todo",
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTodoDto.prototype, "is_all_day", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Whether this todo has been submitted",
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTodoDto.prototype, "is_submitted", void 0);
class UpdateTodoDto {
    title;
    description;
    priority;
    due_date;
    is_all_day;
    is_submitted;
}
exports.UpdateTodoDto = UpdateTodoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "The title of the todo",
        example: "Updated todo title",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTodoDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Detailed description of the todo",
        example: "Updated todo description",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTodoDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Priority level of the todo",
        enum: interfaces_1.Priority,
        example: interfaces_1.Priority.High,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(interfaces_1.Priority),
    __metadata("design:type", String)
], UpdateTodoDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Due date for the todo",
        example: "2024-12-31T23:59:59.000Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateTodoDto.prototype, "due_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Whether this todo is an all-day todo",
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateTodoDto.prototype, "is_all_day", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Whether this todo has been submitted",
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateTodoDto.prototype, "is_submitted", void 0);
//# sourceMappingURL=create-todo.dto.js.map