import { Controller, Get, Post, UseGuards, Param } from "@nestjs/common";
import { CanvasService } from "./canvas.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("canvas")
@UseGuards(JwtAuthGuard)
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Get("projects")
  async getProjects() {
    return this.canvasService.getProjects();
  }

  @Get("assignments")
  async getAssignments() {
    return this.canvasService.getAssignments();
  }

  @Post("sync/:userId")
  async syncData(@Param("userId") userId: string) {
    return this.canvasService.syncData(userId);
  }
}
