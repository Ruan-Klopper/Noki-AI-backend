import { Injectable, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AI_GLOBALS } from "./globals";

export interface ApiRequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

@Injectable()
export class ApiService {
  private readonly logger = new Logger(ApiService.name);

  constructor(private readonly httpService: HttpService) {
    this.logger.log(
      `API Service initialized - Environment: ${AI_GLOBALS.is_dev ? "Development" : "Production"}`
    );
    this.logger.log(`AI Server URL: ${AI_GLOBALS.aiServerUrl}`);
    this.logger.log(
      `Bearer Token configured: ${AI_GLOBALS.bearerToken ? "Yes" : "No"}`
    );
    if (AI_GLOBALS.bearerToken) {
      this.logger.log(
        `Bearer Token length: ${AI_GLOBALS.bearerToken.length} characters`
      );
      this.logger.log(
        `Bearer Token preview: ${AI_GLOBALS.bearerToken.substring(0, 10)}...`
      );
    }
  }

  /**
   * Get default headers with bearer token authentication
   */
  private getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (AI_GLOBALS.bearerToken) {
      headers["Authorization"] = `Bearer ${AI_GLOBALS.bearerToken}`;
    } else {
      this.logger.warn(
        "AI_BAREAR_TOKEN not configured. Requests will be made without authentication."
      );
    }

    return headers;
  }

  /**
   * Make a generic API request to the AI server
   */
  async makeRequest<T = any>(
    config: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${AI_GLOBALS.aiServerUrl}${config.endpoint}`;
      const headers = { ...this.getDefaultHeaders(), ...config.headers };

      this.logger.log(`Making ${config.method} request to: ${url}`);
      this.logger.log(`Request headers:`, {
        "Content-Type": headers["Content-Type"],
        Authorization: headers["Authorization"]
          ? `${headers["Authorization"].substring(0, 20)}...`
          : "Not set",
      });

      let response;

      switch (config.method) {
        case "GET":
          response = await firstValueFrom(
            this.httpService.get(url, {
              headers,
              params: config.params,
            })
          );
          break;

        case "POST":
          response = await firstValueFrom(
            this.httpService.post(url, config.data, {
              headers,
              params: config.params,
            })
          );
          break;

        case "PUT":
          response = await firstValueFrom(
            this.httpService.put(url, config.data, {
              headers,
              params: config.params,
            })
          );
          break;

        case "DELETE":
          response = await firstValueFrom(
            this.httpService.delete(url, {
              headers,
              params: config.params,
            })
          );
          break;

        case "PATCH":
          response = await firstValueFrom(
            this.httpService.patch(url, config.data, {
              headers,
              params: config.params,
            })
          );
          break;

        default:
          throw new Error(`Unsupported HTTP method: ${config.method}`);
      }

      this.logger.log(`Request successful - Status: ${response.status}`);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      this.logger.error(`API request failed:`, {
        method: config.method,
        endpoint: config.endpoint,
        error: error.response?.data || error.message,
        status: error.response?.status,
      });

      throw new HttpException(
        `Failed to make API request to AI server: ${error.message}`,
        error.response?.status || HttpStatus.BAD_GATEWAY
      );
    }
  }

  /**
   * Convenience method for GET requests
   */
  async get<T = any>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: "GET",
      endpoint,
      params,
    });
  }

  /**
   * Convenience method for POST requests
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: "POST",
      endpoint,
      data,
      params,
    });
  }

  /**
   * Convenience method for PUT requests
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: "PUT",
      endpoint,
      data,
      params,
    });
  }

  /**
   * Convenience method for DELETE requests
   */
  async delete<T = any>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: "DELETE",
      endpoint,
      params,
    });
  }

  /**
   * Convenience method for PATCH requests
   */
  async patch<T = any>(
    endpoint: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: "PATCH",
      endpoint,
      data,
      params,
    });
  }

  /**
   * Health check for the AI server
   */
  async healthCheck(): Promise<ApiResponse> {
    try {
      return await this.get("/health");
    } catch (error) {
      this.logger.error("AI server health check failed:", error.message);
      throw new HttpException(
        "AI server is not available",
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}
