import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ChatService, SendMessageDto } from "./chat.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("chat")
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("send")
  async sendMessage(@Request() req, @Body() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(req.user.id, sendMessageDto);
  }

  @Post("continue/:conversationId")
  async continueWithContext(
    @Request() req,
    @Param("conversationId") conversationId: string,
    @Body() contextData: any
  ) {
    return this.chatService.continueWithContext(
      req.user.id,
      conversationId,
      contextData
    );
  }

  @Get("history/:conversationId")
  async getConversationHistory(
    @Request() req,
    @Param("conversationId") conversationId: string
  ) {
    return this.chatService.getConversationHistory(req.user.id, conversationId);
  }

  @Post("embed/resource/:resourceId")
  async embedResource(
    @Request() req,
    @Param("resourceId") resourceId: string,
    @Body("conversationId") conversationId: string
  ) {
    return this.chatService.embedResource(
      req.user.id,
      resourceId,
      conversationId
    );
  }

  @Post("embed/message/:messageId")
  async embedMessage(
    @Request() req,
    @Param("messageId") messageId: string,
    @Body("conversationId") conversationId: string
  ) {
    return this.chatService.embedMessage(
      req.user.id,
      messageId,
      conversationId
    );
  }

  @Post("intent/:conversationId")
  async handleIntent(
    @Request() req,
    @Param("conversationId") conversationId: string,
    @Body() intent: any
  ) {
    return this.chatService.handleIntent(req.user.id, conversationId, intent);
  }
}
