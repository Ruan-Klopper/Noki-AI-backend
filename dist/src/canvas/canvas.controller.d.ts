import { CanvasService } from "./canvas.service";
import { SetupCanvasDto } from "./dtos/setup-canvas.dto";
import { SetupCanvasResponseDto } from "./dtos/setup-canvas-response.dto";
import { LinkCanvasDataResponseDto } from "./dtos/link-canvas-data-response.dto";
export declare class CanvasController {
    private readonly canvasService;
    constructor(canvasService: CanvasService);
    setupCanvasLink(setupCanvasDto: SetupCanvasDto, currentUser: any): Promise<SetupCanvasResponseDto>;
    linkCanvasData(currentUser: any): Promise<LinkCanvasDataResponseDto>;
    getProjects(): Promise<{
        message: string;
    }>;
    getAssignments(): Promise<{
        message: string;
    }>;
    syncData(currentUser: any): Promise<{
        message: string;
    }>;
    deleteAllCanvasData(currentUser: any): Promise<{
        message: string;
        deleted: {
            todos: number;
            tasks: number;
            projects: number;
            auth_providers: number;
        };
    }>;
}
