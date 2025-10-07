import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { ProjectsService } from "../projects/projects.service";
import { ProjectSource } from "../common/interfaces";

@Injectable()
export class CanvasService {
  constructor(
    private prisma: PrismaService,
    private projectsService: ProjectsService
  ) {}

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

  async syncCourseAsProject(userId: string, canvasCourseData: any) {
    // Convert Canvas course data to Project format
    const projectData = {
      user_id: userId,
      title: canvasCourseData.name,
      description: canvasCourseData.description,
      source: ProjectSource.Canvas,
      external_id: canvasCourseData.id.toString(),
      course_code: canvasCourseData.course_code,
      color_hex: canvasCourseData.color,
      time_zone: canvasCourseData.time_zone,
      start_at: canvasCourseData.start_at
        ? new Date(canvasCourseData.start_at)
        : null,
      end_at: canvasCourseData.end_at
        ? new Date(canvasCourseData.end_at)
        : null,
      raw_canvas_data: canvasCourseData,
    };

    // Check if project already exists
    const existingProject = await this.projectsService.findByExternalId(
      userId,
      canvasCourseData.id.toString(),
      ProjectSource.Canvas
    );

    if (existingProject) {
      return this.projectsService.update(existingProject.id, projectData);
    } else {
      return this.projectsService.create(projectData);
    }
  }
}
