"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let TasksService = class TasksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTaskDto) {
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
    async findOne(id) {
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
    async findByUser(userId) {
        return this.prisma.task.findMany({
            where: { user_id: userId },
            include: {
                project: true,
                todos: true,
                resources: true,
            },
        });
    }
    async findByProject(projectId) {
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
    async update(id, updateTaskDto) {
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
    async remove(id) {
        return this.prisma.task.delete({
            where: { id },
        });
    }
    async getAllTasksForProject(projectIds) {
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
    async getTaskListForPeriod(userId, duration, projectIds) {
        const now = new Date();
        let startDate;
        let endDate;
        switch (duration) {
            case "today":
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                break;
            case "this_week":
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());
                startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());
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
                endDate = now;
                break;
            case "all":
                break;
        }
        const whereClause = {
            user_id: userId,
            is_submitted: false,
        };
        if (duration === "overdue") {
            whereClause.due_date = {
                lt: endDate,
            };
        }
        else if (startDate && endDate) {
            whereClause.due_date = {
                gte: startDate,
                lt: endDate,
            };
        }
        else if (duration !== "all") {
            if (startDate) {
                whereClause.due_date = {
                    gte: startDate,
                };
            }
        }
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
    async updateByUser(id, userId, updateTaskDto) {
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
    async removeByUser(id, userId) {
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
    async completeTask(id, userId) {
        const task = await this.prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException("Task not found");
        }
        if (task.user_id !== userId) {
            throw new common_1.ForbiddenException("You can only complete your own tasks");
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
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map