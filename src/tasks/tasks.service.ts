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

  /**
   * Get task list for a specific time period
   * Used by AI service for context gathering
   */
  async getTaskListForPeriod(
    userId: string,
    duration: "today" | "this_week" | "this_month" | "next_two_months" | "all" | "overdue",
    projectIds?: string[]
  ): Promise<any[]> {
    const now = new Date();
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    switch (duration) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1
        );
        break;
      case "this_week":
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startDate = new Date(
          startOfWeek.getFullYear(),
          startOfWeek.getMonth(),
          startOfWeek.getDate()
        );
        endDate = new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case "this_month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
      case "next_two_months":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 3, 1);
        break;
      case "overdue":
        // Tasks that are past due and not submitted
        endDate = now;
        break;
      case "all":
        // No date filtering
        break;
    }

    const whereClause: any = {
      user_id: userId,
      is_submitted: false, // Only get incomplete tasks
    };

    // Add date filtering if specified
    if (duration === "overdue") {
      whereClause.due_date = {
        lt: endDate,
      };
    } else if (startDate && endDate) {
      whereClause.due_date = {
        gte: startDate,
        lt: endDate,
      };
    } else if (duration !== "all") {
      // For "all", include tasks with or without due dates
      if (startDate) {
        whereClause.due_date = {
          gte: startDate,
        };
      }
    }

    // Add project filtering if specified
    if (projectIds && projectIds.length > 0) {
      whereClause.project_id = {
        in: projectIds,
      };
    }

    return this.prisma.task.findMany({
      where: whereClause,
      include: {
        project: {
          select: {
            id: true,
            title: true,
            description: true,
            course_code: true,
            color_hex: true,
          },
        },
        todos: {
          select: {
            id: true,
            title: true,
            description: true,
            priority: true,
            due_date: true,
            is_submitted: true,
            created_at: true,
          },
        },
      },
      orderBy: [
        { due_date: "asc" },
        { priority: "desc" },
        { created_at: "desc" },
      ],
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
      throw new NotFoundException("Task not found");
    }

    if (task.user_id !== userId) {
      throw new ForbiddenException("You can only complete your own tasks");
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
