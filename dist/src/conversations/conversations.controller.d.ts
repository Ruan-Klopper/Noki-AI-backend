import { ConversationsService } from "./conversations.service";
import { CreateConversationDto } from "./dtos/create-conversation.dto";
import { UpdateConversationDto } from "./dtos/update-conversation.dto";
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    create(req: any, createConversationDto: CreateConversationDto): Promise<{
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
    findAll(req: any): Promise<({
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
        _count: {
            messages: number;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string | null;
        description: string | null;
        user_id: string;
        ai_engine_id: string | null;
        context_source: string | null;
    })[]>;
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, updateConversationDto: UpdateConversationDto): Promise<{
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
    remove(req: any, id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string | null;
        description: string | null;
        user_id: string;
        ai_engine_id: string | null;
        context_source: string | null;
    }>;
    findByAiEngineId(req: any, aiEngineId: string): Promise<{
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
    updateAiEngineId(req: any, id: string, aiEngineId: string): Promise<{
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
}
