import { ChatService, SendMessageDto } from "./chat.service";
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessage(req: any, sendMessageDto: SendMessageDto): Promise<import("./chat.service").ChatResponse>;
    continueWithContext(req: any, conversationId: string, contextData: any): Promise<import("./chat.service").ChatResponse>;
    getConversationHistory(req: any, conversationId: string): Promise<{
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
    embedResource(req: any, resourceId: string, conversationId: string): Promise<{
        status: string;
        message: string;
    }>;
    embedMessage(req: any, messageId: string, conversationId: string): Promise<{
        status: string;
        message: string;
    }>;
    handleIntent(req: any, conversationId: string, intent: any): Promise<any>;
}
