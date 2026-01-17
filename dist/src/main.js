"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Noki AI Backend API")
        .setDescription("Educational AI Platform API Documentation")
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
    }, "JWT-auth")
        .addTag("Authentication", "User authentication and authorization")
        .addTag("Users", "User management operations")
        .addTag("Projects", "Project management operations")
        .addTag("Tasks", "Task management operations")
        .addTag("Todos", "Todo management operations")
        .addTag("Resources", "Resource management operations")
        .addTag("Canvas", "Canvas operations")
        .addTag("AI", "AI-powered features")
        .addTag("Chat", "Chat and messaging operations")
        .addTag("Chat Messages", "Chat message management operations")
        .addTag("Conversations", "Conversation management operations")
        .addTag("Notifications", "Notification management")
        .addTag("Auth Provider", "External authentication providers")
        .addTag("Misc", "Miscellaneous utility operations")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
    console.log(`Swagger UI is available at: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map