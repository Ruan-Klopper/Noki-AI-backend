import { Module } from "@nestjs/common";
import { ChatMessagesService } from "./chat-messages.service";
import { ChatMessagesController } from "./chat-messages.controller";
import { PrismaModule } from "../database/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ChatMessagesController],
  providers: [ChatMessagesService],
  exports: [ChatMessagesService],
})
export class ChatMessagesModule {}
