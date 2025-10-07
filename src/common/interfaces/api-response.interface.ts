import { ApiProperty } from "@nestjs/swagger";

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

export class ApiResponseDto<T = any> {
  @ApiProperty({
    description: "Indicates if the request was successful",
    example: true,
  })
  success: boolean;

  @ApiProperty({ description: "Response data", required: false })
  data?: T;

  @ApiProperty({
    description: "Response message",
    required: false,
    example: "Operation completed successfully",
  })
  message?: string;

  @ApiProperty({
    description: "Response timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  timestamp: string;
}

export class ApiErrorResponseDto {
  @ApiProperty({
    description: "Indicates if the request was successful",
    example: false,
  })
  success: false;

  @ApiProperty({
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
      },
    },
  })
  error: {
    code: string;
    message: string;
    details?: any;
  };

  @ApiProperty({
    description: "Error timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  timestamp: string;
}

export class PaginatedResponseDto<T = any> {
  @ApiProperty({
    description: "Indicates if the request was successful",
    example: true,
  })
  success: boolean;

  @ApiProperty({ description: "Array of data items" })
  data: T[];

  @ApiProperty({
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
  })
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };

  @ApiProperty({
    description: "Response timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  timestamp: string;
}

// Common error codes
export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  CONFLICT = "CONFLICT",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
}

// HTTP status codes mapping
export const HTTP_STATUS_CODES = {
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
} as const;
