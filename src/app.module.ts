import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "./database/prisma.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { AuthProviderModule } from "./auth-provider/auth-provider.module";
import { ProjectsModule } from "./projects/projects.module";
import { TasksModule } from "./tasks/tasks.module";
import { TodosModule } from "./todos/todos.module";
import { ResourcesModule } from "./resources/resources.module";
import { CanvasModule } from "./canvas/canvas.module";
import { AiModule } from "./ai/ai.module";
import { ConversationsModule } from "./conversations/conversations.module";
import { ChatMessagesModule } from "./chat-messages/chat-messages.module";
import { ChatModule } from "./chat/chat.module";
import { GoogleModule } from "./integrations/google/google.module";
import { EmailModule } from "./email/email.module";
import { MiscModule } from "./misc/misc.module";
import prismaConfig from "./config/prisma.config";
import authConfig from "./config/auth.config";
import aiConfig from "./config/ai.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [prismaConfig, authConfig, aiConfig],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || "default-secret-key",
      signOptions: { expiresIn: "24h" },
    }),
    AuthModule,
    UsersModule,
    AuthProviderModule,
    ProjectsModule,
    TasksModule,
    TodosModule,
    ResourcesModule,
    CanvasModule,
    AiModule,
    ConversationsModule,
    ChatMessagesModule,
    ChatModule,
    GoogleModule,
    EmailModule,
    MiscModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
