"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const ai_controller_1 = require("./ai.controller");
const ai_service_1 = require("./ai.service");
const api_service_1 = require("./api.service");
const tasks_service_1 = require("../tasks/tasks.service");
const todos_service_1 = require("../todos/todos.service");
const projects_service_1 = require("../projects/projects.service");
const conversations_service_1 = require("../conversations/conversations.service");
const chat_messages_service_1 = require("../chat-messages/chat-messages.service");
const prisma_service_1 = require("../database/prisma.service");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, config_1.ConfigModule],
        controllers: [ai_controller_1.AiController],
        providers: [
            ai_service_1.AiService,
            api_service_1.ApiService,
            tasks_service_1.TasksService,
            todos_service_1.TodosService,
            projects_service_1.ProjectsService,
            conversations_service_1.ConversationsService,
            chat_messages_service_1.ChatMessagesService,
            prisma_service_1.PrismaService,
        ],
        exports: [ai_service_1.AiService, api_service_1.ApiService],
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map