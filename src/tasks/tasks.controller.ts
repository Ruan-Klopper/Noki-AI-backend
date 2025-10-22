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
import { CreateTaskAuthDto } from "./dtos/create-task-auth.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ApiResponseDto, ApiErrorResponseDto } from "../common/interfaces";
import { CurrentUser } from "../common/decorators/current-user.decorator";

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

  // New endpoints with custom naming and JWT-based user identification

  @Post("create_task")
  @ApiOperation({
    summary: "Create a new task (user from JWT token)",
    description:
      "Create a task for the authenticated user. User ID is extracted from the JWT token automatically. NO user_id needed in request body.",
  })
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
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid token" })
  @ApiBody({ type: CreateTaskAuthDto })
  async createTask(
    @Body() createTaskDto: CreateTaskAuthDto,
    @CurrentUser() currentUser: any
  ) {
    // Inject user_id from JWT token
    const taskData = {
      ...createTaskDto,
      user_id: currentUser.userId,
    };
    return this.tasksService.create(taskData);
  }

  @Put("update_task/:id")
  @ApiOperation({
    summary: "Update a task (user from JWT token)",
    description:
      "Update a task owned by the authenticated user. User ID is verified from the JWT token.",
  })
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
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only update your own tasks",
  })
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid token" })
  @ApiBody({ type: UpdateTaskDto })
  async updateTask(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() currentUser: any
  ) {
    return this.tasksService.updateByUser(
      id,
      currentUser.userId,
      updateTaskDto
    );
  }

  @Delete("delete_task/:id")
  @ApiOperation({
    summary: "Delete a task (user from JWT token)",
    description:
      "Delete a task owned by the authenticated user. User ID is verified from the JWT token.",
  })
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
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only delete your own tasks",
  })
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid token" })
  async deleteTask(@Param("id") id: string, @CurrentUser() currentUser: any) {
    return this.tasksService.removeByUser(id, currentUser.userId);
  }
}
