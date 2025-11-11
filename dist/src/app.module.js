"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("./database/prisma.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const auth_provider_module_1 = require("./auth-provider/auth-provider.module");
const projects_module_1 = require("./projects/projects.module");
const tasks_module_1 = require("./tasks/tasks.module");
const todos_module_1 = require("./todos/todos.module");
const resources_module_1 = require("./resources/resources.module");
const canvas_module_1 = require("./canvas/canvas.module");
const ai_module_1 = require("./ai/ai.module");
const conversations_module_1 = require("./conversations/conversations.module");
const chat_messages_module_1 = require("./chat-messages/chat-messages.module");
const chat_module_1 = require("./chat/chat.module");
const google_module_1 = require("./integrations/google/google.module");
const email_module_1 = require("./email/email.module");
const misc_module_1 = require("./misc/misc.module");
const prisma_config_1 = require("./config/prisma.config");
const auth_config_1 = require("./config/auth.config");
const ai_config_1 = require("./config/ai.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [prisma_config_1.default, auth_config_1.default, ai_config_1.default],
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET || "default-secret-key",
                signOptions: { expiresIn: "24h" },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            auth_provider_module_1.AuthProviderModule,
            projects_module_1.ProjectsModule,
            tasks_module_1.TasksModule,
            todos_module_1.TodosModule,
            resources_module_1.ResourcesModule,
            canvas_module_1.CanvasModule,
            ai_module_1.AiModule,
            conversations_module_1.ConversationsModule,
            chat_messages_module_1.ChatMessagesModule,
            chat_module_1.ChatModule,
            google_module_1.GoogleModule,
            email_module_1.EmailModule,
            misc_module_1.MiscModule,
        ],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map