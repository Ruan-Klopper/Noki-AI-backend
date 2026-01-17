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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = exports.ChangePasswordDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dtos/create-user.dto");
const update_user_dto_1 = require("./dtos/update-user.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
class ChangePasswordDto {
    currentPassword;
    newPassword;
}
exports.ChangePasswordDto = ChangePasswordDto;
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async getProfile(req) {
        return this.usersService.findOne(req.user.userId);
    }
    async getAIUsage(req) {
        return this.usersService.getAIUsage(req.user.userId);
    }
    async updateProfile(req, updateUserDto) {
        return this.usersService.update(req.user.userId, updateUserDto);
    }
    async changePassword(req, changePasswordDto) {
        return this.usersService.changePassword(req.user.userId, changePasswordDto.currentPassword, changePasswordDto.newPassword);
    }
    async deleteAccount(req) {
        return this.usersService.remove(req.user.userId);
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new user" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "User successfully created" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad request - Invalid input data" }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all users" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Users retrieved successfully" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("profile"),
    (0, swagger_1.ApiOperation)({ summary: "Get current user profile" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User profile retrieved successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)("ai-usage"),
    (0, swagger_1.ApiOperation)({ summary: "Get AI token usage statistics for current user" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "AI usage statistics retrieved successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAIUsage", null);
__decorate([
    (0, common_1.Patch)("profile"),
    (0, swagger_1.ApiOperation)({ summary: "Update current user profile" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User profile updated successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)("change-password"),
    (0, swagger_1.ApiOperation)({ summary: "Change user password" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Password changed successfully" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Invalid current password" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiBody)({ type: ChangePasswordDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Delete)("account"),
    (0, swagger_1.ApiOperation)({ summary: "Delete current user account" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Account deleted successfully" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get user by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User retrieved successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update user by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User updated successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete user by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User deleted successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)("Users"),
    (0, common_1.Controller)("users"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map