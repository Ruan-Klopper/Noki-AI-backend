import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
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
}
