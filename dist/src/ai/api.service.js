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
var ApiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const globals_1 = require("./globals");
let ApiService = ApiService_1 = class ApiService {
    httpService;
    logger = new common_1.Logger(ApiService_1.name);
    constructor(httpService) {
        this.httpService = httpService;
        this.logger.log(`API Service initialized - Environment: ${globals_1.AI_GLOBALS.is_dev ? "Development" : "Production"}`);
        this.logger.log(`AI Server URL: ${globals_1.AI_GLOBALS.aiServerUrl}`);
        this.logger.log(`Bearer Token configured: ${globals_1.AI_GLOBALS.bearerToken ? "Yes" : "No"}`);
        if (globals_1.AI_GLOBALS.bearerToken) {
            this.logger.log(`Bearer Token length: ${globals_1.AI_GLOBALS.bearerToken.length} characters`);
            this.logger.log(`Bearer Token preview: ${globals_1.AI_GLOBALS.bearerToken.substring(0, 10)}...`);
        }
    }
    getDefaultHeaders() {
        const headers = {
            "Content-Type": "application/json",
        };
        if (globals_1.AI_GLOBALS.bearerToken) {
            headers["Authorization"] = `Bearer ${globals_1.AI_GLOBALS.bearerToken}`;
        }
        else {
            this.logger.warn("AI_BAREAR_TOKEN not configured. Requests will be made without authentication.");
        }
        return headers;
    }
    async makeRequest(config) {
        try {
            const url = `${globals_1.AI_GLOBALS.aiServerUrl}${config.endpoint}`;
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
                    response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                        headers,
                        params: config.params,
                    }));
                    break;
                case "POST":
                    console.log("=== API Service POST Data ===");
                    console.log("URL:", url);
                    console.log("Data:", JSON.stringify(config.data, null, 2));
                    console.log("============================");
                    response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, config.data, {
                        headers,
                        params: config.params,
                    }));
                    break;
                case "PUT":
                    response = await (0, rxjs_1.firstValueFrom)(this.httpService.put(url, config.data, {
                        headers,
                        params: config.params,
                    }));
                    break;
                case "DELETE":
                    response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(url, {
                        headers,
                        params: config.params,
                    }));
                    break;
                case "PATCH":
                    response = await (0, rxjs_1.firstValueFrom)(this.httpService.patch(url, config.data, {
                        headers,
                        params: config.params,
                    }));
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
        }
        catch (error) {
            this.logger.error(`API request failed:`, {
                method: config.method,
                endpoint: config.endpoint,
                error: error.response?.data || error.message,
                status: error.response?.status,
            });
            throw new common_1.HttpException(`Failed to make API request to AI server: ${error.message}`, error.response?.status || common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async get(endpoint, params) {
        return this.makeRequest({
            method: "GET",
            endpoint,
            params,
        });
    }
    async post(endpoint, data, params) {
        return this.makeRequest({
            method: "POST",
            endpoint,
            data,
            params,
        });
    }
    async put(endpoint, data, params) {
        return this.makeRequest({
            method: "PUT",
            endpoint,
            data,
            params,
        });
    }
    async delete(endpoint, params) {
        return this.makeRequest({
            method: "DELETE",
            endpoint,
            params,
        });
    }
    async patch(endpoint, data, params) {
        return this.makeRequest({
            method: "PATCH",
            endpoint,
            data,
            params,
        });
    }
    async healthCheck() {
        try {
            return await this.get("/health");
        }
        catch (error) {
            this.logger.error("AI server health check failed:", error.message);
            throw new common_1.HttpException("AI server is not available", common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = ApiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ApiService);
//# sourceMappingURL=api.service.js.map