import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * Utility functions for creating consistent API responses
 */

/**
 * Creates a successful API response
 * @param data The response data
 * @param message Optional success message
 * @returns Formatted ApiResponse
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string
): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(message && { message }),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates an error API response
 * @param code Error code
 * @param message Error message
 * @param details Optional error details
 * @returns Formatted ApiErrorResponse
 */
export function createErrorResponse(
  code: string,
  message: string,
  details?: any
): {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
} {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
    timestamp: new Date().toISOString(),
  };
}
