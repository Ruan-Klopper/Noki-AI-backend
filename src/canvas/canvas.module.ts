import { Module } from "@nestjs/common";
import { CanvasController } from "./canvas.controller";
import { CanvasService } from "./canvas.service";
import { ProjectsModule } from "../projects/projects.module";
import { TasksModule } from "../tasks/tasks.module";
import { AuthProviderModule } from "../auth-provider/auth-provider.module";

@Module({
  imports: [ProjectsModule, TasksModule, AuthProviderModule],
  controllers: [CanvasController],
  providers: [CanvasService],
  exports: [CanvasService],
})
export class CanvasModule {}
