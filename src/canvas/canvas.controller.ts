import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('canvas')
@UseGuards(JwtAuthGuard)
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Get('courses')
  async getCourses() {
    return this.canvasService.getCourses();
  }

  @Get('assignments')
  async getAssignments() {
    return this.canvasService.getAssignments();
  }

  @Post('sync')
  async syncData() {
    return this.canvasService.syncData();
  }
}
