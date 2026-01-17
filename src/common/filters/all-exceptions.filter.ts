import {
  Injectable,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCode } from '../interfaces/api-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Extract error message and details
    let errorMessage = 'Internal server error';
    let errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
    let errorDetails: any = undefined;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        errorMessage = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as any;
        errorMessage = responseObj.message || responseObj.error || errorMessage;
        errorDetails = responseObj.details || responseObj;
      }

      // Map HTTP status to error codes
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          errorCode = ErrorCode.BAD_REQUEST;
          break;
        case HttpStatus.UNAUTHORIZED:
          errorCode = ErrorCode.UNAUTHORIZED;
          break;
        case HttpStatus.FORBIDDEN:
          errorCode = ErrorCode.FORBIDDEN;
          break;
        case HttpStatus.NOT_FOUND:
          errorCode = ErrorCode.NOT_FOUND;
          break;
        case HttpStatus.CONFLICT:
          errorCode = ErrorCode.CONFLICT;
          break;
        case HttpStatus.UNPROCESSABLE_ENTITY:
          errorCode = ErrorCode.VALIDATION_ERROR;
          break;
        case HttpStatus.SERVICE_UNAVAILABLE:
          errorCode = ErrorCode.SERVICE_UNAVAILABLE;
          break;
        default:
          errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
      }
    }

    // Format error message - handle array of messages
    if (Array.isArray(errorMessage)) {
      errorMessage = errorMessage.join(', ');
    } else if (typeof errorMessage !== 'string') {
      errorMessage = String(errorMessage);
    }

    // Return standardized error response matching ApiErrorResponseDto
    response.status(status).json({
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        ...(errorDetails && { details: errorDetails }),
      },
      timestamp: new Date().toISOString(),
    });
  }
}
