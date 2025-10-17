import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";
import { ApiService } from "./api.service";
import { TasksService } from "../tasks/tasks.service";
import { TodosService } from "../todos/todos.service";
import { PrismaService } from "../database/prisma.service";

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [AiController],
  providers: [AiService, ApiService, TasksService, TodosService, PrismaService],
  exports: [AiService, ApiService],
})
export class AiModule {}
