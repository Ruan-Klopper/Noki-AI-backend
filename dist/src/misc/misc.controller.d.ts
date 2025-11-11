import { MiscService } from "./misc.service";
export declare class MiscController {
    private readonly miscService;
    constructor(miscService: MiscService);
    healthCheck(): Promise<{
        status: string;
        timestamp: string;
        services: {
            backend: {
                status: string;
                uptime: number;
                environment: string;
            };
            database: {
                status: string;
                responseTime: number;
                error?: undefined;
            } | {
                status: string;
                responseTime: number;
                error: any;
            };
            ai_service: {
                status: string;
                url: string;
                responseTime: number;
                error?: undefined;
            } | {
                status: string;
                url: string;
                responseTime: number;
                error: any;
            };
        };
    }>;
    getAllUserData(currentUser: any): Promise<{
        resultForUserId: string;
        data: {
            projects: any[];
        };
    }>;
    getUserDataSummary(userId: string, currentUser: any): Promise<{
        user: any;
        counts: {
            authProviders: number;
            projects: number;
            tasks: number;
            todos: number;
            resources: number;
            conversations: number;
            chatMessages: number;
        };
    }>;
    deleteAllUserData(userId: string, currentUser: any): Promise<void>;
}
