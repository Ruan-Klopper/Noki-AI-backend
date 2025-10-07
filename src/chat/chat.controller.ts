import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { ChatService, SendMessageDto } from "./chat.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ApiResponseDto, ApiErrorResponseDto } from "../common/interfaces";

@ApiTags("Chat")
@Controller("chat")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("send")
  @ApiOperation({ summary: "Send a chat message" })
  @ApiResponse({
    status: 200,
    description: "Message sent successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
    type: ApiErrorResponseDto,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        message: { type: "string", description: "The message content" },
        conversationId: { type: "string", description: "Conversation ID" },
        contextSource: { type: "string", description: "Context source" },
        projectId: { type: "string", description: "Project ID" },
        taskId: { type: "string", description: "Task ID" },
      },
      required: ["message"],
    },
  })
  async sendMessage(@Request() req, @Body() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(req.user.id, sendMessageDto);
  }

  @Post("continue/:conversationId")
  @ApiOperation({ summary: "Continue conversation with context" })
  @ApiParam({ name: "conversationId", description: "Conversation ID" })
  @ApiResponse({
    status: 200,
    description: "Conversation continued successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
    type: ApiErrorResponseDto,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        contextData: {
          type: "object",
          description: "Context data for continuation",
        },
      },
      required: ["contextData"],
    },
  })
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
  @ApiOperation({ summary: "Get conversation history" })
  @ApiParam({ name: "conversationId", description: "Conversation ID" })
  @ApiResponse({
    status: 200,
    description: "Conversation history retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
    type: ApiErrorResponseDto,
  })
  async getConversationHistory(
    @Request() req,
    @Param("conversationId") conversationId: string
  ) {
    return this.chatService.getConversationHistory(req.user.id, conversationId);
  }

  @Post("embed/resource/:resourceId")
  @ApiOperation({ summary: "Embed a resource into conversation" })
  @ApiParam({ name: "resourceId", description: "Resource ID" })
  @ApiResponse({
    status: 200,
    description: "Resource embedded successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Resource not found",
    type: ApiErrorResponseDto,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        conversationId: { type: "string", description: "Conversation ID" },
      },
      required: ["conversationId"],
    },
  })
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
  @ApiOperation({ summary: "Embed a message into conversation" })
  @ApiParam({ name: "messageId", description: "Message ID" })
  @ApiResponse({
    status: 200,
    description: "Message embedded successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Message not found",
    type: ApiErrorResponseDto,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        conversationId: { type: "string", description: "Conversation ID" },
      },
      required: ["conversationId"],
    },
  })
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
  @ApiOperation({ summary: "Handle conversation intent" })
  @ApiParam({ name: "conversationId", description: "Conversation ID" })
  @ApiResponse({
    status: 200,
    description: "Intent handled successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
    type: ApiErrorResponseDto,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        intent: { type: "object", description: "Intent data" },
      },
      required: ["intent"],
    },
  })
  async handleIntent(
    @Request() req,
    @Param("conversationId") conversationId: string,
    @Body() intent: any
  ) {
    return this.chatService.handleIntent(req.user.id, conversationId, intent);
  }
}
