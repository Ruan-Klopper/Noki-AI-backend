"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const api_response_interface_1 = require("../interfaces/api-response.interface");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let errorMessage = 'Internal server error';
        let errorCode = api_response_interface_1.ErrorCode.INTERNAL_SERVER_ERROR;
        let errorDetails = undefined;
        if (exception instanceof common_1.HttpException) {
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                errorMessage = exceptionResponse;
            }
            else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const responseObj = exceptionResponse;
                errorMessage = responseObj.message || responseObj.error || errorMessage;
                errorDetails = responseObj.details || responseObj;
            }
            switch (status) {
                case common_1.HttpStatus.BAD_REQUEST:
                    errorCode = api_response_interface_1.ErrorCode.BAD_REQUEST;
                    break;
                case common_1.HttpStatus.UNAUTHORIZED:
                    errorCode = api_response_interface_1.ErrorCode.UNAUTHORIZED;
                    break;
                case common_1.HttpStatus.FORBIDDEN:
                    errorCode = api_response_interface_1.ErrorCode.FORBIDDEN;
                    break;
                case common_1.HttpStatus.NOT_FOUND:
                    errorCode = api_response_interface_1.ErrorCode.NOT_FOUND;
                    break;
                case common_1.HttpStatus.CONFLICT:
                    errorCode = api_response_interface_1.ErrorCode.CONFLICT;
                    break;
                case common_1.HttpStatus.UNPROCESSABLE_ENTITY:
                    errorCode = api_response_interface_1.ErrorCode.VALIDATION_ERROR;
                    break;
                case common_1.HttpStatus.SERVICE_UNAVAILABLE:
                    errorCode = api_response_interface_1.ErrorCode.SERVICE_UNAVAILABLE;
                    break;
                default:
                    errorCode = api_response_interface_1.ErrorCode.INTERNAL_SERVER_ERROR;
            }
        }
        if (Array.isArray(errorMessage)) {
            errorMessage = errorMessage.join(', ');
        }
        else if (typeof errorMessage !== 'string') {
            errorMessage = String(errorMessage);
        }
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
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map