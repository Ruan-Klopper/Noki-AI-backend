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
import { CreateTodoAuthDto } from "./dtos/create-todo-auth.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ApiResponseDto, ApiErrorResponseDto } from "../common/interfaces";
import { CurrentUser } from "../common/decorators/current-user.decorator";

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

  // New endpoints with custom naming and JWT-based user identification

  @Post("create_todo/:taskId")
  @ApiOperation({
    summary: "Create a new todo (user from JWT token)",
    description:
      "Create a todo for a specific task. User ID is extracted from the JWT token automatically. Task ID from URL parameter. NO user_id or task_id needed in request body.",
  })
  @ApiParam({ name: "taskId", description: "Task ID" })
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
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid token" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @ApiBody({ type: CreateTodoAuthDto })
  async createTodo(
    @Param("taskId") taskId: string,
    @Body() createTodoDto: CreateTodoAuthDto,
    @CurrentUser() currentUser: any
  ) {
    // Inject user_id and task_id from JWT token and URL param
    const todoData = {
      ...createTodoDto,
      user_id: currentUser.userId,
      task_id: taskId,
    };
    return this.todosService.createByUser(todoData, currentUser.userId);
  }

  @Put("update_todo")
  @ApiOperation({
    summary: "Update one or more todos (user from JWT token)",
    description:
      "Update todos owned by the authenticated user. Supports single or bulk updates. User ID is verified from the JWT token.",
  })
  @ApiResponse({
    status: 200,
    description: "Todo(s) updated successfully",
    schema: {
      example: {
        updated: 2,
        todos: [
          { id: "todo-id-1", title: "Updated title 1" },
          { id: "todo-id-2", title: "Updated title 2" },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Todo(s) not found",
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only update your own todos",
  })
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid token" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        todoIds: {
          type: "array",
          items: { type: "string" },
          description: "Array of todo IDs to update",
          example: ["todo-id-1", "todo-id-2"],
        },
        updates: {
          type: "object",
          description: "Fields to update",
          example: {
            title: "Updated title",
            description: "Updated description",
            priority: "High",
          },
        },
      },
      required: ["todoIds", "updates"],
    },
  })
  async updateTodo(
    @Body() body: { todoIds: string[]; updates: UpdateTodoDto },
    @CurrentUser() currentUser: any
  ) {
    return this.todosService.updateManyByUser(
      body.todoIds,
      currentUser.userId,
      body.updates
    );
  }

  @Delete("delete_todo")
  @ApiOperation({
    summary: "Delete one or more todos (user from JWT token)",
    description:
      "Delete todos owned by the authenticated user. Supports single or bulk deletion. User ID is verified from the JWT token.",
  })
  @ApiResponse({
    status: 200,
    description: "Todo(s) deleted successfully",
    schema: {
      example: {
        deleted: 2,
        todoIds: ["todo-id-1", "todo-id-2"],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Todo(s) not found",
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only delete your own todos",
  })
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid token" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        todoIds: {
          type: "array",
          items: { type: "string" },
          description: "Array of todo IDs to delete",
          example: ["todo-id-1", "todo-id-2"],
        },
      },
      required: ["todoIds"],
    },
  })
  async deleteTodo(
    @Body() body: { todoIds: string[] },
    @CurrentUser() currentUser: any
  ) {
    return this.todosService.removeManyByUser(body.todoIds, currentUser.userId);
  }
}
