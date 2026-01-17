import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * Global response interceptor that wraps all responses in a consistent format
 * Matches the ApiResponseDto interface for frontend compatibility
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // If data is already wrapped in ApiResponse format, return as is
        if (
          data &&
          typeof data === 'object' &&
          'success' in data &&
          'timestamp' in data
        ) {
          return data as ApiResponse<T>;
        }

        // Otherwise, wrap the response in ApiResponse format
        return {
          success: true,
          data: data,
          timestamp: new Date().toISOString(),
        };
      })
    );
  }
}
