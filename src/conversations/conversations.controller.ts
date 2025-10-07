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
import { ConversationsService } from "./conversations.service";
import { CreateConversationDto } from "./dtos/create-conversation.dto";
import { UpdateConversationDto } from "./dtos/update-conversation.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("conversations")
@UseGuards(JwtAuthGuard)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  create(@Request() req, @Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.create(req.user.id, createConversationDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.conversationsService.findAll(req.user.id);
  }

  @Get(":id")
  findOne(@Request() req, @Param("id") id: string) {
    return this.conversationsService.findOne(id, req.user.id);
  }

  @Patch(":id")
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
  remove(@Request() req, @Param("id") id: string) {
    return this.conversationsService.remove(id, req.user.id);
  }

  @Get("ai-engine/:aiEngineId")
  findByAiEngineId(@Request() req, @Param("aiEngineId") aiEngineId: string) {
    return this.conversationsService.findByAiEngineId(aiEngineId, req.user.id);
  }

  @Patch(":id/ai-engine")
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
