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

  @Get("all-user-data")
  @ApiOperation({
    summary: "Get all user data",
    description:
      "Retrieve all projects, tasks, and todos for the authenticated user in a hierarchical structure. Projects contain tasks, and tasks contain todos.",
  })
  @ApiResponse({
    status: 200,
    description: "User data retrieved successfully",
    schema: {
      example: {
        resultForUserId: "1e2db1ca-2d20-4744-a2da-18b112c41219",
        data: {
          projects: [
            {
              id: "proj-uuid-1",
              user_id: "1e2db1ca-2d20-4744-a2da-18b112c41219",
              title: "Web Development Project",
              description: "Building a new web application",
              source: "Personal",
              external_id: null,
              course_code: "CS101",
              color_hex: "#1D72A6",
              time_zone: "America/New_York",
              start_at: "2024-01-01T00:00:00.000Z",
              end_at: "2024-12-31T23:59:59.000Z",
              raw_canvas_data: {
                id: 12345,
                name: "Web Development",
                original_name: "CS101 - Web Development",
              },
              created_at: "2024-01-01T00:00:00.000Z",
              updated_at: "2024-01-05T00:00:00.000Z",
              tasks: [
                {
                  id: "task-uuid-1",
                  user_id: "1e2db1ca-2d20-4744-a2da-18b112c41219",
                  project_id: "proj-uuid-1",
                  title: "Design Homepage",
                  description: "Create wireframes and design",
                  due_date: "2024-01-15T23:59:59.000Z",
                  is_all_day: false,
                  created_at: "2024-01-02T00:00:00.000Z",
                  updated_at: "2024-01-03T00:00:00.000Z",
                  type: "Project",
                  priority: "High",
                  raw_canvas_data: {
                    id: 67890,
                    name: "Design Homepage Assignment",
                    html_url: "https://canvas.instructure.com/...",
                  },
                  todos: [
                    {
                      id: "todo-uuid-1",
                      user_id: "1e2db1ca-2d20-4744-a2da-18b112c41219",
                      task_id: "task-uuid-1",
                      title: "Create wireframes",
                      description:
                        "Design initial wireframes for mobile and desktop",
                      priority: "High",
                      due_date: "2024-01-10T00:00:00.000Z",
                      created_at: "2024-01-02T00:00:00.000Z",
                      updated_at: "2024-01-02T00:00:00.000Z",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing token",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  async getAllUserData(@CurrentUser() currentUser: any) {
    return this.miscService.getAllUserData(currentUser.userId);
  }

  @Get("user-data-summary/:userId")
  @ApiOperation({
    summary: "Get user data summary",
    description:
      "Retrieve a summary of all data associated with a user. Useful for confirming what will be deleted.",
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
    description:
      "Permanently delete ALL data associated with a user including auth providers, projects, tasks, todos, resources, conversations, and chat messages. This operation is IRREVERSIBLE!",
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
