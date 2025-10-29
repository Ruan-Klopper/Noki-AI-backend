import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AiService, HealthResponse, AIServerChatResponse } from "./ai.service";
import { ChatAiDto } from "./dtos/chat-ai.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@ApiTags("AI")
@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get("health")
  @ApiOperation({
    summary: "Check AI server health",
    description:
      "Returns the health status of both this service and the AI server",
  })
  @ApiResponse({
    status: 200,
    description: "Health check successful",
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "ok" },
        timestamp: { type: "string", example: "2024-01-01T00:00:00.000Z" },
        environment: { type: "string", example: "development" },
        ai_server_url: { type: "string", example: "http://localhost:8000/" },
        ai_server_response: {
          type: "object",
          description: "Response from AI server",
        },
        error: {
          type: "string",
          description: "Error message if AI server is unavailable",
        },
      },
    },
  })
  @ApiResponse({ status: 502, description: "AI server is not available" })
  async healthCheck(): Promise<HealthResponse> {
    return this.aiService.healthCheck();
  }

  @Post("chat")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Send chat message to AI server",
    description:
      "Sends a chat message to the AI server with project, task, and todo context. " +
      "User ID is automatically extracted from the JWT bearer token. " +
      "The backend enriches the request by fetching full details for each provided project_id, task_id, and todo_id, " +
      "then forwards the enriched data to the AI server's /chat/chat endpoint.",
  })
  @ApiBody({
    type: ChatAiDto,
    description:
      "Chat request with conversation ID, prompt, and optional context IDs",
    schema: {
      type: "object",
      required: ["conversation_id", "prompt"],
      properties: {
        conversation_id: {
          type: "string",
          description: "Unique identifier for the conversation",
          example: "conv-1234567890-abc123",
        },
        prompt: {
          type: "string",
          description: "User's message/question to the AI",
          example: "What tasks do I have due this week?",
        },
        projects: {
          type: "array",
          description:
            "Optional array of project IDs. Backend will fetch full project details (title, description, instructor) for each ID.",
          items: {
            type: "object",
            required: ["project_id"],
            properties: {
              project_id: {
                type: "string",
                description: "Project ID to include in context",
                example: "proj_123",
              },
            },
          },
          example: [{ project_id: "proj_123" }, { project_id: "proj_456" }],
        },
        tasks: {
          type: "array",
          description:
            "Optional array of task IDs. Backend will fetch full task details (title, description, due_datetime, status, project_id) for each ID.",
          items: {
            type: "object",
            required: ["task_id"],
            properties: {
              task_id: {
                type: "string",
                description: "Task ID to include in context",
                example: "task_123",
              },
            },
          },
          example: [{ task_id: "task_123" }],
        },
        todos: {
          type: "array",
          description:
            "Optional array of todo IDs. Backend will fetch full todo details (title, description, due_date, status, project_id, task_id, priority) for each ID.",
          items: {
            type: "object",
            required: ["todo_id"],
            properties: {
              todo_id: {
                type: "string",
                description: "Todo ID to include in context",
                example: "todo_123",
              },
            },
          },
          example: [{ todo_id: "todo_123" }],
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description:
      "Chat response received successfully from AI server. Returns the exact response from the AI server without modifications.",
    schema: {
      type: "object",
      description:
        "Response structure from AI server. The exact fields may vary based on the AI's response. Common fields are listed below.",
      properties: {
        stage: {
          type: "string",
          description: "Current stage of the AI response",
          example: "response",
        },
        conversation_id: {
          type: "string",
          description: "Conversation ID used for the chat",
          example: "conv-1234567890-abc123",
        },
        text: {
          type: "string",
          description: "AI's text response",
          example: "You have 3 tasks due this week...",
        },
        blocks: {
          type: "array",
          description: "Structured UI blocks from AI (if any)",
          items: { type: "object" },
        },
        timestamp: {
          type: "string",
          description: "Response timestamp",
          example: "2025-10-29T09:10:06.034Z",
        },
        token_usage: {
          type: "object",
          description: "Token usage statistics (if provided)",
          properties: {
            prompt_tokens: { type: "number", example: 150 },
            completion_tokens: { type: "number", example: 200 },
            total_tokens: { type: "number", example: 350 },
            embedding_tokens: { type: "number", example: 0 },
            cost_estimate_usd: { type: "number", example: 0.0052 },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data or missing required fields",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({
    status: 404,
    description: "Not found - One or more project/task/todo IDs not found",
  })
  @ApiResponse({
    status: 502,
    description:
      "Bad Gateway - AI server is not available or returned an error",
  })
  async chat(
    @CurrentUser() currentUser: any,
    @Body() chatDto: ChatAiDto
  ): Promise<AIServerChatResponse> {
    return this.aiService.chat(currentUser.userId, chatDto);
  }

  @Post("new_conversation")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Create a new conversation",
    description:
      "Creates a new conversation for the current user. Returns only the conversation ID. " +
      "The conversation title will be 'New Conversation' with the current date.",
  })
  @ApiResponse({
    status: 201,
    description: "Conversation created successfully",
    schema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "string",
          description: "Unique identifier for the newly created conversation",
          example: "123e4567-e89b-12d3-a456-426614174000",
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  async createConversation(@CurrentUser() currentUser: any) {
    return this.aiService.createConversation(currentUser.userId);
  }

  @Get("get_conversation_history/:conversation_id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Get conversation history",
    description:
      "Returns the full conversation history including all messages for a specific conversation ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Conversation history retrieved successfully",
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "123e4567-e89b-12d3-a456-426614174000",
        },
        title: {
          type: "string",
          example: "New Conversation - 2025-10-29",
        },
        description: { type: "string", nullable: true },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
        messages: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              type: { type: "string", enum: ["Prompt", "Response"] },
              prompt: { type: "string", nullable: true },
              text: { type: "string", nullable: true },
              blocks: { type: "object", nullable: true },
              projects: { type: "array", nullable: true },
              tasks: { type: "array", nullable: true },
              todos: { type: "array", nullable: true },
              created_at: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You do not have access to this conversation",
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
  })
  async getConversationHistory(
    @CurrentUser() currentUser: any,
    @Param("conversation_id") conversationId: string
  ) {
    return this.aiService.getConversationHistory(
      currentUser.userId,
      conversationId
    );
  }

  @Get("get_all_conversations")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Get all conversations",
    description:
      "Returns all conversations for the current user with their IDs and titles.",
  })
  @ApiResponse({
    status: 200,
    description: "Conversations retrieved successfully",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
          title: {
            type: "string",
            example: "New Conversation - 2025-10-29",
          },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" },
          message_count: {
            type: "number",
            description: "Total number of messages in the conversation",
            example: 10,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  async getAllConversations(@CurrentUser() currentUser: any) {
    return this.aiService.getAllConversations(currentUser.userId);
  }

  @Patch("rename_conversation/:conversation_id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Rename a conversation",
    description:
      "Updates the title of an existing conversation. User must own the conversation.",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "New title for the conversation",
          example: "My Study Plan",
        },
      },
      required: ["title"],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Conversation renamed successfully",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        updated_at: { type: "string", format: "date-time" },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid title or missing required field",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You do not have access to this conversation",
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
  })
  async renameConversation(
    @CurrentUser() currentUser: any,
    @Param("conversation_id") conversationId: string,
    @Body("title") title: string
  ) {
    return this.aiService.renameConversation(
      currentUser.userId,
      conversationId,
      title
    );
  }

  @Delete("delete_conversation/:conversation_id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Delete a conversation",
    description:
      "Deletes a conversation and all its associated chat messages. This action cannot be undone. User must own the conversation.",
  })
  @ApiResponse({
    status: 200,
    description: "Conversation and all messages deleted successfully",
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Conversation deleted successfully",
        },
        conversation_id: { type: "string" },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You do not have access to this conversation",
  })
  @ApiResponse({
    status: 404,
    description: "Conversation not found",
  })
  async deleteConversation(
    @CurrentUser() currentUser: any,
    @Param("conversation_id") conversationId: string
  ) {
    return this.aiService.deleteConversation(
      currentUser.userId,
      conversationId
    );
  }
}
