import {
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { MiscService } from "./misc.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@ApiTags("Misc")
@Controller("misc")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class MiscController {
  constructor(private readonly miscService: MiscService) {}

  @Get("user-data-summary/:userId")
  @ApiOperation({
    summary: "Get user data summary",
    description: "Retrieve a summary of all data associated with a user. Useful for confirming what will be deleted.",
  })
  @ApiParam({
    name: "userId",
    description: "User ID",
    example: "1e2db1ca-2d20-4744-a2da-18b112c41219",
  })
  @ApiResponse({
    status: 200,
    description: "User data summary retrieved successfully",
    schema: {
      example: {
        user: {
          id: "1e2db1ca-2d20-4744-a2da-18b112c41219",
          email: "user@example.com",
          firstname: "John",
          lastname: "Doe",
          created_at: "2024-01-01T00:00:00.000Z",
        },
        counts: {
          authProviders: 2,
          projects: 5,
          tasks: 12,
          todos: 8,
          resources: 15,
          conversations: 3,
          chatMessages: 25,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing token",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Can only view your own data summary",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  async getUserDataSummary(
    @Param("userId") userId: string,
    @CurrentUser() currentUser: any
  ) {
    return this.miscService.getUserDataSummary(userId, currentUser.userId);
  }

  @Delete("delete-all-user-data/:userId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete all user data",
    description: "Permanently delete ALL data associated with a user including auth providers, projects, tasks, todos, resources, conversations, and chat messages. This operation is IRREVERSIBLE!",
  })
  @ApiParam({
    name: "userId",
    description: "User ID",
    example: "1e2db1ca-2d20-4744-a2da-18b112c41219",
  })
  @ApiResponse({
    status: 204,
    description: "All user data deleted successfully",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing token",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Can only delete your own data",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error - Failed to delete user data",
  })
  async deleteAllUserData(
    @Param("userId") userId: string,
    @CurrentUser() currentUser: any
  ): Promise<void> {
    await this.miscService.deleteAllUserData(userId, currentUser.userId);
  }
}
