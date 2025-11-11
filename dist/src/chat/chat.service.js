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
var ChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../ai/ai.service");
const conversations_service_1 = require("../conversations/conversations.service");
const chat_messages_service_1 = require("../chat-messages/chat-messages.service");
const projects_service_1 = require("../projects/projects.service");
const tasks_service_1 = require("../tasks/tasks.service");
let ChatService = ChatService_1 = class ChatService {
    aiService;
    conversationsService;
    chatMessagesService;
    projectsService;
    tasksService;
    logger = new common_1.Logger(ChatService_1.name);
    constructor(aiService, conversationsService, chatMessagesService, projectsService, tasksService) {
        this.aiService = aiService;
        this.conversationsService = conversationsService;
        this.chatMessagesService = chatMessagesService;
        this.projectsService = projectsService;
        this.tasksService = tasksService;
    }
    async sendMessage(userId, sendMessageDto) {
        const { conversationId, message, contextSource, projectId, taskId } = sendMessageDto;
        let conversation;
        if (conversationId) {
            try {
                conversation = await this.conversationsService.findOne(conversationId, userId);
            }
            catch (error) {
                this.logger.warn(`Conversation ${conversationId} not found, creating new one`);
                conversation = await this.conversationsService.create(userId, {
                    context_source: contextSource,
                });
            }
        }
        else {
            conversation = await this.conversationsService.create(userId, {
                context_source: contextSource,
            });
        }
        const userMessage = await this.chatMessagesService.create(userId, {
            conversation_id: conversation.id,
            type: "Prompt",
            prompt: message,
            projects: [],
            tasks: [],
            todos: [],
        });
        const contextData = await this.prepareContextData(userId, projectId, taskId);
        const chatInput = {
            user_id: userId,
            conversation_id: conversation.id,
            prompt: message,
            projects: contextData.projects,
            tasks: contextData.tasks,
            stage: "thinking",
        };
        const aiResponse = {
            stage: "response",
            conversation_id: conversation.id,
            text: "Chat service deprecated - please use /ai/chat endpoint directly",
            timestamp: new Date().toISOString(),
        };
        const aiMessage = await this.chatMessagesService.create(userId, {
            conversation_id: conversation.id,
            type: "Response",
            text: aiResponse.text || "",
            blocks: null,
            token_usage: null,
            metadata: {
                timestamp: aiResponse.timestamp,
                deprecated: true,
                note: "Please use /ai/chat endpoint",
            },
        });
        return {
            conversation,
            message: aiMessage,
            aiResponse,
            requiresContext: false,
        };
    }
    async continueWithContext(userId, conversationId, contextData) {
        const conversation = await this.conversationsService.findOne(conversationId, userId);
        const contextInput = {
            conversation_id: conversation.ai_engine_id || conversation.id,
            user_id: userId,
            context_data: contextData,
            stage: "response",
        };
        const aiResponse = {
            stage: "response",
            conversation_id: conversation.ai_engine_id || conversation.id,
            text: "AI service not yet implemented",
            timestamp: new Date().toISOString(),
        };
        const aiMessage = await this.chatMessagesService.create(userId, {
            conversation_id: conversation.id,
            type: "Response",
            text: aiResponse.text || "",
            blocks: aiResponse.blocks,
            token_usage: aiResponse.token_usage,
            metadata: {
                timestamp: aiResponse.timestamp,
                context_provided: true,
                deprecated: true,
            },
        });
        return {
            conversation,
            message: aiMessage,
            aiResponse,
            requiresContext: false,
        };
    }
    async getConversationHistory(userId, conversationId) {
        const conversation = await this.conversationsService.findOne(conversationId, userId);
        const messages = await this.chatMessagesService.findByConversation(conversationId, userId);
        return {
            conversation,
            messages,
        };
    }
    async embedResource(userId, resourceId, conversationId) {
        const embedInput = {
            user_id: userId,
            conversation_id: conversationId,
            resource_id: resourceId,
            resource_type: "Document",
            title: "Resource Title",
            content: "Resource content...",
        };
        return {
            status: "not_implemented",
            message: "AI service not yet implemented",
        };
    }
    async embedMessage(userId, messageId, conversationId) {
        const message = await this.chatMessagesService.findOne(messageId, userId);
        const messageContent = message.type === "Prompt" ? message.prompt : message.text;
        const embedInput = {
            user_id: userId,
            conversation_id: conversationId,
            message_id: messageId,
            message_content: messageContent,
        };
        return {
            status: "not_implemented",
            message: "AI service not yet implemented",
        };
    }
    async prepareContextData(userId, projectId, taskId) {
        const contextData = {
            projects: [],
            tasks: [],
        };
        try {
            const projects = await this.projectsService.findAll();
            contextData.projects = projects
                .filter((p) => p.user_id === userId)
                .map((project) => ({
                project_id: project.id,
                title: project.title,
                description: project.description,
            }));
            const tasks = await this.tasksService.findAll();
            contextData.tasks = tasks
                .filter((t) => t.user_id === userId)
                .map((task) => ({
                task_id: task.id,
                title: task.title,
                description: task.description,
                due_datetime: task.due_date?.toISOString(),
                project_id: task.project_id,
            }));
            if (projectId) {
                const project = projects.find((p) => p.id === projectId);
                if (project) {
                    contextData.projects = [
                        {
                            project_id: project.id,
                            title: project.title,
                            description: project.description,
                        },
                    ];
                }
            }
            if (taskId) {
                const task = tasks.find((t) => t.id === taskId);
                if (task) {
                    contextData.tasks = [
                        {
                            task_id: task.id,
                            title: task.title,
                            description: task.description,
                            due_datetime: task.due_date?.toISOString(),
                            project_id: task.project_id,
                        },
                    ];
                }
            }
        }
        catch (error) {
            this.logger.warn("Failed to prepare context data:", error.message);
        }
        return contextData;
    }
    async handleIntent(userId, conversationId, intent) {
        const conversation = await this.conversationsService.findOne(conversationId, userId);
        switch (intent.type) {
            case "backend_query":
                return this.handleBackendQuery(userId, intent);
            case "proposed_schedule":
                return this.handleProposedSchedule(userId, intent);
            case "proposed_tasks":
                return this.handleProposedTasks(userId, intent);
            default:
                this.logger.warn(`Unknown intent type: ${intent.type}`);
                return null;
        }
    }
    async handleBackendQuery(userId, intent) {
        const contextData = {};
        if (intent.targets?.includes("assignments")) {
            const tasks = await this.tasksService.findAll();
            contextData.assignments = tasks
                .filter((t) => t.user_id === userId)
                .map((task) => ({
                title: task.title,
                description: task.description,
                due_date: task.due_date?.toISOString(),
                status: "not_started",
                project_id: task.project_id,
                task_id: task.id,
            }));
        }
        if (intent.targets?.includes("schedule")) {
            contextData.schedule = {
                items: [],
                available_slots: [],
            };
        }
        return contextData;
    }
    async handleProposedSchedule(userId, intent) {
        this.logger.log("Handling proposed schedule:", intent.payload);
        return { status: "schedule_proposed", data: intent.payload };
    }
    async handleProposedTasks(userId, intent) {
        this.logger.log("Handling proposed tasks:", intent.payload);
        return { status: "tasks_proposed", data: intent.payload };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = ChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ai_service_1.AiService,
        conversations_service_1.ConversationsService,
        chat_messages_service_1.ChatMessagesService,
        projects_service_1.ProjectsService,
        tasks_service_1.TasksService])
], ChatService);
//# sourceMappingURL=chat.service.js.map