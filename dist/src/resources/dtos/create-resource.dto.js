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
exports.UpdateResourceDto = exports.CreateResourceDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const interfaces_1 = require("../../common/interfaces");
class CreateResourceDto {
    user_id;
    title;
    description;
    type;
    url;
    file_path;
    metadata;
    task_id;
    project_id;
}
exports.CreateResourceDto = CreateResourceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user ID who owns this resource",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The title of the resource",
        example: "Important Documentation",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Detailed description of the resource",
        example: "Comprehensive guide for the project",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Type of the resource",
        enum: interfaces_1.ResourceType,
        example: interfaces_1.ResourceType.Document,
    }),
    (0, class_validator_1.IsEnum)(interfaces_1.ResourceType),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "URL link to the resource",
        example: "https://example.com/document.pdf",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "File path for local resources",
        example: "/uploads/document.pdf",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "file_path", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Additional metadata for the resource",
        example: { author: "John Doe", version: "1.0" },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateResourceDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Associated task ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "task_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Associated project ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "project_id", void 0);
class UpdateResourceDto {
    title;
    description;
    type;
    url;
    file_path;
    metadata;
}
exports.UpdateResourceDto = UpdateResourceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "The title of the resource",
        example: "Updated Resource Title",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Detailed description of the resource",
        example: "Updated resource description",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Type of the resource",
        enum: interfaces_1.ResourceType,
        example: interfaces_1.ResourceType.Link,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(interfaces_1.ResourceType),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "URL link to the resource",
        example: "https://example.com/updated-document.pdf",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "File path for local resources",
        example: "/uploads/updated-document.pdf",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "file_path", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Additional metadata for the resource",
        example: { author: "Jane Doe", version: "2.0" },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateResourceDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-resource.dto.js.map