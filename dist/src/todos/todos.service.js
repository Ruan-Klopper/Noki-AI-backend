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
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let TodosService = class TodosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTodoDto) {
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
    async findOne(id) {
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
    async findByUser(userId) {
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
    async findByTask(taskId) {
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
    async update(id, updateTodoDto) {
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
    async remove(id) {
        return this.prisma.todo.delete({
            where: { id },
        });
    }
    async getTodoListForPeriod(userId, duration, projectIds) {
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
            case "all":
                break;
        }
        const whereClause = {
            user_id: userId,
            is_submitted: false,
        };
        if (duration === "overdue") {
            whereClause.due_date = {
                lt: now,
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
    async saveTodoList(todos) {
        const createdTodos = [];
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
    async createByUser(createTodoDto, userId) {
        const task = await this.prisma.task.findUnique({
            where: { id: createTodoDto.task_id },
        });
        if (!task) {
            throw new Error("Task not found");
        }
        if (task.user_id !== userId) {
            throw new Error("You can only create todos for your own tasks");
        }
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
    async updateManyByUser(todoIds, userId, updateTodoDto) {
        const todos = await this.prisma.todo.findMany({
            where: {
                id: {
                    in: todoIds,
                },
            },
        });
        if (todos.length === 0) {
            throw new Error("No todos found");
        }
        if (todos.length !== todoIds.length) {
            throw new Error("Some todos not found");
        }
        const allBelongToUser = todos.every((todo) => todo.user_id === userId);
        if (!allBelongToUser) {
            throw new Error("You can only update your own todos");
        }
        await this.prisma.todo.updateMany({
            where: {
                id: {
                    in: todoIds,
                },
            },
            data: updateTodoDto,
        });
        const updatedTodos = await this.prisma.todo.findMany({
            where: {
                id: {
                    in: todoIds,
                },
            },
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
        return {
            updated: updatedTodos.length,
            todos: updatedTodos,
        };
    }
    async removeManyByUser(todoIds, userId) {
        const todos = await this.prisma.todo.findMany({
            where: {
                id: {
                    in: todoIds,
                },
            },
        });
        if (todos.length === 0) {
            throw new Error("No todos found");
        }
        if (todos.length !== todoIds.length) {
            throw new Error("Some todos not found");
        }
        const allBelongToUser = todos.every((todo) => todo.user_id === userId);
        if (!allBelongToUser) {
            throw new Error("You can only delete your own todos");
        }
        const result = await this.prisma.todo.deleteMany({
            where: {
                id: {
                    in: todoIds,
                },
            },
        });
        return {
            deleted: result.count,
            todoIds,
        };
    }
    async completeTodo(id, userId) {
        const todo = await this.prisma.todo.findUnique({
            where: { id },
        });
        if (!todo) {
            throw new common_1.NotFoundException("Todo not found");
        }
        if (todo.user_id !== userId) {
            throw new common_1.ForbiddenException("You can only complete your own todos");
        }
        return this.prisma.todo.update({
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
                task: {
                    include: {
                        project: true,
                    },
                },
            },
        });
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TodosService);
//# sourceMappingURL=todos.service.js.map