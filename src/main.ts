import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global response interceptor for consistent API response format
  app.useGlobalInterceptors(new TransformInterceptor());

  // Apply global exception filter for consistent error response format
  app.useGlobalFilters(new AllExceptionsFilter());

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

  // Enable CORS
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://app.noki.co.za",
      "https://www.app.noki.co.za",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    exposedHeaders: ["Authorization"],
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3000}`
  );
  console.log(
    `Swagger UI is available at: http://localhost:${process.env.PORT ?? 3000}/api`
  );
}
bootstrap();
