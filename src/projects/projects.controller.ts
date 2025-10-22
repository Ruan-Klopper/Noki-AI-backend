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
import { CreateProjectAuthDto } from "./dtos/create-project-auth.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";

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

  // New endpoints with custom naming and JWT-based user identification

  @Post("create_project")
  @ApiOperation({
    summary: "Create a new project (user from JWT token)",
    description:
      "Create a project for the authenticated user. User ID is extracted from the JWT token automatically. NO user_id needed in request body.",
  })
  @ApiResponse({ status: 201, description: "Project successfully created" })
  @ApiResponse({ status: 400, description: "Bad request - Invalid input data" })
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid token" })
  @ApiBody({ type: CreateProjectAuthDto })
  async createProject(
    @Body() createProjectDto: CreateProjectAuthDto,
    @CurrentUser() currentUser: any
  ) {
    // Inject user_id from JWT token
    const projectData = {
      ...createProjectDto,
      user_id: currentUser.userId,
    };
    return this.projectsService.create(projectData);
  }

  @Put("update_project/:id")
  @ApiOperation({
    summary: "Update a project (user from JWT token)",
    description:
      "Update a project owned by the authenticated user. User ID is verified from the JWT token.",
  })
  @ApiParam({ name: "id", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Project updated successfully" })
  @ApiResponse({ status: 404, description: "Project not found" })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only update your own projects",
  })
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid token" })
  @ApiBody({ type: UpdateProjectDto })
  async updateProject(
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() currentUser: any
  ) {
    return this.projectsService.updateByUser(
      id,
      currentUser.userId,
      updateProjectDto
    );
  }

  @Delete("delete_project/:id")
  @ApiOperation({
    summary: "Delete a project (user from JWT token)",
    description:
      "Delete a project owned by the authenticated user. User ID is verified from the JWT token.",
  })
  @ApiParam({ name: "id", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Project deleted successfully" })
  @ApiResponse({ status: 404, description: "Project not found" })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only delete your own projects",
  })
  @ApiResponse({ status: 401, description: "Unauthorized - Invalid token" })
  async deleteProject(
    @Param("id") id: string,
    @CurrentUser() currentUser: any
  ) {
    return this.projectsService.removeByUser(id, currentUser.userId);
  }
}
