import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { AiModule } from "../ai/ai.module";
import { ConversationsModule } from "../conversations/conversations.module";
import { ChatMessagesModule } from "../chat-messages/chat-messages.module";
import { ProjectsModule } from "../projects/projects.module";
import { TasksModule } from "../tasks/tasks.module";

@Module({
  imports: [
    AiModule,
    ConversationsModule,
    ChatMessagesModule,
    ProjectsModule,
    TasksModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
