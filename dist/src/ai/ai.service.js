"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("./api.service");
const globals_1 = require("./globals");
const tasks_service_1 = require("../tasks/tasks.service");
const todos_service_1 = require("../todos/todos.service");
const projects_service_1 = require("../projects/projects.service");
const conversations_service_1 = require("../conversations/conversations.service");
const prisma_service_1 = require("../database/prisma.service");
const prisma_enums_1 = require("../common/enums/prisma-enums");
let AiService = AiService_1 = class AiService {
    apiService;
    tasksService;
    todosService;
    projectsService;
    conversationsService;
    prismaService;
    logger = new common_1.Logger(AiService_1.name);
    constructor(apiService, tasksService, todosService, projectsService, conversationsService, prismaService) {
        this.apiService = apiService;
        this.tasksService = tasksService;
        this.todosService = todosService;
        this.projectsService = projectsService;
        this.conversationsService = conversationsService;
        this.prismaService = prismaService;
        this.logger.log("AI Service initialized");
        this.logger.log(`Environment: ${globals_1.AI_GLOBALS.is_dev ? "Development" : "Production"}`);
        this.logger.log(`AI Server URL: ${globals_1.AI_GLOBALS.aiServerUrl}`);
    }
    async healthCheck() {
        const baseResponse = {
            status: "ok",
            timestamp: new Date().toISOString(),
            environment: globals_1.AI_GLOBALS.is_dev ? "development" : "production",
            ai_server_url: globals_1.AI_GLOBALS.aiServerUrl + "health",
        };
        try {
            this.logger.log("Performing AI server health check");
            const aiServerResponse = await this.apiService.healthCheck();
            baseResponse.ai_server_response = aiServerResponse.data;
            this.logger.log("AI server health check successful");
            return baseResponse;
        }
        catch (error) {
            this.logger.error("AI server health check failed:", error.message);
            baseResponse.status = "ai_server_error";
            baseResponse.error = error.message;
            return baseResponse;
        }
    }
    async chat(userId, chatDto) {
        try {
            this.logger.log(`Processing chat request for user: ${userId}`);
            if (!userId) {
                throw new Error("User ID is required but was not provided");
            }
            this.logger.log(`User ID verified: ${userId}`);
            let conversation;
            try {
                conversation = await this.conversationsService.findOne(chatDto.conversation_id, userId);
                this.logger.log(`Using existing conversation: ${chatDto.conversation_id}`);
            }
            catch (error) {
                this.logger.log(`Conversation not found, creating new one with ID: ${chatDto.conversation_id}`);
                conversation = await this.prismaService.conversation.create({
                    data: {
                        id: chatDto.conversation_id,
                        user_id: userId,
                    },
                });
            }
            const projects = await this.fetchProjectDetails(chatDto.projects?.map((p) => p.project_id) || []);
            const tasks = await this.fetchTaskDetails(chatDto.tasks?.map((t) => t.task_id) || []);
            const todos = await this.fetchTodoDetails(chatDto.todos?.map((t) => t.todo_id) || []);
            await this.prismaService.chatMessage.create({
                data: {
                    conversation_id: chatDto.conversation_id,
                    user_id: userId,
                    type: prisma_enums_1.MessageType.Prompt,
                    prompt: chatDto.prompt,
                    projects: projects,
                    tasks: tasks,
                    todos: todos,
                },
            });
            this.logger.log(`Prompt message saved for conversation: ${chatDto.conversation_id}`);
            const aiServerPayload = {
                user_id: userId,
                conversation_id: chatDto.conversation_id,
                prompt: chatDto.prompt,
                projects,
                tasks,
                todos,
                stage: "thinking",
                metadata: {},
            };
            this.logger.log(`Sending chat request to AI server - User: ${userId}, Conversation: ${chatDto.conversation_id}, Projects: ${projects.length}, Tasks: ${tasks.length}, Todos: ${todos.length}`);
            console.log("=== AI Server Payload ===");
            console.log(JSON.stringify(aiServerPayload, null, 2));
            console.log("=========================");
            if (!aiServerPayload.user_id) {
                throw new Error("user_id is missing from payload!");
            }
            const response = await this.apiService.post("/chat/chat", aiServerPayload);
            this.logger.log(`Chat request successful for conversation: ${chatDto.conversation_id}`);
            const aiResponse = response.data;
            await this.prismaService.chatMessage.create({
                data: {
                    conversation_id: chatDto.conversation_id,
                    user_id: userId,
                    type: prisma_enums_1.MessageType.Response,
                    text: aiResponse.text || "",
                    blocks: aiResponse.blocks || null,
                    token_usage: aiResponse.token_usage || null,
                },
            });
            this.logger.log(`Response message saved for conversation: ${chatDto.conversation_id}`);
            return aiResponse;
        }
        catch (error) {
            this.logger.error("Chat request failed:", error.message);
            throw error;
        }
    }
    async fetchProjectDetails(projectIds) {
        if (!projectIds || projectIds.length === 0) {
            return [];
        }
        const projects = [];
        for (const projectId of projectIds) {
            try {
                const project = await this.projectsService.findOne(projectId);
                if (!project) {
                    this.logger.warn(`Project not found: ${projectId}`);
                    continue;
                }
                projects.push({
                    project_id: project.id,
                    title: project.title || "",
                    description: project.description || "",
                    instructor: "",
                });
            }
            catch (error) {
                this.logger.warn(`Error fetching project ${projectId}:`, error.message);
            }
        }
        return projects;
    }
    async fetchTaskDetails(taskIds) {
        if (!taskIds || taskIds.length === 0) {
            return [];
        }
        const tasks = [];
        for (const taskId of taskIds) {
            try {
                const task = await this.tasksService.findOne(taskId);
                if (!task) {
                    this.logger.warn(`Task not found: ${taskId}`);
                    continue;
                }
                tasks.push({
                    task_id: task.id,
                    title: task.title || "",
                    description: task.description || "",
                    due_datetime: task.due_date?.toISOString() || "",
                    status: task.is_submitted ? "done" : "not_started",
                    project_id: task.project_id || "",
                });
            }
            catch (error) {
                this.logger.warn(`Error fetching task ${taskId}:`, error.message);
            }
        }
        return tasks;
    }
    async fetchTodoDetails(todoIds) {
        if (!todoIds || todoIds.length === 0) {
            return [];
        }
        const todos = [];
        for (const todoId of todoIds) {
            try {
                const todo = await this.todosService.findOne(todoId);
                if (!todo) {
                    this.logger.warn(`Todo not found: ${todoId}`);
                    continue;
                }
                todos.push({
                    todo_id: todo.id,
                    title: todo.title || "",
                    description: todo.description || "",
                    due_date: todo.due_date?.toISOString() || "",
                    status: todo.is_submitted ? "done" : "not_started",
                    project_id: todo.task?.project_id || "",
                    task_id: todo.task_id || "",
                    priority: todo.priority || "",
                    estimated_duration: "",
                });
            }
            catch (error) {
                this.logger.warn(`Error fetching todo ${todoId}:`, error.message);
            }
        }
        return todos;
    }
    async createConversation(userId) {
        try {
            this.logger.log(`Creating new conversation for user: ${userId}`);
            const today = new Date();
            const formattedDate = today.toISOString().split("T")[0];
            const title = `New Conversation - ${formattedDate}`;
            const conversation = await this.prismaService.conversation.create({
                data: {
                    user_id: userId,
                    title: title,
                },
            });
            this.logger.log(`Conversation created successfully: ${conversation.id}`);
            return {
                conversation_id: conversation.id,
            };
        }
        catch (error) {
            this.logger.error("Failed to create conversation:", error.message);
            throw error;
        }
    }
    async getConversationHistory(userId, conversationId) {
        try {
            this.logger.log(`Fetching conversation history for conversation: ${conversationId}`);
            const conversation = await this.conversationsService.findOne(conversationId, userId);
            return conversation;
        }
        catch (error) {
            this.logger.error("Failed to fetch conversation history:", error.message);
            throw error;
        }
    }
    async getAllConversations(userId) {
        try {
            this.logger.log(`Fetching all conversations for user: ${userId}`);
            const conversations = await this.prismaService.conversation.findMany({
                where: {
                    user_id: userId,
                },
                select: {
                    id: true,
                    title: true,
                    created_at: true,
                    updated_at: true,
                    _count: {
                        select: {
                            messages: true,
                        },
                    },
                },
                orderBy: {
                    updated_at: "desc",
                },
            });
            const formattedConversations = conversations.map((conv) => ({
                id: conv.id,
                title: conv.title,
                created_at: conv.created_at,
                updated_at: conv.updated_at,
                message_count: conv._count.messages,
            }));
            this.logger.log(`Found ${formattedConversations.length} conversations for user: ${userId}`);
            return formattedConversations;
        }
        catch (error) {
            this.logger.error("Failed to fetch conversations:", error.message);
            throw error;
        }
    }
    async renameConversation(userId, conversationId, newTitle) {
        try {
            this.logger.log(`Renaming conversation ${conversationId} for user: ${userId}`);
            await this.conversationsService.findOne(conversationId, userId);
            const updatedConversation = await this.prismaService.conversation.update({
                where: {
                    id: conversationId,
                },
                data: {
                    title: newTitle,
                },
                select: {
                    id: true,
                    title: true,
                    updated_at: true,
                },
            });
            this.logger.log(`Conversation ${conversationId} renamed successfully to: ${newTitle}`);
            return updatedConversation;
        }
        catch (error) {
            this.logger.error("Failed to rename conversation:", error.message);
            throw error;
        }
    }
    async deleteConversation(userId, conversationId) {
        try {
            this.logger.log(`Deleting conversation ${conversationId} for user: ${userId}`);
            await this.conversationsService.findOne(conversationId, userId);
            await this.prismaService.conversation.delete({
                where: {
                    id: conversationId,
                },
            });
            this.logger.log(`Conversation ${conversationId} and all messages deleted successfully`);
            return {
                message: "Conversation deleted successfully",
                conversation_id: conversationId,
            };
        }
        catch (error) {
            this.logger.error("Failed to delete conversation:", error.message);
            throw error;
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.ApiService,
        tasks_service_1.TasksService,
        todos_service_1.TodosService,
        projects_service_1.ProjectsService,
        conversations_service_1.ConversationsService,
        prisma_service_1.PrismaService])
], AiService);
//# sourceMappingURL=ai.service.js.map