import { PrismaService } from "../database/prisma.service";
import { ProjectsService } from "../projects/projects.service";
import { TasksService } from "../tasks/tasks.service";
import { AuthProviderService } from "../auth-provider/auth-provider.service";
import { SetupCanvasDto } from "./dtos/setup-canvas.dto";
import { SetupCanvasResponseDto } from "./dtos/setup-canvas-response.dto";
import { LinkCanvasDataResponseDto } from "./dtos/link-canvas-data-response.dto";
export declare class CanvasService {
    private prisma;
    private projectsService;
    private tasksService;
    private authProviderService;
    constructor(prisma: PrismaService, projectsService: ProjectsService, tasksService: TasksService, authProviderService: AuthProviderService);
    private readonly projectColors;
    private getRandomProjectColor;
    setupCanvasLink(userId: string, setupCanvasDto: SetupCanvasDto): Promise<SetupCanvasResponseDto>;
    private testCanvasConnection;
    getProjects(): Promise<{
        message: string;
    }>;
    getAssignments(): Promise<{
        message: string;
    }>;
    syncData(userId: string): Promise<{
        message: string;
    }>;
    linkCanvasData(userId: string): Promise<LinkCanvasDataResponseDto>;
    getCanvasProvider(userId: string): Promise<{
        id: string;
        base_url: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        created_at: Date;
        hasToken: boolean;
    } | null>;
    private getCanvasAuthProvider;
    private linkCanvasCourses;
    private linkCanvasAssignments;
    private determinePriority;
    deleteAllCanvasData(userId: string): Promise<{
        message: string;
        deleted: {
            todos: number;
            tasks: number;
            projects: number;
            auth_providers: number;
        };
    }>;
}
