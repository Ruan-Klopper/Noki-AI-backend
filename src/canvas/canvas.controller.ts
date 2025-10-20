import { Controller, Get, Post, UseGuards, Param, Body } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CanvasService } from "./canvas.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { SetupCanvasDto } from "./dtos/setup-canvas.dto";
import { SetupCanvasResponseDto } from "./dtos/setup-canvas-response.dto";
import { LinkCanvasDataDto } from "./dtos/link-canvas-data.dto";
import { LinkCanvasDataResponseDto } from "./dtos/link-canvas-data-response.dto";

@Controller("canvas")
@UseGuards(JwtAuthGuard)
@ApiTags("Canvas Integration")
@ApiBearerAuth()
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Post("setup")
  @ApiOperation({
    summary: "Setup Canvas Integration",
    description:
      "Link a Canvas account by providing institutional URL and bearer token. This endpoint will test the connection and save the auth details.",
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
    @Body() setupCanvasDto: SetupCanvasDto
  ): Promise<SetupCanvasResponseDto> {
    return this.canvasService.setupCanvasLink(setupCanvasDto);
  }

  @Post("link-data")
  @ApiOperation({
    summary: "Link Canvas Data to Noki",
    description:
      "Sync Canvas courses to Noki Projects and Canvas assignments to Noki Tasks. This endpoint fetches all active Canvas courses and their assignments, then creates corresponding Projects and Tasks in Noki.",
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
    @Body() linkCanvasDataDto: LinkCanvasDataDto
  ): Promise<LinkCanvasDataResponseDto> {
    return this.canvasService.linkCanvasData(linkCanvasDataDto);
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

  @Post("sync/:userId")
  @ApiOperation({
    summary: "Sync Canvas Data",
    description: "Synchronize Canvas data for a specific user",
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
  async syncData(@Param("userId") userId: string) {
    return this.canvasService.syncData(userId);
  }
}
