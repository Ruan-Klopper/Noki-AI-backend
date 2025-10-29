import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ApiService } from "./api.service";
import { AI_GLOBALS } from "./globals";
import { TasksService } from "../tasks/tasks.service";
import { TodosService } from "../todos/todos.service";
import { ProjectsService } from "../projects/projects.service";
import { ConversationsService } from "../conversations/conversations.service";
import { PrismaService } from "../database/prisma.service";
import { ChatAiDto } from "./dtos/chat-ai.dto";
import { MessageType } from "../common/enums/prisma-enums";

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

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly apiService: ApiService,
    private readonly tasksService: TasksService,
    private readonly todosService: TodosService,
    private readonly projectsService: ProjectsService,
    private readonly conversationsService: ConversationsService,
    private readonly prismaService: PrismaService
  ) {
    this.logger.log("AI Service initialized");
    this.logger.log(
      `Environment: ${AI_GLOBALS.is_dev ? "Development" : "Production"}`
    );
    this.logger.log(`AI Server URL: ${AI_GLOBALS.aiServerUrl}`);
  }

  /**
   * Health check for the AI server
   * Returns both our service status and the AI server's response
   */
  async healthCheck(): Promise<HealthResponse> {
    const baseResponse: HealthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: AI_GLOBALS.is_dev ? "development" : "production",
      ai_server_url: AI_GLOBALS.aiServerUrl + "health",
    };

    try {
      this.logger.log("Performing AI server health check");

      // Make request to AI server health endpoint
      const aiServerResponse = await this.apiService.healthCheck();

      // Add the AI server's response to our response
      baseResponse.ai_server_response = aiServerResponse.data;

      this.logger.log("AI server health check successful");
      return baseResponse;
    } catch (error) {
      this.logger.error("AI server health check failed:", error.message);

      // Return error information but don't throw - we want to show our service is running
      baseResponse.status = "ai_server_error";
      baseResponse.error = error.message;

      return baseResponse;
    }
  }

  /**
   * Send chat message to AI server
   * Fetches full details for projects, tasks, and todos and sends to AI server
   */
  async chat(
    userId: string,
    chatDto: ChatAiDto
  ): Promise<AIServerChatResponse> {
    try {
      this.logger.log(`Processing chat request for user: ${userId}`);

      // Verify userId is not null/undefined
      if (!userId) {
        throw new Error("User ID is required but was not provided");
      }

      this.logger.log(`User ID verified: ${userId}`);

      // Verify or create conversation
      let conversation;
      try {
        conversation = await this.conversationsService.findOne(
          chatDto.conversation_id,
          userId
        );
        this.logger.log(
          `Using existing conversation: ${chatDto.conversation_id}`
        );
      } catch (error) {
        // Conversation doesn't exist, create it
        this.logger.log(
          `Conversation not found, creating new one with ID: ${chatDto.conversation_id}`
        );
        conversation = await this.prismaService.conversation.create({
          data: {
            id: chatDto.conversation_id,
            user_id: userId,
          },
        });
      }

      // Fetch full project details
      const projects = await this.fetchProjectDetails(
        chatDto.projects?.map((p) => p.project_id) || []
      );

      // Fetch full task details
      const tasks = await this.fetchTaskDetails(
        chatDto.tasks?.map((t) => t.task_id) || []
      );

      // Fetch full todo details
      const todos = await this.fetchTodoDetails(
        chatDto.todos?.map((t) => t.todo_id) || []
      );

      // Save the user's prompt message
      await this.prismaService.chatMessage.create({
        data: {
          conversation_id: chatDto.conversation_id,
          user_id: userId,
          type: MessageType.Prompt,
          prompt: chatDto.prompt,
          projects: projects as any,
          tasks: tasks as any,
          todos: todos as any,
        },
      });

      this.logger.log(
        `Prompt message saved for conversation: ${chatDto.conversation_id}`
      );

      // Prepare the request payload for AI server
      const aiServerPayload: AIServerChatRequest = {
        user_id: userId,
        conversation_id: chatDto.conversation_id,
        prompt: chatDto.prompt,
        projects,
        tasks,
        todos,
        stage: "thinking",
        metadata: {},
      };

      this.logger.log(
        `Sending chat request to AI server - User: ${userId}, Conversation: ${chatDto.conversation_id}, Projects: ${projects.length}, Tasks: ${tasks.length}, Todos: ${todos.length}`
      );

      // Log the payload for debugging - use console.log to ensure visibility
      console.log("=== AI Server Payload ===");
      console.log(JSON.stringify(aiServerPayload, null, 2));
      console.log("=========================");

      // Verify user_id is in the payload before sending
      if (!aiServerPayload.user_id) {
        throw new Error("user_id is missing from payload!");
      }

      // Make request to AI server /chat/chat endpoint
      const response = await this.apiService.post(
        "/chat/chat",
        aiServerPayload
      );

      this.logger.log(
        `Chat request successful for conversation: ${chatDto.conversation_id}`
      );

      const aiResponse = response.data;

      // Save the AI's response message
      await this.prismaService.chatMessage.create({
        data: {
          conversation_id: chatDto.conversation_id,
          user_id: userId,
          type: MessageType.Response,
          text: aiResponse.text || "",
          blocks: aiResponse.blocks || null,
          token_usage: aiResponse.token_usage || null,
        },
      });

      this.logger.log(
        `Response message saved for conversation: ${chatDto.conversation_id}`
      );

      // Return the exact response from AI server
      return aiResponse;
    } catch (error) {
      this.logger.error("Chat request failed:", error.message);
      throw error;
    }
  }

  /**
   * Fetch full project details from database
   */
  private async fetchProjectDetails(
    projectIds: string[]
  ): Promise<AIProject[]> {
    if (!projectIds || projectIds.length === 0) {
      return [];
    }

    const projects: AIProject[] = [];

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
          instructor: "", // Not available in schema
        });
      } catch (error) {
        this.logger.warn(`Error fetching project ${projectId}:`, error.message);
      }
    }

    return projects;
  }

  /**
   * Fetch full task details from database
   */
  private async fetchTaskDetails(taskIds: string[]): Promise<AITask[]> {
    if (!taskIds || taskIds.length === 0) {
      return [];
    }

    const tasks: AITask[] = [];

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
      } catch (error) {
        this.logger.warn(`Error fetching task ${taskId}:`, error.message);
      }
    }

    return tasks;
  }

  /**
   * Fetch full todo details from database
   */
  private async fetchTodoDetails(todoIds: string[]): Promise<AITodo[]> {
    if (!todoIds || todoIds.length === 0) {
      return [];
    }

    const todos: AITodo[] = [];

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
          estimated_duration: "", // Not available in schema
        });
      } catch (error) {
        this.logger.warn(`Error fetching todo ${todoId}:`, error.message);
      }
    }

    return todos;
  }

  /**
   * Create a new conversation for the user
   * Returns only the conversation ID
   */
  async createConversation(userId: string) {
    try {
      this.logger.log(`Creating new conversation for user: ${userId}`);

      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
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
    } catch (error) {
      this.logger.error("Failed to create conversation:", error.message);
      throw error;
    }
  }

  /**
   * Get conversation history including all messages
   */
  async getConversationHistory(userId: string, conversationId: string) {
    try {
      this.logger.log(
        `Fetching conversation history for conversation: ${conversationId}`
      );

      const conversation = await this.conversationsService.findOne(
        conversationId,
        userId
      );

      return conversation;
    } catch (error) {
      this.logger.error("Failed to fetch conversation history:", error.message);
      throw error;
    }
  }

  /**
   * Get all conversations for the user
   * Returns conversation IDs, titles, and message counts
   */
  async getAllConversations(userId: string) {
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

      // Format the response to match the expected structure
      const formattedConversations = conversations.map((conv) => ({
        id: conv.id,
        title: conv.title,
        created_at: conv.created_at,
        updated_at: conv.updated_at,
        message_count: conv._count.messages,
      }));

      this.logger.log(
        `Found ${formattedConversations.length} conversations for user: ${userId}`
      );

      return formattedConversations;
    } catch (error) {
      this.logger.error("Failed to fetch conversations:", error.message);
      throw error;
    }
  }

  /**
   * Rename a conversation
   * Updates the title of an existing conversation
   */
  async renameConversation(
    userId: string,
    conversationId: string,
    newTitle: string
  ) {
    try {
      this.logger.log(
        `Renaming conversation ${conversationId} for user: ${userId}`
      );

      // Verify the conversation exists and belongs to the user
      await this.conversationsService.findOne(conversationId, userId);

      // Update the conversation title
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

      this.logger.log(
        `Conversation ${conversationId} renamed successfully to: ${newTitle}`
      );

      return updatedConversation;
    } catch (error) {
      this.logger.error("Failed to rename conversation:", error.message);
      throw error;
    }
  }

  /**
   * Delete a conversation and all its messages
   * This is a cascading delete due to the Prisma schema configuration
   */
  async deleteConversation(userId: string, conversationId: string) {
    try {
      this.logger.log(
        `Deleting conversation ${conversationId} for user: ${userId}`
      );

      // Verify the conversation exists and belongs to the user
      await this.conversationsService.findOne(conversationId, userId);

      // Delete the conversation (messages will be deleted automatically due to onDelete: Cascade)
      await this.prismaService.conversation.delete({
        where: {
          id: conversationId,
        },
      });

      this.logger.log(
        `Conversation ${conversationId} and all messages deleted successfully`
      );

      return {
        message: "Conversation deleted successfully",
        conversation_id: conversationId,
      };
    } catch (error) {
      this.logger.error("Failed to delete conversation:", error.message);
      throw error;
    }
  }
}
