import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import {
  AiService,
  // ChatInput,
  // ContextInput,
  // AIResponse,
} from "../ai/ai.service";
import { ConversationsService } from "../conversations/conversations.service";
import { ChatMessagesService } from "../chat-messages/chat-messages.service";
import { ProjectsService } from "../projects/projects.service";
import { TasksService } from "../tasks/tasks.service";
import { MessageRole, ChatStage } from "../common/enums/prisma-enums";

// Temporary interfaces until we implement them in AI service
interface ChatInput {
  user_id: string;
  conversation_id: string;
  prompt: string;
  projects?: any[];
  tasks?: any[];
  stage?: string;
}

interface ContextInput {
  conversation_id: string;
  user_id: string;
  context_data: any;
  stage?: string;
}

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

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly aiService: AiService,
    private readonly conversationsService: ConversationsService,
    private readonly chatMessagesService: ChatMessagesService,
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService
  ) {}

  async sendMessage(
    userId: string,
    sendMessageDto: SendMessageDto
  ): Promise<ChatResponse> {
    const { conversationId, message, contextSource, projectId, taskId } =
      sendMessageDto;

    // Get or create conversation
    let conversation;
    if (conversationId) {
      try {
        conversation = await this.conversationsService.findOne(
          conversationId,
          userId
        );
      } catch (error) {
        this.logger.warn(
          `Conversation ${conversationId} not found, creating new one`
        );
        conversation = await this.conversationsService.create(userId, {
          context_source: contextSource,
        });
      }
    } else {
      conversation = await this.conversationsService.create(userId, {
        context_source: contextSource,
      });
    }

    // Store user message (DEPRECATED: This service is deprecated - use /ai/chat instead)
    const userMessage = await this.chatMessagesService.create(userId, {
      conversation_id: conversation.id,
      type: "Prompt" as any,
      prompt: message,
      projects: [],
      tasks: [],
      todos: [],
    });

    // Prepare context data for AI
    const contextData = await this.prepareContextData(
      userId,
      projectId,
      taskId
    );

    // Send to AI server
    const chatInput: ChatInput = {
      user_id: userId,
      conversation_id: conversation.id,
      prompt: message,
      projects: contextData.projects,
      tasks: contextData.tasks,
      stage: "thinking",
    };

    // DEPRECATED: Old AI service methods have been removed
    // The new simplified AI endpoint is at /ai/chat
    // This chat service is now only for managing conversation/message records in the database

    // TODO: Update this to use the new simplified AI endpoint if needed
    // For now, return a placeholder response
    const aiResponse: AIResponse = {
      stage: "response",
      conversation_id: conversation.id,
      text: "Chat service deprecated - please use /ai/chat endpoint directly",
      timestamp: new Date().toISOString(),
    };

    // Store AI response placeholder
    const aiMessage = await this.chatMessagesService.create(userId, {
      conversation_id: conversation.id,
      type: "Response" as any,
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

  async continueWithContext(
    userId: string,
    conversationId: string,
    contextData: any
  ): Promise<ChatResponse> {
    const conversation = await this.conversationsService.findOne(
      conversationId,
      userId
    );

    // Send context to AI server
    const contextInput: ContextInput = {
      conversation_id: conversation.ai_engine_id || conversation.id,
      user_id: userId,
      context_data: contextData,
      stage: "response",
    };

    // TODO: Implement continueWithContext in AI service
    // const aiResponse = await this.aiService.continueWithContext(contextInput);
    const aiResponse: AIResponse = {
      stage: "response",
      conversation_id: conversation.ai_engine_id || conversation.id,
      text: "AI service not yet implemented",
      timestamp: new Date().toISOString(),
    };

    // Store AI response (DEPRECATED)
    const aiMessage = await this.chatMessagesService.create(userId, {
      conversation_id: conversation.id,
      type: "Response" as any,
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

  async getConversationHistory(userId: string, conversationId: string) {
    const conversation = await this.conversationsService.findOne(
      conversationId,
      userId
    );
    const messages = await this.chatMessagesService.findByConversation(
      conversationId,
      userId
    );

    return {
      conversation,
      messages,
    };
  }

  async embedResource(
    userId: string,
    resourceId: string,
    conversationId: string
  ) {
    // Get resource details (assuming you have a resources service)
    // const resource = await this.resourcesService.findOne(resourceId, userId);

    const embedInput = {
      user_id: userId,
      conversation_id: conversationId,
      resource_id: resourceId,
      resource_type: "Document", // This should come from the resource
      title: "Resource Title", // This should come from the resource
      content: "Resource content...", // This should come from the resource
    };

    // TODO: Implement embedResource in AI service
    // return this.aiService.embedResource(embedInput);
    return {
      status: "not_implemented",
      message: "AI service not yet implemented",
    };
  }

  async embedMessage(
    userId: string,
    messageId: string,
    conversationId: string
  ) {
    const message = await this.chatMessagesService.findOne(messageId, userId);

    // Get content from new schema (either prompt or text depending on type)
    const messageContent =
      message.type === "Prompt" ? message.prompt : message.text;

    const embedInput = {
      user_id: userId,
      conversation_id: conversationId,
      message_id: messageId,
      message_content: messageContent,
    };

    // TODO: Implement embedMessage in AI service
    // return this.aiService.embedMessage(embedInput);
    return {
      status: "not_implemented",
      message: "AI service not yet implemented",
    };
  }

  private async prepareContextData(
    userId: string,
    projectId?: string,
    taskId?: string
  ) {
    const contextData: any = {
      projects: [],
      tasks: [],
    };

    try {
      // Get user's projects
      const projects = await this.projectsService.findAll();
      contextData.projects = projects
        .filter((p) => p.user_id === userId)
        .map((project) => ({
          project_id: project.id,
          title: project.title,
          description: project.description,
        }));

      // Get user's tasks
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

      // If specific project/task requested, prioritize them
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
    } catch (error) {
      this.logger.warn("Failed to prepare context data:", error.message);
    }

    return contextData;
  }

  async handleIntent(userId: string, conversationId: string, intent: any) {
    const conversation = await this.conversationsService.findOne(
      conversationId,
      userId
    );

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

  private async handleBackendQuery(userId: string, intent: any) {
    const contextData: any = {};

    if (intent.targets?.includes("assignments")) {
      // Get user's tasks as assignments
      const tasks = await this.tasksService.findAll();
      contextData.assignments = tasks
        .filter((t) => t.user_id === userId)
        .map((task) => ({
          title: task.title,
          description: task.description,
          due_date: task.due_date?.toISOString(),
          status: "not_started", // You might want to add status to tasks
          project_id: task.project_id,
          task_id: task.id,
        }));
    }

    if (intent.targets?.includes("schedule")) {
      // You might want to implement a schedule service
      contextData.schedule = {
        items: [],
        available_slots: [],
      };
    }

    return contextData;
  }

  private async handleProposedSchedule(userId: string, intent: any) {
    // Handle proposed schedule - you might want to create calendar events
    this.logger.log("Handling proposed schedule:", intent.payload);
    return { status: "schedule_proposed", data: intent.payload };
  }

  private async handleProposedTasks(userId: string, intent: any) {
    // Handle proposed tasks - you might want to create actual tasks
    this.logger.log("Handling proposed tasks:", intent.payload);
    return { status: "tasks_proposed", data: intent.payload };
  }
}
