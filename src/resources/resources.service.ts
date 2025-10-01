import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async create(createResourceDto: CreateResourceDto) {
    return this.prisma.resource.create({
      data: createResourceDto,
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
        course: true,
        project: true,
      },
    });
  }

  async findAll() {
    return this.prisma.resource.findMany({
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
        course: true,
        project: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.resource.findUnique({
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
        course: true,
        project: true,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.resource.findMany({
      where: { user_id: userId },
      include: {
        task: {
          include: {
            project: true,
            course: true,
          },
        },
        course: true,
        project: true,
      },
    });
  }

  async findByTask(taskId: string) {
    return this.prisma.resource.findMany({
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
        course: true,
        project: true,
      },
    });
  }

  async findByCourse(courseId: string) {
    return this.prisma.resource.findMany({
      where: { course_id: courseId },
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
        project: true,
      },
    });
  }

  async findByProject(projectId: string) {
    return this.prisma.resource.findMany({
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
        task: {
          include: {
            course: true,
          },
        },
        course: true,
      },
    });
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    return this.prisma.resource.update({
      where: { id },
      data: updateResourceDto,
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
        course: true,
        project: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.resource.delete({
      where: { id },
    });
  }
}
