import { HttpService } from "@nestjs/axios";
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
export declare class ApiService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    private getDefaultHeaders;
    makeRequest<T = any>(config: ApiRequestConfig): Promise<ApiResponse<T>>;
    get<T = any>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
    post<T = any>(endpoint: string, data?: any, params?: Record<string, any>): Promise<ApiResponse<T>>;
    put<T = any>(endpoint: string, data?: any, params?: Record<string, any>): Promise<ApiResponse<T>>;
    delete<T = any>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
    patch<T = any>(endpoint: string, data?: any, params?: Record<string, any>): Promise<ApiResponse<T>>;
    healthCheck(): Promise<ApiResponse>;
}
