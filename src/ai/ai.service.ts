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
  conversation_history?: Array<{
    type: string;
    prompt?: string;
    text?: string;
    created_at: string;
  }>;
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
   * Automatically enriches context based on query intent (e.g., "this week", "overdue", "all projects")
   */
  async chat(
    userId: string,
    chatDto: ChatAiDto,
    authToken?: string
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

      // Get conversation history for context
      const conversationHistory = await this.getConversationHistoryForContext(
        chatDto.conversation_id,
        userId
      );

      // Analyze prompt to determine if we need to auto-fetch data
      const autoFetchedData = await this.analyzeAndFetchContext(
        userId,
        chatDto.prompt,
        conversationHistory,
        chatDto.projects?.map((p) => p.project_id) || [],
        chatDto.tasks?.map((t) => t.task_id) || [],
        chatDto.todos?.map((t) => t.todo_id) || []
      );

      // Use auto-fetched data if available, otherwise use provided IDs
      const projectIds =
        autoFetchedData.projects.length > 0
          ? autoFetchedData.projects.map((p) => p.project_id)
          : chatDto.projects?.map((p) => p.project_id) || [];

      const taskIds =
        autoFetchedData.tasks.length > 0
          ? autoFetchedData.tasks.map((t) => t.task_id)
          : chatDto.tasks?.map((t) => t.task_id) || [];

      const todoIds =
        autoFetchedData.todos.length > 0
          ? autoFetchedData.todos.map((t) => t.todo_id)
          : chatDto.todos?.map((t) => t.todo_id) || [];

      // Fetch full project details
      const projects =
        autoFetchedData.projects.length > 0
          ? autoFetchedData.projects
          : await this.fetchProjectDetails(projectIds);

      // Fetch full task details
      const tasks =
        autoFetchedData.tasks.length > 0
          ? autoFetchedData.tasks
          : await this.fetchTaskDetails(taskIds);

      // Fetch full todo details
      const todos =
        autoFetchedData.todos.length > 0
          ? autoFetchedData.todos
          : await this.fetchTodoDetails(todoIds);

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
        metadata: {
          auth_token: authToken, // Pass auth token so AI can call back to backend
        },
        conversation_history: conversationHistory,
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
   * Analyze prompt and automatically fetch relevant context data
   * Detects queries like "this week", "overdue", "all projects", etc.
   */
  private async analyzeAndFetchContext(
    userId: string,
    prompt: string,
    conversationHistory: any[],
    providedProjectIds: string[],
    providedTaskIds: string[],
    providedTodoIds: string[]
  ): Promise<{
    projects: AIProject[];
    tasks: AITask[];
    todos: AITodo[];
  }> {
    const promptLower = prompt.toLowerCase();

    // If user provided specific IDs, don't auto-fetch
    if (
      providedProjectIds.length > 0 ||
      providedTaskIds.length > 0 ||
      providedTodoIds.length > 0
    ) {
      this.logger.log("User provided specific IDs, skipping auto-fetch");
      return { projects: [], tasks: [], todos: [] };
    }

    // Keywords that indicate user wants comprehensive data
    const comprehensiveKeywords = [
      "all my",
      "show me all",
      "list all",
      "give me all",
      "what are all",
      "what are my",
      "complete list",
      "full list",
      "everything",
      "entire",
      "comprehensive",
    ];

    // Time-based keywords
    const timeKeywords = {
      today: ["today", "this day"],
      this_week: [
        "this week",
        "this week's",
        "week",
        "weekly",
        "upcoming week",
      ],
      this_month: ["this month", "monthly", "this month's"],
      next_two_months: ["next month", "next two months", "upcoming months"],
      overdue: ["overdue", "past due", "late", "missed", "expired"],
    };

    // Entity keywords
    const projectKeywords = [
      "project",
      "projects",
      "course",
      "courses",
      "class",
      "classes",
    ];
    const taskKeywords = [
      "task",
      "tasks",
      "assignment",
      "assignments",
      "homework",
      "deadline",
      "deadlines",
      "due date",
      "due dates",
    ];
    const todoKeywords = [
      "todo",
      "todos",
      "to-do",
      "to-dos",
      "item",
      "items",
      "checklist",
    ];

    // Check if user wants comprehensive data
    const wantsComprehensive = comprehensiveKeywords.some((keyword) =>
      promptLower.includes(keyword)
    );

    // Determine time period
    let timePeriod:
      | "today"
      | "this_week"
      | "this_month"
      | "next_two_months"
      | "all"
      | "overdue"
      | null = null;
    for (const [period, keywords] of Object.entries(timeKeywords)) {
      if (keywords.some((keyword) => promptLower.includes(keyword))) {
        timePeriod = period as any;
        break;
      }
    }

    // Determine what entities user is asking about
    const wantsProjects = projectKeywords.some((keyword) =>
      promptLower.includes(keyword)
    );
    const wantsTasks = taskKeywords.some((keyword) =>
      promptLower.includes(keyword)
    );
    const wantsTodos = todoKeywords.some((keyword) =>
      promptLower.includes(keyword)
    );

    // If no specific entity mentioned, assume they want tasks/todos (most common)
    const shouldFetchTasks = wantsTasks || (!wantsProjects && !wantsTodos);
    const shouldFetchTodos = wantsTodos || (!wantsProjects && !wantsTasks);
    const shouldFetchProjects = wantsProjects || wantsComprehensive;

    this.logger.log(
      `Auto-fetch analysis: projects=${shouldFetchProjects}, tasks=${shouldFetchTasks}, todos=${shouldFetchTodos}, period=${timePeriod}`
    );

    const result: {
      projects: AIProject[];
      tasks: AITask[];
      todos: AITodo[];
    } = {
      projects: [],
      tasks: [],
      todos: [],
    };

    try {
      // Fetch projects if needed
      if (shouldFetchProjects) {
        const allProjects = await this.projectsService.findByUser(userId);
        result.projects = allProjects.map((p) => ({
          project_id: p.id,
          title: p.title || "",
          description: p.description || "",
          instructor: "", // Not available in schema
        }));
      }

      // Fetch tasks if needed
      if (shouldFetchTasks) {
        const period = timePeriod || "all";
        const fetchedTasks = await this.tasksService.getTaskListForPeriod(
          userId,
          period
        );
        result.tasks = fetchedTasks.map((t) => ({
          task_id: t.id,
          title: t.title || "",
          description: t.description || "",
          due_datetime: t.due_date?.toISOString() || "",
          status: t.is_submitted ? "done" : "not_started",
          project_id: t.project_id || "",
        }));
      }

      // Fetch todos if needed
      if (shouldFetchTodos) {
        const period = timePeriod || "all";
        const fetchedTodos = await this.todosService.getTodoListForPeriod(
          userId,
          period
        );
        result.todos = fetchedTodos.map((t) => ({
          todo_id: t.id,
          title: t.title || "",
          description: t.description || "",
          due_date: t.due_date?.toISOString() || "",
          status: t.is_submitted ? "done" : "not_started",
          project_id: t.task?.project_id || "",
          task_id: t.task_id || "",
          priority: t.priority || "",
          estimated_duration: "", // Not available in schema
        }));
      }

      this.logger.log(
        `Auto-fetched: ${result.projects.length} projects, ${result.tasks.length} tasks, ${result.todos.length} todos`
      );
    } catch (error) {
      this.logger.error("Error in auto-fetch context:", error.message);
      // Return empty arrays on error - will fall back to provided IDs
    }

    return result;
  }

  /**
   * Get conversation history for context (recent messages)
   */
  private async getConversationHistoryForContext(
    conversationId: string,
    userId: string
  ): Promise<any[]> {
    try {
      const conversation = await this.conversationsService.findOne(
        conversationId,
        userId
      );

      // Return last 10 messages for context
      const messages = conversation.messages || [];
      return messages.slice(-10).map((msg: any) => ({
        type: msg.type,
        prompt: msg.prompt,
        text: msg.text,
        created_at: msg.created_at,
      }));
    } catch (error) {
      this.logger.warn(
        `Could not fetch conversation history: ${error.message}`
      );
      return [];
    }
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

  /**
   * Fetch data for AI processing based on specific request
   * Called by AI service when it needs specific data
   */
  async fetchDataForAI(
    userId: string,
    dataRequest: {
      data_types: string[];
      time_period?: string;
      project_ids?: string[];
      include_completed?: boolean;
    }
  ) {
    try {
      this.logger.log(
        `Fetching AI data for user: ${userId}, types: ${dataRequest.data_types.join(", ")}, period: ${dataRequest.time_period || "all"}`
      );

      const result: {
        projects: AIProject[];
        tasks: AITask[];
        todos: AITodo[];
      } = {
        projects: [],
        tasks: [],
        todos: [],
      };

      // Fetch projects if requested
      if (dataRequest.data_types.includes("projects")) {
        const allProjects = await this.projectsService.findByUser(userId);
        result.projects = allProjects.map((p) => ({
          project_id: p.id,
          title: p.title || "",
          description: p.description || "",
          instructor: "", // Not available in schema
        }));

        // Filter by project_ids if provided
        if (dataRequest.project_ids && dataRequest.project_ids.length > 0) {
          result.projects = result.projects.filter((p) =>
            dataRequest.project_ids!.includes(p.project_id)
          );
        }
      }

      // Fetch tasks if requested
      if (dataRequest.data_types.includes("tasks")) {
        const period =
          (dataRequest.time_period as any) ||
          ("all" as
            | "today"
            | "this_week"
            | "this_month"
            | "next_two_months"
            | "all"
            | "overdue");
        const fetchedTasks = await this.tasksService.getTaskListForPeriod(
          userId,
          period,
          dataRequest.project_ids
        );

        result.tasks = fetchedTasks.map((t) => ({
          task_id: t.id,
          title: t.title || "",
          description: t.description || "",
          due_datetime: t.due_date?.toISOString() || "",
          status: t.is_submitted ? "done" : "not_started",
          project_id: t.project_id || "",
        }));

        // Filter completed if needed
        if (!dataRequest.include_completed) {
          result.tasks = result.tasks.filter((t) => t.status !== "done");
        }
      }

      // Fetch todos if requested
      if (dataRequest.data_types.includes("todos")) {
        const period =
          (dataRequest.time_period as any) ||
          ("all" as
            | "today"
            | "this_week"
            | "this_month"
            | "next_two_months"
            | "all"
            | "overdue");
        const fetchedTodos = await this.todosService.getTodoListForPeriod(
          userId,
          period,
          dataRequest.project_ids
        );

        result.todos = fetchedTodos.map((t) => ({
          todo_id: t.id,
          title: t.title || "",
          description: t.description || "",
          due_date: t.due_date?.toISOString() || "",
          status: t.is_submitted ? "done" : "not_started",
          project_id: t.task?.project_id || "",
          task_id: t.task_id || "",
          priority: t.priority || "",
          estimated_duration: "", // Not available in schema
        }));

        // Filter completed if needed
        if (!dataRequest.include_completed) {
          result.todos = result.todos.filter((t) => t.status !== "done");
        }
      }

      this.logger.log(
        `AI data fetched: ${result.projects.length} projects, ${result.tasks.length} tasks, ${result.todos.length} todos`
      );

      return result;
    } catch (error) {
      this.logger.error("Failed to fetch data for AI:", error.message);
      throw error;
    }
  }
}
