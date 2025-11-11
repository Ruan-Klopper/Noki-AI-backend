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
exports.HTTP_STATUS_CODES = exports.ErrorCode = exports.PaginatedResponseDto = exports.ApiErrorResponseDto = exports.ApiResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ApiResponseDto {
    success;
    data;
    message;
    timestamp;
}
exports.ApiResponseDto = ApiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the request was successful",
        example: true,
    }),
    __metadata("design:type", Boolean)
], ApiResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Response data", required: false }),
    __metadata("design:type", Object)
], ApiResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response message",
        required: false,
        example: "Operation completed successfully",
    }),
    __metadata("design:type", String)
], ApiResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response timestamp",
        example: "2024-01-01T00:00:00.000Z",
    }),
    __metadata("design:type", String)
], ApiResponseDto.prototype, "timestamp", void 0);
class ApiErrorResponseDto {
    success;
    error;
    timestamp;
}
exports.ApiErrorResponseDto = ApiErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the request was successful",
        example: false,
    }),
    __metadata("design:type", Boolean)
], ApiErrorResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Error details",
        type: "object",
        properties: {
            code: {
                type: "string",
                description: "Error code",
                example: "VALIDATION_ERROR",
            },
            message: {
                type: "string",
                description: "Error message",
                example: "Invalid input data",
            },
            details: {
                type: "object",
                description: "Additional error details",
                additionalProperties: true,
            },
        },
    }),
    __metadata("design:type", Object)
], ApiErrorResponseDto.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Error timestamp",
        example: "2024-01-01T00:00:00.000Z",
    }),
    __metadata("design:type", String)
], ApiErrorResponseDto.prototype, "timestamp", void 0);
class PaginatedResponseDto {
    success;
    data;
    pagination;
    timestamp;
}
exports.PaginatedResponseDto = PaginatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the request was successful",
        example: true,
    }),
    __metadata("design:type", Boolean)
], PaginatedResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Array of data items" }),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Pagination metadata",
        type: "object",
        properties: {
            page: { type: "number", description: "Current page number", example: 1 },
            limit: { type: "number", description: "Items per page", example: 10 },
            total: {
                type: "number",
                description: "Total number of items",
                example: 100,
            },
            totalPages: {
                type: "number",
                description: "Total number of pages",
                example: 10,
            },
            hasNext: {
                type: "boolean",
                description: "Whether there is a next page",
                example: true,
            },
            hasPrev: {
                type: "boolean",
                description: "Whether there is a previous page",
                example: false,
            },
        },
    }),
    __metadata("design:type", Object)
], PaginatedResponseDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response timestamp",
        example: "2024-01-01T00:00:00.000Z",
    }),
    __metadata("design:type", String)
], PaginatedResponseDto.prototype, "timestamp", void 0);
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    ErrorCode["FORBIDDEN"] = "FORBIDDEN";
    ErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorCode["BAD_REQUEST"] = "BAD_REQUEST";
    ErrorCode["CONFLICT"] = "CONFLICT";
    ErrorCode["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    ErrorCode["SERVICE_UNAVAILABLE"] = "SERVICE_UNAVAILABLE";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
exports.HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};
//# sourceMappingURL=api-response.interface.js.map