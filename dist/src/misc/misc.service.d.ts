import { PrismaService } from "../database/prisma.service";
import { AiService } from "../ai/ai.service";
export declare class MiscService {
    private readonly prisma;
    private readonly aiService;
    private readonly logger;
    private readonly startTime;
    constructor(prisma: PrismaService, aiService: AiService);
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
    private checkDatabaseHealth;
    private checkAiServiceHealth;
    deleteAllUserData(userId: string, requestingUserId: string): Promise<void>;
    getUserDataSummary(userId: string, requestingUserId: string): Promise<{
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
    getAllUserData(userId: string): Promise<{
        resultForUserId: string;
        data: {
            projects: any[];
        };
    }>;
}
