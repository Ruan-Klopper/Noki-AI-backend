import { Module } from "@nestjs/common";
import { CanvasController } from "./canvas.controller";
import { CanvasService } from "./canvas.service";
import { ProjectsModule } from "../projects/projects.module";

@Module({
  imports: [ProjectsModule],
  controllers: [CanvasController],
  providers: [CanvasService],
  exports: [CanvasService],
})
export class CanvasModule {}
