import { ApiResponse } from '../interfaces/api-response.interface';
export declare function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T>;
export declare function createErrorResponse(code: string, message: string, details?: any): {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
    };
    timestamp: string;
};
