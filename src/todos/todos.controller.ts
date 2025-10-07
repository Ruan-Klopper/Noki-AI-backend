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
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { UpdateTodoDto } from "./dtos/update-todo.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ApiResponseDto, ApiErrorResponseDto } from "../common/interfaces";

@ApiTags("Todos")
@Controller("todos")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: "Create a new todo" })
  @ApiResponse({
    status: 201,
    description: "Todo successfully created",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
    type: ApiErrorResponseDto,
  })
  @ApiBody({ type: CreateTodoDto })
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all todos" })
  @ApiResponse({
    status: 200,
    description: "Todos retrieved successfully",
    type: ApiResponseDto,
  })
  async findAll() {
    return this.todosService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get todo by ID" })
  @ApiParam({ name: "id", description: "Todo ID" })
  @ApiResponse({
    status: 200,
    description: "Todo retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Todo not found",
    type: ApiErrorResponseDto,
  })
  async findOne(@Param("id") id: string) {
    return this.todosService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update todo by ID" })
  @ApiParam({ name: "id", description: "Todo ID" })
  @ApiResponse({
    status: 200,
    description: "Todo updated successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Todo not found",
    type: ApiErrorResponseDto,
  })
  @ApiBody({ type: UpdateTodoDto })
  async update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete todo by ID" })
  @ApiParam({ name: "id", description: "Todo ID" })
  @ApiResponse({
    status: 200,
    description: "Todo deleted successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Todo not found",
    type: ApiErrorResponseDto,
  })
  async remove(@Param("id") id: string) {
    return this.todosService.remove(id);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get todos by user ID" })
  @ApiParam({ name: "userId", description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "User todos retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
    type: ApiErrorResponseDto,
  })
  async findByUser(@Param("userId") userId: string) {
    return this.todosService.findByUser(userId);
  }

  @Get("task/:taskId")
  @ApiOperation({ summary: "Get todos by task ID" })
  @ApiParam({ name: "taskId", description: "Task ID" })
  @ApiResponse({
    status: 200,
    description: "Task todos retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Task not found",
    type: ApiErrorResponseDto,
  })
  async findByTask(@Param("taskId") taskId: string) {
    return this.todosService.findByTask(taskId);
  }
}
