import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { UpdateTodoDto } from "./dtos/update-todo.dto";

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto,
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        task: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.todo.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        task: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.todo.findUnique({
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
        task: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.todo.findMany({
      where: { user_id: userId },
      include: {
        task: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async findByTask(taskId: string) {
    return this.prisma.todo.findMany({
      where: { task_id: taskId },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        task: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }

  /**
   * Get todo list for a specific time period
   * Used by AI service for context gathering
   */
  async getTodoListForPeriod(
    duration: "today" | "this_week" | "this_month" | "next_two_months" | "all",
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
      case "all":
        // No date filtering
        break;
    }

    const whereClause: any = {};

    // Add date filtering if specified
    if (startDate && endDate) {
      whereClause.due_date = {
        gte: startDate,
        lt: endDate,
      };
    }

    // Add project filtering if specified
    if (projectIds && projectIds.length > 0) {
      whereClause.task = {
        project_id: {
          in: projectIds,
        },
      };
    }

    return this.prisma.todo.findMany({
      where: whereClause,
      include: {
        task: {
          include: {
            project: {
              select: {
                id: true,
                title: true,
                description: true,
                course_code: true,
              },
            },
          },
        },
      },
      orderBy: [
        { priority: "desc" },
        { due_date: "asc" },
        { created_at: "desc" },
      ],
    });
  }

  /**
   * Save multiple todos for a task
   * Used by AI service when proposing todos
   */
  async saveTodoList(
    todos: Array<{
      title: string;
      description?: string;
      task_id: string;
      user_id: string;
      priority?: "High" | "Medium" | "Low";
      due_date?: string;
    }>
  ): Promise<any[]> {
    const createdTodos: any[] = [];

    for (const todo of todos) {
      const createdTodo = await this.prisma.todo.create({
        data: {
          title: todo.title,
          description: todo.description,
          task_id: todo.task_id,
          user_id: todo.user_id,
          priority: todo.priority,
          due_date: todo.due_date ? new Date(todo.due_date) : null,
        },
        include: {
          task: {
            include: {
              project: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  course_code: true,
                },
              },
            },
          },
        },
      });
      createdTodos.push(createdTodo);
    }

    return createdTodos;
  }
}
