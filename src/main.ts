import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Noki AI Backend API")
    .setDescription("Educational AI Platform API Documentation")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth"
    )
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Enable CORS for development
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3000}`
  );
  console.log(
    `Swagger UI is available at: http://localhost:${process.env.PORT ?? 3000}/api`
  );
}
bootstrap();
