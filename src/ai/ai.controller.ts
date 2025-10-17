import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import {
  AiService,
  HealthResponse,
  ChatRequest,
  ChatResponse,
  ContextRequest,
  ContextResponse,
} from "./ai.service";

@ApiTags("AI")
@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get("health")
  @ApiOperation({
    summary: "Check AI server health",
    description:
      "Returns the health status of both this service and the AI server at http://localhost:8000/health",
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
  @ApiOperation({
    summary: "Send chat message to AI server",
    description:
      "Sends a chat message to the AI server. Creates a new conversation if conversation_id is empty.",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
          description: "User ID (required)",
          example: "user123",
        },
        conversation_id: {
          type: "string",
          description: "Conversation ID (required)",
          example: "conv-1234567890-abc123",
        },
        prompt: {
          type: "string",
          description: "User's message/prompt (required)",
          example: "Hello, how can you help me today?",
        },
        projects: {
          type: "array",
          items: {
            type: "object",
            properties: {
              project_id: { type: "string", example: "proj_photography_2025" },
              title: { type: "string", example: "Photography Course 2025" },
              description: {
                type: "string",
                example: "Advanced photography techniques",
              },
              instructor: { type: "string", example: "Dr. Smith" },
            },
          },
          description: "Array of projects (optional)",
        },
        tasks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              task_id: { type: "string", example: "task_123" },
              title: { type: "string", example: "Complete assignment" },
              description: {
                type: "string",
                example: "Write a research paper",
              },
              due_datetime: {
                type: "string",
                example: "2025-10-16T15:35:25.051Z",
              },
              status: { type: "string", example: "not_started" },
              project_id: { type: "string", example: "proj_photography_2025" },
            },
          },
          description: "Array of tasks (optional)",
        },
        stage: {
          type: "string",
          description: "Chat stage (required)",
          example: "thinking",
        },
        metadata: {
          type: "object",
          description: "Additional metadata (optional)",
        },
      },
      required: [
        "user_id",
        "conversation_id",
        "prompt",
        "projects",
        "tasks",
        "stage",
      ],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Chat response received successfully",
    schema: {
      type: "object",
      properties: {
        stage: {
          type: "string",
          description: "Response stage",
          example: "response",
        },
        conversation_id: {
          type: "string",
          description: "Conversation ID used for the chat",
          example: "conv-1234567890-abc123",
        },
        text: {
          type: "string",
          description: "AI response text",
          example: "I can help you with that!",
        },
        blocks: {
          type: "array",
          description: "Structured UI blocks from AI",
        },
        intent: {
          type: "object",
          description: "AI intent object if present",
        },
        timestamp: {
          type: "string",
          description: "Response timestamp",
          example: "2025-10-16T15:37:51.909565",
        },
        token_usage: {
          type: "object",
          description: "Token usage statistics",
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Bad request - Invalid input" })
  @ApiResponse({ status: 502, description: "AI server is not available" })
  async sendChatMessage(
    @Body() chatRequest: ChatRequest
  ): Promise<ChatResponse> {
    return this.aiService.sendChatMessage(chatRequest);
  }

  @Post("chat/context")
  @ApiOperation({
    summary: "Send context data to AI server",
    description:
      "Sends context data to the AI server when an intent is present in the chat response.",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "string",
          description: "Conversation ID (required)",
          example: "conv-1234567890-abc123",
        },
        assignments: {
          type: "array",
          description: "Task assignments data (optional)",
        },
        schedule: {
          type: "array",
          description: "User's schedule data (optional)",
        },
        existing_todos: {
          type: "array",
          description: "Existing todos data (optional)",
        },
        tasks: {
          type: "array",
          description: "Tasks data (optional)",
        },
        schedule_accepted: {
          type: "boolean",
          description: "Whether schedule was accepted (optional)",
        },
        updated_schedule: {
          type: "array",
          description: "Updated schedule sessions (optional)",
        },
        tasks_accepted: {
          type: "boolean",
          description: "Whether tasks were accepted (optional)",
        },
        saved_tasks: {
          type: "array",
          description: "Saved tasks data (optional)",
        },
        todos_accepted: {
          type: "boolean",
          description: "Whether todos were accepted (optional)",
        },
        saved_todos: {
          type: "array",
          description: "Saved todos data (optional)",
        },
      },
      required: ["conversation_id"],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Context data sent successfully",
    schema: {
      type: "object",
      properties: {
        success: {
          type: "boolean",
          description: "Whether the operation was successful",
          example: true,
        },
        message: {
          type: "string",
          description: "Response message",
          example: "Context data processed successfully",
        },
        data: {
          type: "object",
          description: "Additional response data",
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Bad request - Invalid input" })
  @ApiResponse({ status: 502, description: "AI server is not available" })
  async sendContextData(
    @Body() contextRequest: ContextRequest
  ): Promise<ContextResponse> {
    return this.aiService.sendContextData(contextRequest);
  }

  @Post("chat/handle-intent")
  @ApiOperation({
    summary: "Handle intent response automatically",
    description:
      "Automatically handles intent-based responses by gathering required context data and sending it to the AI server.",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        chat_response: {
          type: "object",
          description: "Chat response containing intent",
        },
        user_id: {
          type: "string",
          description: "User ID (required)",
          example: "user123",
        },
      },
      required: ["chat_response", "user_id"],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Intent handled successfully",
    schema: {
      type: "object",
      properties: {
        success: {
          type: "boolean",
          description: "Whether the operation was successful",
          example: true,
        },
        message: {
          type: "string",
          description: "Response message",
          example: "Intent processed successfully",
        },
        data: {
          type: "object",
          description: "Additional response data",
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Bad request - Invalid input" })
  @ApiResponse({ status: 502, description: "AI server is not available" })
  async handleIntentResponse(
    @Body() body: { chat_response: ChatResponse; user_id: string }
  ): Promise<ContextResponse> {
    return this.aiService.handleIntentResponse(
      body.chat_response,
      body.user_id
    );
  }
}
