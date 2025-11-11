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
exports.UpdateProjectDto = exports.CreateProjectDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const interfaces_1 = require("../../common/interfaces");
class CreateProjectDto {
    user_id;
    title;
    description;
    source;
    external_id;
    course_code;
    color_hex;
    time_zone;
    start_at;
    end_at;
    raw_canvas_data;
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user ID who owns this project",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The title of the project",
        example: "My Awesome Project",
        minLength: 1,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Detailed description of the project",
        example: "A comprehensive project for learning new technologies",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Source of the project",
        enum: interfaces_1.ProjectSource,
        example: interfaces_1.ProjectSource.Personal,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(interfaces_1.ProjectSource),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "External system ID for the project",
        example: "canvas_12345",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Course code if applicable",
        example: "CS101",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "course_code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Hex color code for the project",
        example: "#FF5733",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "color_hex", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Time zone for the project",
        example: "America/New_York",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "time_zone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Project start date",
        example: "2024-01-01T00:00:00.000Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "start_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Project end date",
        example: "2024-12-31T23:59:59.000Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "end_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Raw canvas data for visual representation",
        example: { nodes: [], edges: [] },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProjectDto.prototype, "raw_canvas_data", void 0);
class UpdateProjectDto {
    title;
    description;
    source;
    external_id;
    course_code;
    color_hex;
    time_zone;
    start_at;
    end_at;
    raw_canvas_data;
}
exports.UpdateProjectDto = UpdateProjectDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "The title of the project",
        example: "Updated Project Title",
        minLength: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Detailed description of the project",
        example: "Updated project description",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Source of the project",
        enum: interfaces_1.ProjectSource,
        example: interfaces_1.ProjectSource.Canvas,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(interfaces_1.ProjectSource),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "External system ID for the project",
        example: "canvas_67890",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Course code if applicable",
        example: "CS201",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "course_code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Hex color code for the project",
        example: "#33FF57",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "color_hex", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Time zone for the project",
        example: "Europe/London",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "time_zone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Project start date",
        example: "2024-02-01T00:00:00.000Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "start_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Project end date",
        example: "2024-11-30T23:59:59.000Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "end_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Raw canvas data for visual representation",
        example: { nodes: [], edges: [] },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateProjectDto.prototype, "raw_canvas_data", void 0);
//# sourceMappingURL=create-project.dto.js.map