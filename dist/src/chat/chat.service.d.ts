import { AiService } from "../ai/ai.service";
import { ConversationsService } from "../conversations/conversations.service";
import { ChatMessagesService } from "../chat-messages/chat-messages.service";
import { ProjectsService } from "../projects/projects.service";
import { TasksService } from "../tasks/tasks.service";
interface AIResponse {
    stage: string;
    conversation_id: string;
    text?: string;
    blocks?: any[] | null;
    intent?: any;
    timestamp: string;
    token_usage?: any;
}
export interface SendMessageDto {
    conversationId?: string;
    message: string;
    contextSource?: string;
    projectId?: string;
    taskId?: string;
}
export interface ChatResponse {
    conversation: any;
    message: any;
    aiResponse?: AIResponse;
    requiresContext?: boolean;
}
export declare class ChatService {
    private readonly aiService;
    private readonly conversationsService;
    private readonly chatMessagesService;
    private readonly projectsService;
    private readonly tasksService;
    private readonly logger;
    constructor(aiService: AiService, conversationsService: ConversationsService, chatMessagesService: ChatMessagesService, projectsService: ProjectsService, tasksService: TasksService);
    sendMessage(userId: string, sendMessageDto: SendMessageDto): Promise<ChatResponse>;
    continueWithContext(userId: string, conversationId: string, contextData: any): Promise<ChatResponse>;
    getConversationHistory(userId: string, conversationId: string): Promise<{
        conversation: {
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
        };
        messages: ({
            user: {
                id: string;
                email: string;
                firstname: string;
                lastname: string;
            } | null;
            conversation: {
                id: string;
                title: string | null;
                description: string | null;
            };
        } & {
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
        })[];
    }>;
    embedResource(userId: string, resourceId: string, conversationId: string): Promise<{
        status: string;
        message: string;
    }>;
    embedMessage(userId: string, messageId: string, conversationId: string): Promise<{
        status: string;
        message: string;
    }>;
    private prepareContextData;
    handleIntent(userId: string, conversationId: string, intent: any): Promise<any>;
    private handleBackendQuery;
    private handleProposedSchedule;
    private handleProposedTasks;
}
export {};
