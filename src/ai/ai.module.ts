import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";
import { ApiService } from "./api.service";
import { TasksService } from "../tasks/tasks.service";
import { TodosService } from "../todos/todos.service";
import { ProjectsService } from "../projects/projects.service";
import { ConversationsService } from "../conversations/conversations.service";
import { ChatMessagesService } from "../chat-messages/chat-messages.service";
import { PrismaService } from "../database/prisma.service";

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [AiController],
  providers: [
    AiService,
    ApiService,
    TasksService,
    TodosService,
    ProjectsService,
    ConversationsService,
    ChatMessagesService,
    PrismaService,
  ],
  exports: [AiService, ApiService],
})
export class AiModule {}
