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
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UpdateProjectDto } from "./dtos/update-project.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("Projects")
@Controller("projects")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new project" })
  @ApiResponse({ status: 201, description: "Project successfully created" })
  @ApiResponse({ status: 400, description: "Bad request - Invalid input data" })
  @ApiBody({ type: CreateProjectDto })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all projects" })
  @ApiResponse({ status: 200, description: "Projects retrieved successfully" })
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get project by ID" })
  @ApiParam({ name: "id", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Project retrieved successfully" })
  @ApiResponse({ status: 404, description: "Project not found" })
  async findOne(@Param("id") id: string) {
    return this.projectsService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update project by ID" })
  @ApiParam({ name: "id", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Project updated successfully" })
  @ApiResponse({ status: 404, description: "Project not found" })
  @ApiBody({ type: UpdateProjectDto })
  async update(
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete project by ID" })
  @ApiParam({ name: "id", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Project deleted successfully" })
  @ApiResponse({ status: 404, description: "Project not found" })
  async remove(@Param("id") id: string) {
    return this.projectsService.remove(id);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get projects by user ID" })
  @ApiParam({ name: "userId", description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "User projects retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "User not found" })
  async findByUser(@Param("userId") userId: string) {
    return this.projectsService.findByUser(userId);
  }
}
