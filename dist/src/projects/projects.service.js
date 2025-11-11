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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectDto) {
        return this.prisma.project.create({
            data: createProjectDto,
            include: {
                user: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
                tasks: true,
                resources: true,
            },
        });
    }
    async findAll() {
        return this.prisma.project.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
                tasks: true,
                resources: true,
            },
        });
    }
    async findOne(id) {
        return this.prisma.project.findUnique({
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
                tasks: true,
                resources: true,
            },
        });
    }
    async findByUser(userId) {
        return this.prisma.project.findMany({
            where: { user_id: userId },
            include: {
                tasks: true,
                resources: true,
            },
        });
    }
    async findByExternalId(userId, externalId, source) {
        return this.prisma.project.findFirst({
            where: {
                user_id: userId,
                external_id: externalId,
                source: source,
            },
            include: {
                tasks: true,
                resources: true,
            },
        });
    }
    async update(id, updateProjectDto) {
        return this.prisma.project.update({
            where: { id },
            data: updateProjectDto,
            include: {
                user: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
                tasks: true,
                resources: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.project.delete({
            where: { id },
        });
    }
    async updateByUser(id, userId, updateProjectDto) {
        const project = await this.prisma.project.findUnique({
            where: { id },
        });
        if (!project) {
            throw new Error("Project not found");
        }
        if (project.user_id !== userId) {
            throw new Error("You can only update your own projects");
        }
        return this.prisma.project.update({
            where: { id },
            data: updateProjectDto,
            include: {
                user: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
                tasks: true,
                resources: true,
            },
        });
    }
    async removeByUser(id, userId) {
        const project = await this.prisma.project.findUnique({
            where: { id },
        });
        if (!project) {
            throw new Error("Project not found");
        }
        if (project.user_id !== userId) {
            throw new Error("You can only delete your own projects");
        }
        return this.prisma.project.delete({
            where: { id },
        });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map