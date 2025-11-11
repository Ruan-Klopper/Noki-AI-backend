import { ApiService } from "./api.service";
import { TasksService } from "../tasks/tasks.service";
import { TodosService } from "../todos/todos.service";
import { ProjectsService } from "../projects/projects.service";
import { ConversationsService } from "../conversations/conversations.service";
import { PrismaService } from "../database/prisma.service";
import { ChatAiDto } from "./dtos/chat-ai.dto";
export interface HealthResponse {
    status: string;
    timestamp: string;
    environment: string;
    ai_server_url: string;
    ai_server_response?: any;
    error?: string;
}
export interface AIProject {
    project_id: string;
    title: string;
    description: string;
    instructor: string;
}
export interface AITask {
    task_id: string;
    title: string;
    description: string;
    due_datetime: string;
    status: string;
    project_id: string;
}
export interface AITodo {
    todo_id: string;
    title: string;
    description: string;
    due_date: string;
    status: string;
    project_id: string;
    task_id: string;
    priority: string;
    estimated_duration: string;
}
export interface AIServerChatRequest {
    user_id: string;
    conversation_id: string;
    prompt: string;
    projects: AIProject[];
    tasks: AITask[];
    todos: AITodo[];
    stage: string;
    metadata: Record<string, any>;
}
export interface AIServerChatResponse {
    [key: string]: any;
}
export declare class AiService {
    private readonly apiService;
    private readonly tasksService;
    private readonly todosService;
    private readonly projectsService;
    private readonly conversationsService;
    private readonly prismaService;
    private readonly logger;
    constructor(apiService: ApiService, tasksService: TasksService, todosService: TodosService, projectsService: ProjectsService, conversationsService: ConversationsService, prismaService: PrismaService);
    healthCheck(): Promise<HealthResponse>;
    chat(userId: string, chatDto: ChatAiDto): Promise<AIServerChatResponse>;
    private fetchProjectDetails;
    private fetchTaskDetails;
    private fetchTodoDetails;
    createConversation(userId: string): Promise<{
        conversation_id: string;
    }>;
    getConversationHistory(userId: string, conversationId: string): Promise<{
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
    getAllConversations(userId: string): Promise<{
        id: string;
        title: string | null;
        created_at: Date;
        updated_at: Date;
        message_count: number;
    }[]>;
    renameConversation(userId: string, conversationId: string, newTitle: string): Promise<{
        id: string;
        updated_at: Date;
        title: string | null;
    }>;
    deleteConversation(userId: string, conversationId: string): Promise<{
        message: string;
        conversation_id: string;
    }>;
}
