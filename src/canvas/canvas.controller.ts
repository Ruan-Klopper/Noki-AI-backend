import { Controller, Get, Post, UseGuards, Body, Delete } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CanvasService } from "./canvas.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { SetupCanvasDto } from "./dtos/setup-canvas.dto";
import { SetupCanvasResponseDto } from "./dtos/setup-canvas-response.dto";
import { LinkCanvasDataResponseDto } from "./dtos/link-canvas-data-response.dto";

@Controller("canvas")
@UseGuards(JwtAuthGuard)
@ApiTags("Canvas Integration")
@ApiBearerAuth("JWT-auth")
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Post("setup")
  @ApiOperation({
    summary: "Setup Canvas Integration",
    description:
      "Link a Canvas account by providing institutional URL and bearer token. This endpoint will test the connection and save the auth details. User ID is automatically extracted from the JWT token.",
  })
  @ApiResponse({
    status: 201,
    description: "Canvas account linked successfully",
    type: SetupCanvasResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid Canvas credentials or URL",
    schema: {
      example: {
        statusCode: 400,
        message: "Invalid Canvas token or insufficient permissions",
        error: "Bad Request",
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing token",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      example: {
        statusCode: 500,
        message: "Failed to setup Canvas integration",
        error: "Internal Server Error",
      },
    },
  })
  async setupCanvasLink(
    @Body() setupCanvasDto: SetupCanvasDto,
    @CurrentUser() currentUser: any
  ): Promise<SetupCanvasResponseDto> {
    return this.canvasService.setupCanvasLink(
      currentUser.userId,
      setupCanvasDto
    );
  }

  @Post("link-data")
  @ApiOperation({
    summary: "Link Canvas Data to Noki",
    description:
      "Sync Canvas courses to Noki Projects and Canvas assignments to Noki Tasks. This endpoint fetches all active Canvas courses and their assignments, then creates corresponding Projects and Tasks in Noki. User ID is automatically extracted from the JWT token.",
  })
  @ApiResponse({
    status: 201,
    description: "Canvas data linked successfully",
    type: LinkCanvasDataResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Canvas account not found or invalid data",
    schema: {
      example: {
        statusCode: 400,
        message:
          "Canvas account not found. Please setup Canvas integration first.",
        error: "Bad Request",
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing token",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      example: {
        statusCode: 500,
        message: "Failed to link Canvas data",
        error: "Internal Server Error",
      },
    },
  })
  async linkCanvasData(
    @CurrentUser() currentUser: any
  ): Promise<LinkCanvasDataResponseDto> {
    return this.canvasService.linkCanvasData(currentUser.userId);
  }

  @Get("projects")
  @ApiOperation({
    summary: "Get Canvas Projects",
    description: "Fetch Canvas courses as projects for the authenticated user",
  })
  @ApiResponse({
    status: 200,
    description: "Canvas projects retrieved successfully",
    schema: {
      example: {
        message: "Canvas projects integration",
      },
    },
  })
  async getProjects() {
    return this.canvasService.getProjects();
  }

  @Get("assignments")
  @ApiOperation({
    summary: "Get Canvas Assignments",
    description: "Fetch Canvas assignments for the authenticated user",
  })
  @ApiResponse({
    status: 200,
    description: "Canvas assignments retrieved successfully",
    schema: {
      example: {
        message: "Canvas assignments integration",
      },
    },
  })
  async getAssignments() {
    return this.canvasService.getAssignments();
  }

  @Post("sync")
  @ApiOperation({
    summary: "Sync Canvas Data",
    description:
      "Synchronize Canvas data for the authenticated user. User ID is automatically extracted from the JWT token.",
  })
  @ApiResponse({
    status: 200,
    description: "Canvas data sync completed",
    schema: {
      example: {
        message: "Canvas data sync completed",
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing token",
  })
  async syncData(@CurrentUser() currentUser: any) {
    return this.canvasService.syncData(currentUser.userId);
  }

  @Delete("delete-all")
  @ApiOperation({
    summary: "Delete all Canvas data",
    description:
      "Deletes all Canvas-linked data for the authenticated user in the order: todos -> tasks -> projects -> auth_providers. User ID is automatically extracted from the JWT token.",
  })
  @ApiResponse({
    status: 200,
    description: "All Canvas data deleted successfully",
    schema: {
      example: {
        message: "All Canvas data deleted successfully",
        deleted: {
          todos: 10,
          tasks: 25,
          projects: 5,
          auth_providers: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing token",
  })
  async deleteAllCanvasData(@CurrentUser() currentUser: any) {
    return this.canvasService.deleteAllCanvasData(currentUser.userId);
  }
}
