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
import { ResourcesService } from "./resources.service";
import { CreateResourceDto } from "./dtos/create-resource.dto";
import { UpdateResourceDto } from "./dtos/update-resource.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ApiResponseDto, ApiErrorResponseDto } from "../common/interfaces";

@ApiTags("Resources")
@Controller("resources")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new resource" })
  @ApiResponse({
    status: 201,
    description: "Resource successfully created",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
    type: ApiErrorResponseDto,
  })
  @ApiBody({ type: CreateResourceDto })
  async create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all resources" })
  @ApiResponse({
    status: 200,
    description: "Resources retrieved successfully",
    type: ApiResponseDto,
  })
  async findAll() {
    return this.resourcesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get resource by ID" })
  @ApiParam({ name: "id", description: "Resource ID" })
  @ApiResponse({
    status: 200,
    description: "Resource retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Resource not found",
    type: ApiErrorResponseDto,
  })
  async findOne(@Param("id") id: string) {
    return this.resourcesService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update resource by ID" })
  @ApiParam({ name: "id", description: "Resource ID" })
  @ApiResponse({
    status: 200,
    description: "Resource updated successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Resource not found",
    type: ApiErrorResponseDto,
  })
  @ApiBody({ type: UpdateResourceDto })
  async update(
    @Param("id") id: string,
    @Body() updateResourceDto: UpdateResourceDto
  ) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete resource by ID" })
  @ApiParam({ name: "id", description: "Resource ID" })
  @ApiResponse({
    status: 200,
    description: "Resource deleted successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Resource not found",
    type: ApiErrorResponseDto,
  })
  async remove(@Param("id") id: string) {
    return this.resourcesService.remove(id);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get resources by user ID" })
  @ApiParam({ name: "userId", description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "User resources retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
    type: ApiErrorResponseDto,
  })
  async findByUser(@Param("userId") userId: string) {
    return this.resourcesService.findByUser(userId);
  }

  @Get("task/:taskId")
  @ApiOperation({ summary: "Get resources by task ID" })
  @ApiParam({ name: "taskId", description: "Task ID" })
  @ApiResponse({
    status: 200,
    description: "Task resources retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Task not found",
    type: ApiErrorResponseDto,
  })
  async findByTask(@Param("taskId") taskId: string) {
    return this.resourcesService.findByTask(taskId);
  }

  @Get("project/:projectId")
  @ApiOperation({ summary: "Get resources by project ID" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiResponse({
    status: 200,
    description: "Project resources retrieved successfully",
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Project not found",
    type: ApiErrorResponseDto,
  })
  async findByProject(@Param("projectId") projectId: string) {
    return this.resourcesService.findByProject(projectId);
  }
}
