import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import { AiService } from "./ai.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("AI")
@Controller("ai")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("generate")
  @ApiOperation({ summary: "Generate AI content based on prompt" })
  @ApiResponse({ status: 200, description: "Content generated successfully" })
  @ApiResponse({ status: 400, description: "Bad request - Invalid prompt" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "The prompt text for content generation",
        },
      },
      required: ["text"],
    },
  })
  async generateContent(@Body() prompt: { text: string }) {
    return this.aiService.generateContent(prompt.text);
  }

  @Post("analyze")
  @ApiOperation({ summary: "Analyze content using AI" })
  @ApiResponse({ status: 200, description: "Content analyzed successfully" })
  @ApiResponse({ status: 400, description: "Bad request - Invalid content" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        text: { type: "string", description: "The content text to analyze" },
      },
      required: ["text"],
    },
  })
  async analyzeContent(@Body() content: { text: string }) {
    return this.aiService.analyzeContent(content.text);
  }
}
