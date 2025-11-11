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
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ResourcesService = class ResourcesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createResourceDto) {
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
                    },
                },
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
                    },
                },
                project: true,
            },
        });
    }
    async findOne(id) {
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
                    },
                },
                project: true,
            },
        });
    }
    async findByUser(userId) {
        return this.prisma.resource.findMany({
            where: { user_id: userId },
            include: {
                task: {
                    include: {
                        project: true,
                    },
                },
                project: true,
            },
        });
    }
    async findByTask(taskId) {
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
                project: true,
            },
        });
    }
    async findByProject(projectId) {
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
                task: true,
            },
        });
    }
    async update(id, updateResourceDto) {
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
                    },
                },
                project: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.resource.delete({
            where: { id },
        });
    }
};
exports.ResourcesService = ResourcesService;
exports.ResourcesService = ResourcesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResourcesService);
//# sourceMappingURL=resources.service.js.map