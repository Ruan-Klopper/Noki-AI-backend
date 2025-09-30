import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  async generateContent(@Body() prompt: { text: string }) {
    return this.aiService.generateContent(prompt.text);
  }

  @Post('analyze')
  async analyzeContent(@Body() content: { text: string }) {
    return this.aiService.analyzeContent(content.text);
  }
}
