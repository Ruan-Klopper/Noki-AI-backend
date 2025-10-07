import { Injectable, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

export interface ChatInput {
  user_id: string;
  conversation_id: string;
  prompt: string;
  projects?: Array<{
    project_id: string;
    title: string;
    description?: string;
    instructor?: string;
  }>;
  tasks?: Array<{
    task_id: string;
    title: string;
    description?: string;
    due_datetime?: string;
    status?: string;
    project_id?: string;
  }>;
  stage?: string;
  metadata?: any;
}

export interface ContextInput {
  conversation_id: string;
  user_id: string;
  context_data: {
    assignments?: Array<{
      title: string;
      description?: string;
      due_date?: string;
      status?: string;
      project_id?: string;
      task_id?: string;
    }>;
    schedule?: {
      items?: any[];
      available_slots?: any[];
    };
  };
  stage?: string;
}

export interface AIResponse {
  stage: string;
  conversation_id: string;
  text?: string;
  blocks?: any[];
  intent?: {
    type: string;
    targets?: string[];
    filters?: any;
    payload?: any;
  };
  timestamp: string;
  token_usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    embedding_tokens: number;
    cost_estimate_usd: number;
  };
}

export interface EmbedResourceInput {
  user_id: string;
  conversation_id: string;
  resource_id: string;
  resource_type: string;
  title: string;
  content: string;
  metadata?: any;
}

export interface EmbedMessageInput {
  user_id: string;
  conversation_id: string;
  message_id: string;
  message_content: string;
  metadata?: any;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly aiServerUrl: string;
  private readonly aiServerToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.aiServerUrl =
      this.configService.get<string>("ai.server.url") ||
      "https://noki-ai-aiserver-production.up.railway.app";
    this.aiServerToken =
      this.configService.get<string>("ai.server.token") || "";

    if (!this.aiServerToken) {
      this.logger.warn(
        "AI_SERVER_TOKEN not configured. AI functionality will be limited."
      );
    }
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.aiServerToken}`,
    };
  }

  async sendChatMessage(input: ChatInput): Promise<AIResponse> {
    try {
      this.logger.log(
        `Sending chat message for conversation ${input.conversation_id}`
      );

      const response = await firstValueFrom(
        this.httpService.post(`${this.aiServerUrl}/chat/chat`, input, {
          headers: this.getHeaders(),
        })
      );

      return response.data as AIResponse;
    } catch (error) {
      this.logger.error(
        "Error sending chat message:",
        error.response?.data || error.message
      );
      throw new HttpException(
        "Failed to send chat message to AI server",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async continueWithContext(input: ContextInput): Promise<AIResponse> {
    try {
      this.logger.log(
        `Continuing conversation ${input.conversation_id} with context`
      );

      const response = await firstValueFrom(
        this.httpService.post(`${this.aiServerUrl}/chat/context`, input, {
          headers: this.getHeaders(),
        })
      );

      return response.data as AIResponse;
    } catch (error) {
      this.logger.error(
        "Error continuing with context:",
        error.response?.data || error.message
      );
      throw new HttpException(
        "Failed to continue conversation with context",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async embedResource(input: EmbedResourceInput): Promise<any> {
    try {
      this.logger.log(`Embedding resource ${input.resource_id}`);

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.aiServerUrl}/embed/embed_resource`,
          input,
          {
            headers: this.getHeaders(),
          }
        )
      );

      return response.data as AIResponse;
    } catch (error) {
      this.logger.error(
        "Error embedding resource:",
        error.response?.data || error.message
      );
      throw new HttpException(
        "Failed to embed resource",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async embedMessage(input: EmbedMessageInput): Promise<any> {
    try {
      this.logger.log(`Embedding message ${input.message_id}`);

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.aiServerUrl}/embed/embed_message`,
          input,
          {
            headers: this.getHeaders(),
          }
        )
      );

      return response.data as AIResponse;
    } catch (error) {
      this.logger.error(
        "Error embedding message:",
        error.response?.data || error.message
      );
      throw new HttpException(
        "Failed to embed message",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async getChatHistory(conversationId: string, userId: string): Promise<any> {
    try {
      this.logger.log(
        `Getting chat history for conversation ${conversationId}`
      );

      const response = await firstValueFrom(
        this.httpService.get(
          `${this.aiServerUrl}/chat/history/${conversationId}`,
          {
            headers: this.getHeaders(),
            params: { user_id: userId },
          }
        )
      );

      return response.data as AIResponse;
    } catch (error) {
      this.logger.error(
        "Error getting chat history:",
        error.response?.data || error.message
      );
      throw new HttpException(
        "Failed to get chat history",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async deleteResourceEmbeddings(
    resourceId: string,
    userId: string
  ): Promise<any> {
    try {
      this.logger.log(`Deleting embeddings for resource ${resourceId}`);

      const response = await firstValueFrom(
        this.httpService.delete(
          `${this.aiServerUrl}/embed/embed_resource/${resourceId}`,
          {
            headers: this.getHeaders(),
            params: { user_id: userId },
          }
        )
      );

      return response.data as AIResponse;
    } catch (error) {
      this.logger.error(
        "Error deleting resource embeddings:",
        error.response?.data || error.message
      );
      throw new HttpException(
        "Failed to delete resource embeddings",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async deleteUserEmbeddings(userId: string): Promise<any> {
    try {
      this.logger.log(`Deleting all embeddings for user ${userId}`);

      const response = await firstValueFrom(
        this.httpService.delete(
          `${this.aiServerUrl}/embed/embed_user/${userId}`,
          {
            headers: this.getHeaders(),
          }
        )
      );

      return response.data as AIResponse;
    } catch (error) {
      this.logger.error(
        "Error deleting user embeddings:",
        error.response?.data || error.message
      );
      throw new HttpException(
        "Failed to delete user embeddings",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async getEmbeddingStats(userId: string): Promise<any> {
    try {
      this.logger.log(`Getting embedding stats for user ${userId}`);

      const response = await firstValueFrom(
        this.httpService.get(
          `${this.aiServerUrl}/embed/embed_stats/${userId}`,
          {
            headers: this.getHeaders(),
          }
        )
      );

      return response.data as AIResponse;
    } catch (error) {
      this.logger.error(
        "Error getting embedding stats:",
        error.response?.data || error.message
      );
      throw new HttpException(
        "Failed to get embedding stats",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async healthCheck(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.aiServerUrl}/health/health`)
      );

      return response.data as AIResponse;
    } catch (error) {
      this.logger.error(
        "AI server health check failed:",
        error.response?.data || error.message
      );
      throw new HttpException(
        "AI server is not available",
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}
