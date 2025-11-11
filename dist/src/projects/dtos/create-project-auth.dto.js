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
exports.CreateProjectAuthDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const interfaces_1 = require("../../common/interfaces");
class CreateProjectAuthDto {
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
exports.CreateProjectAuthDto = CreateProjectAuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The title of the project",
        example: "My Awesome Project",
        minLength: 1,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateProjectAuthDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Detailed description of the project",
        example: "A comprehensive project for learning new technologies",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectAuthDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Source of the project",
        enum: interfaces_1.ProjectSource,
        example: interfaces_1.ProjectSource.Personal,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(interfaces_1.ProjectSource),
    __metadata("design:type", String)
], CreateProjectAuthDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "External system ID for the project",
        example: "canvas_12345",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectAuthDto.prototype, "external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Course code if applicable",
        example: "CS101",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectAuthDto.prototype, "course_code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Hex color code for the project",
        example: "#FF5733",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], CreateProjectAuthDto.prototype, "color_hex", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Time zone for the project",
        example: "America/New_York",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectAuthDto.prototype, "time_zone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Project start date",
        example: "2024-01-01T00:00:00.000Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProjectAuthDto.prototype, "start_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Project end date",
        example: "2024-12-31T23:59:59.000Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProjectAuthDto.prototype, "end_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Raw canvas data for visual representation",
        example: { nodes: [], edges: [] },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProjectAuthDto.prototype, "raw_canvas_data", void 0);
//# sourceMappingURL=create-project-auth.dto.js.map