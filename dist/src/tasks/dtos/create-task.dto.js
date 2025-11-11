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
exports.UpdateTaskDto = exports.CreateTaskDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const interfaces_1 = require("../../common/interfaces");
class CreateTaskDto {
    user_id;
    project_id;
    title;
    description;
    due_date;
    is_all_day;
    is_submitted;
    type;
    priority;
    raw_canvas_data;
}
exports.CreateTaskDto = CreateTaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user ID who owns this task",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "The project ID this task belongs to",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "project_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The title of the task",
        example: "Complete project documentation",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Detailed description of the task",
        example: "Write comprehensive documentation for the new feature",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Due date for the task",
        example: "2024-12-31T23:59:59.000Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "due_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Whether this task is an all-day task",
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTaskDto.prototype, "is_all_day", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Whether this task has been submitted",
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTaskDto.prototype, "is_submitted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Type of the task",
        enum: interfaces_1.TaskType,
        example: interfaces_1.TaskType.Personal,
    }),
    (0, class_validator_1.IsEnum)(interfaces_1.TaskType),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Priority level of the task",
        enum: interfaces_1.Priority,
        example: interfaces_1.Priority.High,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(interfaces_1.Priority),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Raw canvas data for visual representation",
        example: { nodes: [], edges: [] },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateTaskDto.prototype, "raw_canvas_data", void 0);
class UpdateTaskDto {
    title;
    description;
    dueDate;
    is_all_day;
    status;
}
exports.UpdateTaskDto = UpdateTaskDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "The title of the task",
        example: "Updated task title",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Detailed description of the task",
        example: "Updated task description",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Due date for the task",
        example: "2024-12-31T23:59:59.000Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Whether this task is an all-day task",
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateTaskDto.prototype, "is_all_day", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Status of the task",
        example: "completed",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "status", void 0);
//# sourceMappingURL=create-task.dto.js.map