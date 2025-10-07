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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";
import { ChatMessagesService } from "./chat-messages.service";
import { CreateChatMessageDto } from "./dtos/create-chat-message.dto";
import { UpdateChatMessageDto } from "./dtos/update-chat-message.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { MessageRole, ChatStage } from "../common/enums/prisma-enums";
import { ApiResponseDto, ApiErrorResponseDto } from "../common/interfaces";

@ApiTags("Chat Messages")
@Controller("chat-messages")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class ChatMessagesController {
  constructor(private readonly chatMessagesService: ChatMessagesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new chat message" })
  @ApiResponse({
    status: 201,
    description: "Chat message successfully created",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
    type: ApiErrorResponseDto,
  })
  @ApiBody({ type: CreateChatMessageDto })
  create(@Request() req, @Body() createChatMessageDto: CreateChatMessageDto) {
    return this.chatMessagesService.create(req.user.id, createChatMessageDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all chat messages" })
  @ApiQuery({
    name: "conversationId",
    required: false,
    description: "Filter messages by conversation ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 200,
    description: "Chat messages retrieved successfully",
    type: ApiResponseDto,
  })
  findAll(@Request() req, @Query("conversationId") conversationId?: string) {
    return this.chatMessagesService.findAll(req.user.id, conversationId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get chat message by ID" })
  @ApiParam({ name: "id", description: "Chat message ID" })
  @ApiResponse({
    status: 200,
    description: "Chat message retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Chat message not found",
    type: ApiErrorResponseDto,
  })
  findOne(@Request() req, @Param("id") id: string) {
    return this.chatMessagesService.findOne(id, req.user.id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update chat message by ID" })
  @ApiParam({ name: "id", description: "Chat message ID" })
  @ApiResponse({
    status: 200,
    description: "Chat message updated successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Chat message not found",
    type: ApiErrorResponseDto,
  })
  @ApiBody({ type: UpdateChatMessageDto })
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
  @ApiOperation({ summary: "Delete chat message by ID" })
  @ApiParam({ name: "id", description: "Chat message ID" })
  @ApiResponse({
    status: 200,
    description: "Chat message deleted successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Chat message not found",
    type: ApiErrorResponseDto,
  })
  remove(@Request() req, @Param("id") id: string) {
    return this.chatMessagesService.remove(id, req.user.id);
  }

  @Get("conversation/:conversationId")
  @ApiOperation({ summary: "Get chat messages by conversation ID" })
  @ApiParam({ name: "conversationId", description: "Conversation ID" })
  @ApiResponse({
    status: 200,
    description: "Chat messages retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
    type: ApiErrorResponseDto,
  })
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
  @ApiOperation({ summary: "Update chat message stage" })
  @ApiParam({ name: "id", description: "Chat message ID" })
  @ApiResponse({
    status: 200,
    description: "Chat message stage updated successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Chat message not found",
    type: ApiErrorResponseDto,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        stage: {
          type: "string",
          enum: Object.values(ChatStage),
          description: "New stage for the chat message",
        },
      },
      required: ["stage"],
    },
  })
  updateStage(
    @Request() req,
    @Param("id") id: string,
    @Body("stage") stage: ChatStage
  ) {
    return this.chatMessagesService.updateStage(id, req.user.id, stage);
  }

  @Get("conversation/:conversationId/role/:role")
  @ApiOperation({ summary: "Get chat messages by conversation ID and role" })
  @ApiParam({ name: "conversationId", description: "Conversation ID" })
  @ApiParam({
    name: "role",
    description: "Message role",
    enum: MessageRole,
  })
  @ApiResponse({
    status: 200,
    description: "Chat messages retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
    type: ApiErrorResponseDto,
  })
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
