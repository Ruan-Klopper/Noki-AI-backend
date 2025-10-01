import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

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
            course: true,
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
            course: true,
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
            course: true,
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
            course: true,
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
            course: true,
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
}
