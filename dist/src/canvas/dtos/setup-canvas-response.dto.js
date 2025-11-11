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
exports.SetupCanvasResponseDto = exports.CanvasUserDetails = void 0;
const swagger_1 = require("@nestjs/swagger");
class CanvasUserDetails {
    id;
    name;
    created_at;
    sortable_name;
    short_name;
    avatar_url;
    last_name;
    first_name;
    locale;
    effective_locale;
    permissions;
}
exports.CanvasUserDetails = CanvasUserDetails;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Canvas user ID",
        example: 3346,
    }),
    __metadata("design:type", Number)
], CanvasUserDetails.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Full name of the Canvas user",
        example: "Ruan Klopper",
    }),
    __metadata("design:type", String)
], CanvasUserDetails.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User creation date",
        example: "2023-02-06T12:49:30+02:00",
    }),
    __metadata("design:type", String)
], CanvasUserDetails.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Sortable name format",
        example: "Klopper, Ruan",
    }),
    __metadata("design:type", String)
], CanvasUserDetails.prototype, "sortable_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Short name",
        example: "Ruan Klopper",
    }),
    __metadata("design:type", String)
], CanvasUserDetails.prototype, "short_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Avatar URL",
        example: "https://uxi.instructure.com/images/messages/avatar-50.png",
    }),
    __metadata("design:type", String)
], CanvasUserDetails.prototype, "avatar_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last name",
        example: "Klopper",
    }),
    __metadata("design:type", String)
], CanvasUserDetails.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "First name",
        example: "Ruan",
    }),
    __metadata("design:type", String)
], CanvasUserDetails.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User locale",
        example: null,
    }),
    __metadata("design:type", Object)
], CanvasUserDetails.prototype, "locale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Effective locale",
        example: "en-GB",
    }),
    __metadata("design:type", String)
], CanvasUserDetails.prototype, "effective_locale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User permissions",
        example: {
            can_update_name: false,
            can_update_avatar: true,
            limit_parent_app_web_access: false,
        },
    }),
    __metadata("design:type", Object)
], CanvasUserDetails.prototype, "permissions", void 0);
class SetupCanvasResponseDto {
    message;
    user_details;
}
exports.SetupCanvasResponseDto = SetupCanvasResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Success message",
        example: "Canvas Linked successfully",
    }),
    __metadata("design:type", String)
], SetupCanvasResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Canvas user details",
        type: CanvasUserDetails,
    }),
    __metadata("design:type", CanvasUserDetails)
], SetupCanvasResponseDto.prototype, "user_details", void 0);
//# sourceMappingURL=setup-canvas-response.dto.js.map