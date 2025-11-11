export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    timestamp: string;
}
export interface ApiErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
    };
    timestamp: string;
}
export declare class ApiResponseDto<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    timestamp: string;
}
export declare class ApiErrorResponseDto {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
    };
    timestamp: string;
}
export declare class PaginatedResponseDto<T = any> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    timestamp: string;
}
export declare enum ErrorCode {
    VALIDATION_ERROR = "VALIDATION_ERROR",
    NOT_FOUND = "NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    BAD_REQUEST = "BAD_REQUEST",
    CONFLICT = "CONFLICT",
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE"
}
export declare const HTTP_STATUS_CODES: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly INTERNAL_SERVER_ERROR: 500;
    readonly SERVICE_UNAVAILABLE: 503;
};
