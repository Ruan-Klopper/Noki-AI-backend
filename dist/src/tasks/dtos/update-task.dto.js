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
exports.UpdateTaskDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const interfaces_1 = require("../../common/interfaces");
class UpdateTaskDto {
    title;
    description;
    due_date;
    is_submitted;
    priority;
    raw_canvas_data;
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
], UpdateTaskDto.prototype, "due_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Whether this task has been submitted",
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateTaskDto.prototype, "is_submitted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Priority level of the task",
        enum: interfaces_1.Priority,
        example: interfaces_1.Priority.High,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(interfaces_1.Priority),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Raw canvas data for visual representation",
        example: { nodes: [], edges: [] },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateTaskDto.prototype, "raw_canvas_data", void 0);
//# sourceMappingURL=update-task.dto.js.map