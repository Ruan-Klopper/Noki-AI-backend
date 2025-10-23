import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: true,
        todos: true,
        resources: true,
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: true,
        todos: true,
        resources: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: true,
        todos: true,
        resources: true,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.task.findMany({
      where: { user_id: userId },
      include: {
        project: true,
        todos: true,
        resources: true,
      },
    });
  }

  async findByProject(projectId: string) {
    return this.prisma.task.findMany({
      where: { project_id: projectId },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        todos: true,
        resources: true,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: true,
        todos: true,
        resources: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }

  /**
   * Get all tasks for multiple projects
   * Used by AI service for context gathering
   */
  async getAllTasksForProject(projectIds: string[]): Promise<any[]> {
    return this.prisma.task.findMany({
      where: {
        project_id: {
          in: projectIds,
        },
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            description: true,
            course_code: true,
          },
        },
        todos: {
          select: {
            id: true,
            title: true,
            description: true,
            priority: true,
            due_date: true,
            created_at: true,
          },
        },
      },
      orderBy: {
        due_date: "asc",
      },
    });
  }

  async updateByUser(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    // First check if task exists and belongs to user
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.user_id !== userId) {
      throw new Error("You can only update your own tasks");
    }

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: true,
        todos: true,
        resources: true,
      },
    });
  }

  async removeByUser(id: string, userId: string) {
    // First check if task exists and belongs to user
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.user_id !== userId) {
      throw new Error("You can only delete your own tasks");
    }

    return this.prisma.task.delete({
      where: { id },
    });
  }

  async completeTask(id: string, userId: string) {
    // First check if task exists and belongs to user
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.user_id !== userId) {
      throw new Error("You can only complete your own tasks");
    }

    return this.prisma.task.update({
      where: { id },
      data: { is_submitted: true },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: true,
        todos: true,
        resources: true,
      },
    });
  }
}
