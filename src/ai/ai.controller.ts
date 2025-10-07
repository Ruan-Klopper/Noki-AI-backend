import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import { AiService, ChatInput } from "./ai.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("AI")
@Controller("ai")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("chat")
  @ApiOperation({ summary: "Send chat message to AI server" })
  @ApiResponse({
    status: 200,
    description: "Chat response received successfully",
  })
  @ApiResponse({ status: 400, description: "Bad request - Invalid input" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        conversationId: {
          type: "string",
          description: "The conversation ID",
        },
        prompt: {
          type: "string",
          description: "The user's message",
        },
      },
      required: ["prompt"],
    },
  })
  async sendChatMessage(
    @Request() req,
    @Body() body: { conversationId?: string; prompt: string }
  ) {
    const chatInput: ChatInput = {
      user_id: req.user.id,
      conversation_id: body.conversationId || "temp-" + Date.now(),
      prompt: body.prompt,
    };
    return this.aiService.sendChatMessage(chatInput);
  }

  @Post("health")
  @ApiOperation({ summary: "Check AI server health" })
  @ApiResponse({ status: 200, description: "AI server health status" })
  async healthCheck() {
    return this.aiService.healthCheck();
  }
}
