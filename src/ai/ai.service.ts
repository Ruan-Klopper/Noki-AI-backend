import { Injectable, Logger } from "@nestjs/common";
import { ApiService } from "./api.service";
import { AI_GLOBALS } from "./globals";
import { TasksService } from "../tasks/tasks.service";
import { TodosService } from "../todos/todos.service";
import { PrismaService } from "../database/prisma.service";

export interface HealthResponse {
  status: string;
  timestamp: string;
  environment: string;
  ai_server_url: string;
  ai_server_response?: any;
  error?: string;
}

export interface Project {
  project_id: string;
  title: string;
  description: string;
  instructor: string;
}

export interface Task {
  task_id: string;
  title: string;
  description: string;
  due_datetime: string;
  status: string;
  project_id: string;
}

export interface Intent {
  type: string;
  targets?: string[] | null;
  filters?: Record<string, any> | null;
  payload?: Record<string, any> | null;
  intent_sub?: string;
  requested_for?: string[];
  todo_duration?: string;
}

export interface ChatRequest {
  user_id: string;
  conversation_id: string;
  prompt: string;
  projects: Project[];
  tasks: Task[];
  stage: string;
  metadata?: Record<string, any>;
}

export interface ChatResponse {
  stage: string;
  conversation_id: string;
  text: string;
  blocks?: any[] | null;
  intent?: Intent | null;
  timestamp: string;
  token_usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    embedding_tokens: number;
    cost_estimate_usd: number;
  } | null;
}

export interface ContextRequest {
  conversation_id: string;
  assignments?: any[];
  schedule?: any[];
  existing_todos?: any[];
  tasks?: any[];
  schedule_accepted?: boolean;
  updated_schedule?: any[];
  tasks_accepted?: boolean;
  saved_tasks?: any[];
  todos_accepted?: boolean;
  saved_todos?: any[];
  error?: string;
}

