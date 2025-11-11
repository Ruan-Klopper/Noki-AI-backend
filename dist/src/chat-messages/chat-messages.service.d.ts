import { PrismaService } from "../database/prisma.service";
import { CreateChatMessageDto } from "./dtos/create-chat-message.dto";
import { UpdateChatMessageDto } from "./dtos/update-chat-message.dto";
import { MessageType } from "../common/enums/prisma-enums";
export declare class ChatMessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createChatMessageDto: CreateChatMessageDto): Promise<{
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        } | null;
        conversation: {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string | null;
            description: string | null;
            user_id: string;
            ai_engine_id: string | null;
            context_source: string | null;
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
    }>;
    findAll(userId: string, conversationId?: string): Promise<({
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
    })[]>;
    findOne(id: string, userId: string): Promise<{
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
            user_id: string;
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
    }>;
    update(id: string, userId: string, updateChatMessageDto: UpdateChatMessageDto): Promise<{
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
    }>;
    remove(id: string, userId: string): Promise<{
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
    }>;
    findByConversation(conversationId: string, userId: string): Promise<({
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
    })[]>;
    findByType(conversationId: string, userId: string, type: MessageType): Promise<({
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
    })[]>;
}
