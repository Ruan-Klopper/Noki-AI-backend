import { PrismaService } from "../database/prisma.service";
import { CreateConversationDto } from "./dtos/create-conversation.dto";
import { UpdateConversationDto } from "./dtos/update-conversation.dto";
export declare class ConversationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createConversationDto: CreateConversationDto): Promise<{
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
    findAll(userId: string): Promise<({
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
    findOne(id: string, userId: string): Promise<{
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
    update(id: string, userId: string, updateConversationDto: UpdateConversationDto): Promise<{
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
    remove(id: string, userId: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string | null;
        description: string | null;
        user_id: string;
        ai_engine_id: string | null;
        context_source: string | null;
    }>;
    findByAiEngineId(aiEngineId: string, userId: string): Promise<{
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
    updateAiEngineId(id: string, userId: string, aiEngineId: string): Promise<{
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