export interface ContextResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly apiService: ApiService,
    private readonly tasksService: TasksService,
    private readonly todosService: TodosService,
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
   * Handles new structure with projects, tasks, and intents
   */
  async sendChatMessage(chatRequest: ChatRequest): Promise<ChatResponse> {
    try {
      this.logger.log(`Sending chat message for user: ${chatRequest.user_id}`);

      // Prepare the request payload for AI server
      const aiServerPayload = {
        user_id: chatRequest.user_id,
        conversation_id: chatRequest.conversation_id,
        prompt: chatRequest.prompt,
        projects: chatRequest.projects,
        tasks: chatRequest.tasks,
        stage: chatRequest.stage,
        metadata: chatRequest.metadata || {},
      };

      this.logger.log(
        `Making chat request to AI server with conversation: ${chatRequest.conversation_id}`
      );

      // Make request to AI server /chat/chat endpoint
      const response = await this.apiService.post(
        "/chat/chat",
        aiServerPayload
      );

      this.logger.log(
        `Chat request successful for conversation: ${chatRequest.conversation_id}`
      );

      return response.data;
    } catch (error) {
      this.logger.error("Chat request failed:", error.message);
      throw error;
    }
  }

  /**
   * Send context data to AI server when intent is present
   * Handles different intent types and their required context data
   */
  async sendContextData(
    contextRequest: ContextRequest
  ): Promise<ContextResponse> {
    try {
      console.log(`🚀 Sending context data to AI server:`, {
        conversation_id: contextRequest.conversation_id,
        endpoint: "/chat/chat/context",
        payload_keys: Object.keys(contextRequest),
      });

      this.logger.log(
        `Sending context data for conversation: ${contextRequest.conversation_id}`
      );

      // Make request to AI server /chat/chat/context endpoint
      const response = await this.apiService.post(
        "/chat/chat/context",
        contextRequest
      );

      console.log(`✅ Context data sent successfully to AI server:`, {
        conversation_id: contextRequest.conversation_id,
        response_status: response.status,
        response_data: response.data,
      });

      this.logger.log(
        `Context data sent successfully for conversation: ${contextRequest.conversation_id}`
      );

      return response.data;
    } catch (error) {
      this.logger.error("Context request failed:", error.message);
      throw error;
    }
  }

  /**
   * Validate if project IDs exist in the database
   */
  private async validateProjectIds(
    projectIds: string[]
  ): Promise<{ valid: string[]; invalid: string[] }> {
    const validIds: string[] = [];
    const invalidIds: string[] = [];

    for (const projectId of projectIds) {
      try {
        const project = await this.prismaService.project.findUnique({
          where: { id: projectId },
          select: { id: true },
        });

        if (project) {
          validIds.push(projectId);
        } else {
          invalidIds.push(projectId);
        }
      } catch (error) {
        this.logger.warn(
          `Error validating project ID ${projectId}:`,
          error.message
        );
        invalidIds.push(projectId);
      }
    }

    return { valid: validIds, invalid: invalidIds };
  }

  /**
   * Handle intent-based responses by gathering required context data
   * If data cannot be found, informs the AI about the absence of data
   */
  async handleIntentResponse(
    chatResponse: ChatResponse,
    userId: string
  ): Promise<ContextResponse> {
    // 0. Raw AI Response Log
    console.log(`📥 Raw AI server response received:`, {
      stage: chatResponse.stage,
      conversation_id: chatResponse.conversation_id,
      has_intent: !!chatResponse.intent,
      intent_type: chatResponse.intent?.type,
      text: chatResponse.text,
    });

    // 1. Intent Detection Log
    if (!chatResponse.intent) {
      console.log(
        `❌ No intent detected in chat response for conversation: ${chatResponse.conversation_id}`
      );
      throw new Error("No intent found in chat response");
    }

    console.log(`🎯 Intent detected in chat response:`, {
      conversation_id: chatResponse.conversation_id,
      stage: chatResponse.stage,
      intent_type: chatResponse.intent.type,
      intent_sub: chatResponse.intent.intent_sub,
      has_intent: !!chatResponse.intent,
    });

    const intent = chatResponse.intent;

    // 2. Intent Processing Start Log
    console.log(`🔄 Starting intent processing:`, {
      type: intent.type,
      conversation_id: chatResponse.conversation_id,
      user_id: userId,
      intent_sub: intent.intent_sub,
      requested_for: intent.requested_for,
      todo_duration: intent.todo_duration,
      targets: intent.targets,
      filters: intent.filters,
    });

    const contextRequest: ContextRequest = {
      conversation_id: chatResponse.conversation_id,
    };

    try {
      switch (intent.type) {
        case "backend_query":
          // Gather general data based on filters
          if (
            intent.targets?.includes("tasks") &&
            intent.filters?.project_ids
          ) {
            const tasks = await this.tasksService.getAllTasksForProject(
              intent.filters.project_ids
            );
            if (tasks.length === 0) {
              this.logger.warn(
                `No tasks found for project IDs: ${intent.filters.project_ids.join(", ")}`
              );
              contextRequest.assignments = [];
            } else {
              contextRequest.assignments = tasks;
            }
          }
          if (
            intent.targets?.includes("todos") &&
            intent.filters?.project_ids
          ) {
            const todos = await this.todosService.getTodoListForPeriod(
              "all",
              intent.filters.project_ids
            );
            if (todos.length === 0) {
              this.logger.warn(
                `No todos found for project IDs: ${intent.filters.project_ids.join(", ")}`
              );
              contextRequest.existing_todos = [];
            } else {
              contextRequest.existing_todos = todos;
            }
          }
          break;

        case "fetch_all_tasks_for_project":
          if (intent.requested_for) {
            const tasks = await this.tasksService.getAllTasksForProject(
              intent.requested_for
            );
            if (tasks.length === 0) {
              this.logger.warn(
                `No tasks found for requested projects: ${intent.requested_for.join(", ")}`
              );
              contextRequest.tasks = [];
            } else {
              contextRequest.tasks = tasks;
            }
          }
          break;

        case "fetch_all_todos":
          if (intent.requested_for && intent.todo_duration) {
            const todos = await this.todosService.getTodoListForPeriod(
              intent.todo_duration as any,
              intent.requested_for
            );
            if (todos.length === 0) {
              this.logger.warn(
                `No todos found for duration '${intent.todo_duration}' and projects: ${intent.requested_for.join(", ")}`
              );
              contextRequest.existing_todos = [];
            } else {
              contextRequest.existing_todos = todos;
            }
          }
          if (intent.requested_for) {
            const tasks = await this.tasksService.getAllTasksForProject(
              intent.requested_for
            );
            if (tasks.length === 0) {
              this.logger.warn(
                `No tasks found for requested projects: ${intent.requested_for.join(", ")}`
              );
              contextRequest.assignments = [];
            } else {
              contextRequest.assignments = tasks;
            }
          }
          break;

        case "proposed_schedule":
          // Handle schedule acceptance (this would typically come from user input)
          contextRequest.schedule_accepted = false; // Default to false, should be set by caller
          if (intent.payload?.sessions) {
            contextRequest.updated_schedule = intent.payload.sessions;
          }
          break;

        case "proposed_tasks":
          // Handle task acceptance (this would typically come from user input)
          contextRequest.tasks_accepted = false; // Default to false, should be set by caller
          if (intent.payload?.tasks) {
            contextRequest.saved_tasks = intent.payload.tasks;
          }
          break;

        case "proposed_todos_for_task":
          // Handle todo acceptance (this would typically come from user input)
          contextRequest.todos_accepted = false; // Default to false, should be set by caller
          if (intent.payload?.todos && intent.payload?.task_id) {
            // Convert AI proposed todos to our format and save them
            const todosToSave = intent.payload.todos.map((todo: any) => ({
              title: todo.title,
              description: todo.description,
              task_id: intent.payload!.task_id,
              user_id: userId,
              priority: todo.priority,
              due_date: todo.due_date,
            }));
            const savedTodos =
              await this.todosService.saveTodoList(todosToSave);
            contextRequest.saved_todos = savedTodos;
          }
          break;

        default:
          this.logger.warn(`Unknown intent type: ${intent.type}`);
      }

      console.log(`📤 Submitting context data to AI server:`, {
        conversation_id: contextRequest.conversation_id,
        has_assignments: !!contextRequest.assignments?.length,
        has_tasks: !!contextRequest.tasks?.length,
        has_existing_todos: !!contextRequest.existing_todos?.length,
        has_schedule: !!contextRequest.schedule?.length,
        has_error: !!contextRequest.error,
        assignments_count: contextRequest.assignments?.length || 0,
        tasks_count: contextRequest.tasks?.length || 0,
        todos_count: contextRequest.existing_todos?.length || 0,
      });

      // 3. Context Call Log
      console.log(
        `📞 Calling sendContextData for conversation: ${contextRequest.conversation_id}`
      );

      // Send context data to AI server
      return await this.sendContextData(contextRequest);
    } catch (error) {
      this.logger.error(`Error handling intent ${intent.type}:`, error.message);

      // If there's an error, send error context to AI server
      const errorContextRequest: ContextRequest = {
        conversation_id: chatResponse.conversation_id,
        error: `Failed to gather data for intent '${intent.type}': ${error.message}`,
      };

      console.log(`❌ Error processing intent, submitting error context:`, {
        conversation_id: errorContextRequest.conversation_id,
        error: errorContextRequest.error,
        intent_type: intent.type,
      });

      return await this.sendContextData(errorContextRequest);
    }
  }
}
