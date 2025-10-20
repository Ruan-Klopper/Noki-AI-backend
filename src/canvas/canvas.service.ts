import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { ProjectsService } from "../projects/projects.service";
import { TasksService } from "../tasks/tasks.service";
import { AuthProviderService } from "../auth-provider/auth-provider.service";
import {
  ProjectSource,
  AuthProviderType,
  TaskType,
  Priority,
} from "../common/interfaces";
import { SetupCanvasDto } from "./dtos/setup-canvas.dto";
import { SetupCanvasResponseDto } from "./dtos/setup-canvas-response.dto";
import { LinkCanvasDataDto } from "./dtos/link-canvas-data.dto";
import { LinkCanvasDataResponseDto } from "./dtos/link-canvas-data-response.dto";
import axios from "axios";
import * as bcrypt from "bcryptjs";

@Injectable()
export class CanvasService {
  constructor(
    private prisma: PrismaService,
    private projectsService: ProjectsService,
    private tasksService: TasksService,
    private authProviderService: AuthProviderService
  ) {}

  async setupCanvasLink(
    setupCanvasDto: SetupCanvasDto
  ): Promise<SetupCanvasResponseDto> {
    const { user_id, canvas_institutional_url, canvas_token } = setupCanvasDto;

    try {
      // Step 1: Test the Canvas API connection and get user details
      const canvasUserDetails = await this.testCanvasConnection(
        canvas_institutional_url,
        canvas_token
      );

      // Step 2: Save auth provider details
      const authProviderData = {
        user_id,
        type: AuthProviderType.Canvas,
        base_url: canvas_institutional_url,
        access_token: canvas_token,
        metadata: {
          canvas_user_id: canvasUserDetails.id,
          canvas_user_name: canvasUserDetails.name,
          setup_date: new Date().toISOString(),
        },
      };

      // Check if user already has a Canvas auth provider
      const existingCanvasProvider =
        await this.authProviderService.findByUser(user_id);
      const canvasProvider = existingCanvasProvider.find(
        (provider) => provider.type === AuthProviderType.Canvas
      );

      let authProvider;
      if (canvasProvider) {
        // Update existing Canvas provider
        authProvider = await this.authProviderService.update(
          canvasProvider.id,
          {
            base_url: canvas_institutional_url,
            access_token: canvas_token,
            metadata: authProviderData.metadata,
          }
        );
      } else {
        // Create new Canvas provider
        authProvider = await this.authProviderService.create(authProviderData);
      }

      return {
        message: "Canvas Linked successfully",
        user_details: canvasUserDetails,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to setup Canvas integration",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async testCanvasConnection(
    baseUrl: string,
    token: string
  ): Promise<any> {
    try {
      const apiUrl = `${baseUrl}/api/v1/users/self`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      });

      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        throw new BadRequestException("Invalid Canvas API response");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new BadRequestException(
            "Invalid Canvas token or insufficient permissions"
          );
        } else if (error.response?.status === 404) {
          throw new BadRequestException(
            "Canvas API endpoint not found. Please check your institutional URL"
          );
        } else if (
          error.code === "ECONNREFUSED" ||
          error.code === "ENOTFOUND"
        ) {
          throw new BadRequestException(
            "Cannot connect to Canvas server. Please check your institutional URL"
          );
        } else {
          throw new BadRequestException(`Canvas API error: ${error.message}`);
        }
      }
      throw new BadRequestException("Failed to connect to Canvas API");
    }
  }

  async getProjects() {
    // Implement Canvas API integration to fetch courses as projects
    return { message: "Canvas projects integration" };
  }

  async getAssignments() {
    // Implement Canvas assignments integration
    return { message: "Canvas assignments integration" };
  }

  async syncData(userId: string) {
    // Implement data synchronization with Canvas
    // This would fetch Canvas courses and create/update them as Projects
    return { message: "Canvas data sync completed" };
  }

  async linkCanvasData(
    linkCanvasDataDto: LinkCanvasDataDto
  ): Promise<LinkCanvasDataResponseDto> {
    const { user_id } = linkCanvasDataDto;

    try {
      // Step 1: Get Canvas auth provider for the user
      const canvasProvider = await this.getCanvasAuthProvider(user_id);
      if (!canvasProvider) {
        throw new BadRequestException(
          "Canvas account not found. Please setup Canvas integration first."
        );
      }

      // Step 2: Fetch Canvas courses and link them to Projects
      const coursesLinked = await this.linkCanvasCourses(
        user_id,
        canvasProvider
      );

      // Step 3: Fetch Canvas assignments and link them to Tasks
      const assignmentsLinked = await this.linkCanvasAssignments(
        user_id,
        canvasProvider
      );

      return {
        message: `Your canvas account has been linked successfully, ${coursesLinked} courses and ${assignmentsLinked} assignments loaded to your Noki account.`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to link Canvas data",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async getCanvasAuthProvider(userId: string) {
    const authProviders = await this.authProviderService.findByUser(userId);
    return authProviders.find(
      (provider) => provider.type === AuthProviderType.Canvas
    );
  }

  private async linkCanvasCourses(
    userId: string,
    canvasProvider: any
  ): Promise<number> {
    const baseUrl = canvasProvider.base_url;
    const accessToken = await this.authProviderService.getAccessToken(
      userId,
      "Canvas"
    );

    if (!accessToken) {
      throw new BadRequestException("Canvas access token not found");
    }

    console.log("Canvas API Debug:", {
      baseUrl,
      tokenLength: accessToken?.length,
      tokenPrefix: accessToken?.substring(0, 10) + "...",
      apiUrl: `${baseUrl}/api/v1/courses?enrollment_state=active`,
    });

    try {
      // Fetch Canvas courses
      const coursesResponse = await axios.get(
        `${baseUrl}/api/v1/courses?enrollment_state=active`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      const courses = coursesResponse.data;
      let coursesLinked = 0;

      for (const course of courses) {
        const projectData = {
          user_id: userId,
          title: course.name,
          description: course.description || "",
          source: ProjectSource.Canvas,
          external_id: course.id.toString(),
          course_code: course.course_code,
          color_hex: course.course_color,
          time_zone: course.time_zone,
          start_at: course.start_at
            ? new Date(course.start_at).toISOString()
            : undefined,
          end_at: course.end_at
            ? new Date(course.end_at).toISOString()
            : undefined,
          raw_canvas_data: course,
        };

        // Check if project already exists
        const existingProject = await this.projectsService.findByExternalId(
          userId,
          course.id.toString(),
          ProjectSource.Canvas
        );

        if (existingProject) {
          // Update existing project
          await this.projectsService.update(existingProject.id, projectData);
        } else {
          // Create new project
          await this.projectsService.create(projectData);
        }
        coursesLinked++;
      }

      return coursesLinked;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new BadRequestException(
          `Failed to fetch Canvas courses: ${error.message}`
        );
      }
      throw new BadRequestException("Failed to fetch Canvas courses");
    }
  }

  private async linkCanvasAssignments(
    userId: string,
    canvasProvider: any
  ): Promise<number> {
    const baseUrl = canvasProvider.base_url;
    const accessToken = await this.authProviderService.getAccessToken(
      userId,
      "Canvas"
    );

    if (!accessToken) {
      throw new BadRequestException("Canvas access token not found");
    }

    console.log("Canvas Assignments Debug:", {
      baseUrl,
      tokenLength: accessToken?.length,
      tokenPrefix: accessToken?.substring(0, 10) + "...",
    });

    try {
      // Get all Canvas projects (courses) for this user
      const canvasProjects = await this.projectsService.findByUser(userId);
      const canvasProjectsFiltered = canvasProjects.filter(
        (project) => project.source === ProjectSource.Canvas
      );

      let assignmentsLinked = 0;

      // Fetch assignments for each Canvas course
      for (const project of canvasProjectsFiltered) {
        if (!project.external_id) continue;

        try {
          const assignmentsResponse = await axios.get(
            `${baseUrl}/api/v1/courses/${project.external_id}/assignments`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              timeout: 10000,
            }
          );

          const assignments = assignmentsResponse.data;

          for (const assignment of assignments) {
            const taskData = {
              user_id: userId,
              project_id: project.id,
              title: assignment.name,
              description: assignment.description || "",
              due_date: assignment.due_at
                ? new Date(assignment.due_at).toISOString()
                : undefined,
              type: TaskType.Canvas,
              priority: this.determinePriority(
                assignment.points_possible,
                assignment.due_at
              ),
              raw_canvas_data: assignment,
            };

            // Check if task already exists (by external ID in raw_canvas_data)
            const existingTasks = await this.tasksService.findByProject(
              project.id
            );
            const existingTask = existingTasks.find(
              (task) =>
                task.raw_canvas_data &&
                typeof task.raw_canvas_data === "object" &&
                "id" in task.raw_canvas_data &&
                task.raw_canvas_data.id === assignment.id
            );

            if (!existingTask) {
              // Create new task
              await this.tasksService.create(taskData);
              assignmentsLinked++;
            }
          }
        } catch (assignmentError) {
          console.warn(
            `Failed to fetch assignments for course ${project.external_id}:`,
            assignmentError.message
          );
          // Continue with other courses even if one fails
        }
      }

      return assignmentsLinked;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new BadRequestException(
          `Failed to fetch Canvas assignments: ${error.message}`
        );
      }
      throw new BadRequestException("Failed to fetch Canvas assignments");
    }
  }

  private determinePriority(pointsPossible: number, dueDate: string): Priority {
    if (!dueDate) return Priority.Medium;

    const dueDateObj = new Date(dueDate);
    const now = new Date();
    const daysUntilDue = Math.ceil(
      (dueDateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (pointsPossible >= 100) {
      return daysUntilDue <= 3 ? Priority.High : Priority.Medium;
    } else if (pointsPossible >= 50) {
      return daysUntilDue <= 7 ? Priority.High : Priority.Medium;
    } else {
      return daysUntilDue <= 14 ? Priority.Medium : Priority.Low;
    }
  }
}
