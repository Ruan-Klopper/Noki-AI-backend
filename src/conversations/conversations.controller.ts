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
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { ConversationsService } from "./conversations.service";
import { CreateConversationDto } from "./dtos/create-conversation.dto";
import { UpdateConversationDto } from "./dtos/update-conversation.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ApiResponseDto, ApiErrorResponseDto } from "../common/interfaces";

@ApiTags("Conversations")
@Controller("conversations")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new conversation" })
  @ApiResponse({
    status: 201,
    description: "Conversation successfully created",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
    type: ApiErrorResponseDto,
  })
  @ApiBody({ type: CreateConversationDto })
  create(@Request() req, @Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.create(req.user.id, createConversationDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all conversations for the current user" })
  @ApiResponse({
    status: 200,
    description: "Conversations retrieved successfully",
    type: ApiResponseDto,
  })
  findAll(@Request() req) {
    return this.conversationsService.findAll(req.user.id);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a conversation by ID" })
  @ApiParam({ name: "id", description: "Conversation ID" })
  @ApiResponse({
    status: 200,
    description: "Conversation retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
    type: ApiErrorResponseDto,
  })
  findOne(@Request() req, @Param("id") id: string) {
    return this.conversationsService.findOne(id, req.user.id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a conversation" })
  @ApiParam({ name: "id", description: "Conversation ID" })
  @ApiResponse({
    status: 200,
    description: "Conversation updated successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
    type: ApiErrorResponseDto,
  })
  @ApiBody({ type: UpdateConversationDto })
  update(
    @Request() req,
    @Param("id") id: string,
    @Body() updateConversationDto: UpdateConversationDto
  ) {
    return this.conversationsService.update(
      id,
      req.user.id,
      updateConversationDto
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a conversation" })
  @ApiParam({ name: "id", description: "Conversation ID" })
  @ApiResponse({
    status: 200,
    description: "Conversation deleted successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
    type: ApiErrorResponseDto,
  })
  remove(@Request() req, @Param("id") id: string) {
    return this.conversationsService.remove(id, req.user.id);
  }

  @Get("ai-engine/:aiEngineId")
  @ApiOperation({ summary: "Get conversations by AI engine ID" })
  @ApiParam({ name: "aiEngineId", description: "AI Engine ID" })
  @ApiResponse({
    status: 200,
    description: "Conversations retrieved successfully",
    type: ApiResponseDto,
  })
  findByAiEngineId(@Request() req, @Param("aiEngineId") aiEngineId: string) {
    return this.conversationsService.findByAiEngineId(aiEngineId, req.user.id);
  }

  @Patch(":id/ai-engine")
  @ApiOperation({ summary: "Update AI engine ID for a conversation" })
  @ApiParam({ name: "id", description: "Conversation ID" })
  @ApiResponse({
    status: 200,
    description: "AI engine ID updated successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
    type: ApiErrorResponseDto,
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
        aiEngineId: {
          type: "string",
          description: "The AI engine ID",
          example: "gpt-4",
        },
      },
      required: ["aiEngineId"],
    },
  })
  updateAiEngineId(
    @Request() req,
    @Param("id") id: string,
    @Body("aiEngineId") aiEngineId: string
  ) {
    return this.conversationsService.updateAiEngineId(
      id,
      req.user.id,
      aiEngineId
    );
  }
}
