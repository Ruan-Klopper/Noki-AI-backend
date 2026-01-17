import { AiService, HealthResponse, AIServerChatResponse } from "./ai.service";
import { ChatAiDto } from "./dtos/chat-ai.dto";
import { AIDataRequestDto } from "./dtos/ai-data-request.dto";
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    healthCheck(): Promise<HealthResponse>;
    chat(currentUser: any, req: any, chatDto: ChatAiDto): Promise<AIServerChatResponse>;
    createConversation(currentUser: any): Promise<{
        conversation_id: string;
    }>;
    getConversationHistory(currentUser: any, conversationId: string): Promise<{
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
        messages: {
            id: string;
            created_at: Date;
            projects: import("@prisma/client/runtime/library").JsonValue | null;
            tasks: import("@prisma/client/runtime/library").JsonValue | null;
            todos: import("@prisma/client/runtime/library").JsonValue | null;
            user_id: string | null;
            type: import(".prisma/client").$Enums.MessageType;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            text: string | null;
            conversation_id: string;
            prompt: string | null;
            blocks: import("@prisma/client/runtime/library").JsonValue | null;
            token_usage: import("@prisma/client/runtime/library").JsonValue | null;
            embedding_id: string | null;
        }[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string | null;
        description: string | null;
        user_id: string;
        ai_engine_id: string | null;
        context_source: string | null;
    }>;
    getAllConversations(currentUser: any): Promise<{
        id: string;
        title: string | null;
        created_at: Date;
        updated_at: Date;
        message_count: number;
    }[]>;
    renameConversation(currentUser: any, conversationId: string, title: string): Promise<{
        id: string;
        updated_at: Date;
        title: string | null;
    }>;
    deleteConversation(currentUser: any, conversationId: string): Promise<{
        message: string;
        conversation_id: string;
    }>;
    fetchDataForAI(currentUser: any, dataRequest: AIDataRequestDto): Promise<{
        projects: import("./ai.service").AIProject[];
        tasks: import("./ai.service").AITask[];
        todos: import("./ai.service").AITodo[];
    }>;
}
