import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from "@nestjs/common";
import { ChatMessagesService } from "./chat-messages.service";
import { CreateChatMessageDto } from "./dtos/create-chat-message.dto";
import { UpdateChatMessageDto } from "./dtos/update-chat-message.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { MessageRole, ChatStage } from "../../generated/prisma";

@Controller("chat-messages")
@UseGuards(JwtAuthGuard)
export class ChatMessagesController {
  constructor(private readonly chatMessagesService: ChatMessagesService) {}

  @Post()
  create(@Request() req, @Body() createChatMessageDto: CreateChatMessageDto) {
    return this.chatMessagesService.create(req.user.id, createChatMessageDto);
  }

  @Get()
  findAll(@Request() req, @Query("conversationId") conversationId?: string) {
    return this.chatMessagesService.findAll(req.user.id, conversationId);
  }

  @Get(":id")
  findOne(@Request() req, @Param("id") id: string) {
    return this.chatMessagesService.findOne(id, req.user.id);
  }

  @Patch(":id")
  update(
    @Request() req,
    @Param("id") id: string,
    @Body() updateChatMessageDto: UpdateChatMessageDto
  ) {
    return this.chatMessagesService.update(
      id,
      req.user.id,
      updateChatMessageDto
    );
  }

  @Delete(":id")
  remove(@Request() req, @Param("id") id: string) {
    return this.chatMessagesService.remove(id, req.user.id);
  }

  @Get("conversation/:conversationId")
  findByConversation(
    @Request() req,
    @Param("conversationId") conversationId: string
  ) {
    return this.chatMessagesService.findByConversation(
      conversationId,
      req.user.id
    );
  }

  @Patch(":id/stage")
  updateStage(
    @Request() req,
    @Param("id") id: string,
    @Body("stage") stage: ChatStage
  ) {
    return this.chatMessagesService.updateStage(id, req.user.id, stage);
  }

  @Get("conversation/:conversationId/role/:role")
  findByRole(
    @Request() req,
    @Param("conversationId") conversationId: string,
    @Param("role") role: MessageRole
  ) {
    return this.chatMessagesService.findByRole(
      conversationId,
      req.user.id,
      role
    );
  }
}
