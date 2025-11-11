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
exports.UpdateConversationDto = exports.CreateConversationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateConversationDto {
    title;
    description;
    ai_engine_id;
    context_source;
}
exports.CreateConversationDto = CreateConversationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "The title of the conversation",
        example: "Project Planning Discussion",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConversationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Description of the conversation",
        example: "Discussion about the new project requirements",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConversationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "AI engine ID to use for this conversation",
        example: "gpt-4",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConversationDto.prototype, "ai_engine_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Context source for the conversation",
        example: "web",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConversationDto.prototype, "context_source", void 0);
class UpdateConversationDto {
    title;
    description;
    ai_engine_id;
    context_source;
}
exports.UpdateConversationDto = UpdateConversationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "The title of the conversation",
        example: "Updated Project Planning Discussion",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateConversationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Description of the conversation",
        example: "Updated discussion about the new project requirements",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateConversationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "AI engine ID to use for this conversation",
        example: "gpt-4",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateConversationDto.prototype, "ai_engine_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Context source for the conversation",
        example: "web",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateConversationDto.prototype, "context_source", void 0);
//# sourceMappingURL=create-conversation.dto.js.map