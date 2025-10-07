import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ApiResponseDto, ApiErrorResponseDto } from "../common/interfaces";

@ApiTags("Tasks")
@Controller("tasks")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: "Create a new task" })
  @ApiResponse({
    status: 201,
    description: "Task successfully created",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
    type: ApiErrorResponseDto,
  })
  @ApiBody({ type: CreateTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tasks" })
  @ApiResponse({
    status: 200,
    description: "Tasks retrieved successfully",
    type: ApiResponseDto,
  })
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get task by ID" })
  @ApiParam({ name: "id", description: "Task ID" })
  @ApiResponse({
    status: 200,
    description: "Task retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Task not found",
    type: ApiErrorResponseDto,
  })
  async findOne(@Param("id") id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update task by ID" })
  @ApiParam({ name: "id", description: "Task ID" })
  @ApiResponse({
    status: 200,
    description: "Task updated successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Task not found",
    type: ApiErrorResponseDto,
  })
  @ApiBody({ type: UpdateTaskDto })
  async update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete task by ID" })
  @ApiParam({ name: "id", description: "Task ID" })
  @ApiResponse({
    status: 200,
    description: "Task deleted successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Task not found",
    type: ApiErrorResponseDto,
  })
  async remove(@Param("id") id: string) {
    return this.tasksService.remove(id);
  }
}
