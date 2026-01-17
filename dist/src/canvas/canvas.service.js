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
exports.CanvasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const projects_service_1 = require("../projects/projects.service");
const tasks_service_1 = require("../tasks/tasks.service");
const auth_provider_service_1 = require("../auth-provider/auth-provider.service");
const interfaces_1 = require("../common/interfaces");
const axios_1 = require("axios");
let CanvasService = class CanvasService {
    prisma;
    projectsService;
    tasksService;
    authProviderService;
    constructor(prisma, projectsService, tasksService, authProviderService) {
        this.prisma = prisma;
        this.projectsService = projectsService;
        this.tasksService = tasksService;
        this.authProviderService = authProviderService;
    }
    projectColors = [
        "#1d72a6",
        "#fc692b",
        "#fb923c",
        "#c084fc",
        "#60a5fa",
        "#4ade80",
        "#f472b6",
        "#facc15",
        "#f87171",
        "#2dd4bf",
        "#22d3ee",
        "#818cf8",
    ];
    getRandomProjectColor() {
        const idx = Math.floor(Math.random() * this.projectColors.length);
        return this.projectColors[idx];
    }
    async setupCanvasLink(userId, setupCanvasDto) {
        const { canvas_institutional_url, canvas_token } = setupCanvasDto;
        try {
            const canvasUserDetails = await this.testCanvasConnection(canvas_institutional_url, canvas_token);
            const authProviderData = {
                user_id: userId,
                type: interfaces_1.AuthProviderType.Canvas,
                base_url: canvas_institutional_url,
                access_token: canvas_token,
                metadata: {
                    canvas_user_id: canvasUserDetails.id,
                    canvas_user_name: canvasUserDetails.name,
                    setup_date: new Date().toISOString(),
                },
            };
            const existingCanvasProvider = await this.authProviderService.findByUser(userId);
            const canvasProvider = existingCanvasProvider.find((provider) => provider.type === interfaces_1.AuthProviderType.Canvas);
            let authProvider;
            if (canvasProvider) {
                authProvider = await this.authProviderService.update(canvasProvider.id, {
                    base_url: canvas_institutional_url,
                    access_token: canvas_token,
                    metadata: authProviderData.metadata,
                });
            }
            else {
                authProvider = await this.authProviderService.create(authProviderData);
            }
            return {
                message: "Canvas Linked successfully",
                user_details: canvasUserDetails,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException("Failed to setup Canvas integration", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async testCanvasConnection(baseUrl, token) {
        try {
            const apiUrl = `${baseUrl}/api/v1/users/self`;
            const response = await axios_1.default.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            });
            if (response.status === 200 && response.data) {
                return response.data;
            }
            else {
                throw new common_1.BadRequestException("Invalid Canvas API response");
            }
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new common_1.BadRequestException("Invalid Canvas token or insufficient permissions");
                }
                else if (error.response?.status === 404) {
                    throw new common_1.BadRequestException("Canvas API endpoint not found. Please check your institutional URL");
                }
                else if (error.code === "ECONNREFUSED" ||
                    error.code === "ENOTFOUND") {
                    throw new common_1.BadRequestException("Cannot connect to Canvas server. Please check your institutional URL");
                }
                else {
                    throw new common_1.BadRequestException(`Canvas API error: ${error.message}`);
                }
            }
            throw new common_1.BadRequestException("Failed to connect to Canvas API");
        }
    }
    async getProjects() {
        return { message: "Canvas projects integration" };
    }
    async getAssignments() {
        return { message: "Canvas assignments integration" };
    }
    async syncData(userId) {
        return { message: "Canvas data sync completed" };
    }
    async linkCanvasData(userId) {
        try {
            const canvasProvider = await this.getCanvasAuthProvider(userId);
            if (!canvasProvider) {
                throw new common_1.BadRequestException("Canvas account not found. Please setup Canvas integration first.");
            }
            const coursesLinked = await this.linkCanvasCourses(userId, canvasProvider);
            const assignmentsLinked = await this.linkCanvasAssignments(userId, canvasProvider);
            return {
                message: `Your canvas account has been linked successfully, ${coursesLinked} courses and ${assignmentsLinked} assignments loaded to your Noki account.`,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException("Failed to link Canvas data", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCanvasProvider(userId) {
        const provider = await this.getCanvasAuthProvider(userId);
        if (!provider) {
            return null;
        }
        return {
            id: provider.id,
            base_url: provider.base_url,
            metadata: provider.metadata,
            created_at: provider.created_at,
            hasToken: !!provider.access_token_hash,
        };
    }
    async getCanvasAuthProvider(userId) {
        const authProviders = await this.authProviderService.findByUser(userId);
        return authProviders.find((provider) => provider.type === interfaces_1.AuthProviderType.Canvas);
    }
    async linkCanvasCourses(userId, canvasProvider) {
        const baseUrl = canvasProvider.base_url;
        const accessToken = await this.authProviderService.getAccessToken(userId, "Canvas");
        if (!accessToken) {
            throw new common_1.BadRequestException("Canvas access token not found");
        }
        console.log("Canvas API Debug:", {
            baseUrl,
            tokenLength: accessToken?.length,
            tokenPrefix: accessToken?.substring(0, 10) + "...",
            apiUrl: `${baseUrl}/api/v1/courses?enrollment_state=active`,
        });
        try {
            const coursesResponse = await axios_1.default.get(`${baseUrl}/api/v1/courses?enrollment_state=active`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            });
            const courses = coursesResponse.data;
            let coursesLinked = 0;
            for (const course of courses) {
                const existingProject = await this.projectsService.findByExternalId(userId, course.id.toString(), interfaces_1.ProjectSource.Canvas);
                const selectedColor = existingProject?.color_hex || this.getRandomProjectColor();
                const projectData = {
                    user_id: userId,
                    title: course.name,
                    description: course.description || "",
                    source: interfaces_1.ProjectSource.Canvas,
                    external_id: course.id.toString(),
                    course_code: course.course_code,
                    color_hex: selectedColor,
                    time_zone: course.time_zone,
                    start_at: course.start_at
                        ? new Date(course.start_at).toISOString()
                        : undefined,
                    end_at: course.end_at
                        ? new Date(course.end_at).toISOString()
                        : undefined,
                    raw_canvas_data: course,
                };
                if (existingProject) {
                    await this.projectsService.update(existingProject.id, {
                        ...projectData,
                        color_hex: existingProject.color_hex || selectedColor,
                    });
                }
                else {
                    await this.projectsService.create(projectData);
                }
                coursesLinked++;
            }
            return coursesLinked;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new common_1.BadRequestException(`Failed to fetch Canvas courses: ${error.message}`);
            }
            throw new common_1.BadRequestException("Failed to fetch Canvas courses");
        }
    }
    async linkCanvasAssignments(userId, canvasProvider) {
        const baseUrl = canvasProvider.base_url;
        const accessToken = await this.authProviderService.getAccessToken(userId, "Canvas");
        if (!accessToken) {
            throw new common_1.BadRequestException("Canvas access token not found");
        }
        console.log("Canvas Assignments Debug:", {
            baseUrl,
            tokenLength: accessToken?.length,
            tokenPrefix: accessToken?.substring(0, 10) + "...",
        });
        try {
            const canvasProjects = await this.projectsService.findByUser(userId);
            const canvasProjectsFiltered = canvasProjects.filter((project) => project.source === interfaces_1.ProjectSource.Canvas);
            let assignmentsLinked = 0;
            for (const project of canvasProjectsFiltered) {
                if (!project.external_id)
                    continue;
                try {
                    const assignmentsResponse = await axios_1.default.get(`${baseUrl}/api/v1/courses/${project.external_id}/assignments`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                        timeout: 10000,
                    });
                    const assignments = assignmentsResponse.data;
                    for (const assignment of assignments) {
                        const taskData = {
                            user_id: userId,
                            project_id: project.id,
                            title: assignment.name,
                            description: assignment.description || "",
                            due_date: assignment.due_at
                                ? new Date(assignment.due_at).toISOString()
                                : undefined,
                            type: interfaces_1.TaskType.Canvas,
                            priority: this.determinePriority(assignment.points_possible, assignment.due_at),
                            is_submitted: assignment.has_submitted_submissions,
                            raw_canvas_data: assignment,
                        };
                        const existingTasks = await this.tasksService.findByProject(project.id);
                        const existingTask = existingTasks.find((task) => task.raw_canvas_data &&
                            typeof task.raw_canvas_data === "object" &&
                            "id" in task.raw_canvas_data &&
                            task.raw_canvas_data.id === assignment.id);
                        if (!existingTask) {
                            await this.tasksService.create(taskData);
                            assignmentsLinked++;
                        }
                    }
                }
                catch (assignmentError) {
                    console.warn(`Failed to fetch assignments for course ${project.external_id}:`, assignmentError.message);
                }
            }
            return assignmentsLinked;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new common_1.BadRequestException(`Failed to fetch Canvas assignments: ${error.message}`);
            }
            throw new common_1.BadRequestException("Failed to fetch Canvas assignments");
        }
    }
    determinePriority(pointsPossible, dueDate) {
        if (!dueDate)
            return interfaces_1.Priority.Medium;
        const dueDateObj = new Date(dueDate);
        const now = new Date();
        const daysUntilDue = Math.ceil((dueDateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (pointsPossible >= 100) {
            return daysUntilDue <= 3 ? interfaces_1.Priority.High : interfaces_1.Priority.Medium;
        }
        else if (pointsPossible >= 50) {
            return daysUntilDue <= 7 ? interfaces_1.Priority.High : interfaces_1.Priority.Medium;
        }
        else {
            return daysUntilDue <= 14 ? interfaces_1.Priority.Medium : interfaces_1.Priority.Low;
        }
    }
    async deleteAllCanvasData(userId) {
        return await this.prisma.$transaction(async (tx) => {
            const canvasProjects = await tx.project.findMany({
                where: { user_id: userId, source: interfaces_1.ProjectSource.Canvas },
                select: { id: true },
            });
            const projectIds = canvasProjects.map((p) => p.id);
            const deleteTodos = await tx.todo.deleteMany({
                where: {
                    OR: [
                        { user_id: userId },
                        {
                            task: {
                                project_id: {
                                    in: projectIds.length ? projectIds : ["__none__"],
                                },
                            },
                        },
                    ],
                },
            });
            const deleteTasks = await tx.task.deleteMany({
                where: {
                    OR: [
                        {
                            project_id: { in: projectIds.length ? projectIds : ["__none__"] },
                        },
                        { user_id: userId, type: interfaces_1.TaskType.Canvas },
                    ],
                },
            });
            const deleteProjects = await tx.project.deleteMany({
                where: { user_id: userId, source: interfaces_1.ProjectSource.Canvas },
            });
            const deleteProviders = await tx.authProvider.deleteMany({
                where: { user_id: userId, type: interfaces_1.AuthProviderType.Canvas },
            });
            return {
                message: "All Canvas data deleted successfully",
                deleted: {
                    todos: deleteTodos.count,
                    tasks: deleteTasks.count,
                    projects: deleteProjects.count,
                    auth_providers: deleteProviders.count,
                },
            };
        });
    }
};
exports.CanvasService = CanvasService;
exports.CanvasService = CanvasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        projects_service_1.ProjectsService,
        tasks_service_1.TasksService,
        auth_provider_service_1.AuthProviderService])
], CanvasService);
//# sourceMappingURL=canvas.service.js.map