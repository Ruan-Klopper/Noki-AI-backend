import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateChatMessageDto } from "./dtos/create-chat-message.dto";
import { UpdateChatMessageDto } from "./dtos/update-chat-message.dto";
import { MessageRole, ChatStage } from "../common/enums/prisma-enums";

@Injectable()
export class ChatMessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createChatMessageDto: CreateChatMessageDto) {
    // Verify conversation belongs to user
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: createChatMessageDto.conversation_id },
    });

    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    if (conversation.user_id !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return this.prisma.chatMessage.create({
      data: {
        ...createChatMessageDto,
        user_id: userId,
      },
      include: {
        conversation: true,
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async findAll(userId: string, conversationId?: string) {
    const where: any = {
      user_id: userId,
    };

    if (conversationId) {
      where.conversation_id = conversationId;
    }

    return this.prisma.chatMessage.findMany({
      where,
      include: {
        conversation: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
  }

  async findOne(id: string, userId: string) {
    const message = await this.prisma.chatMessage.findUnique({
      where: { id },
      include: {
        conversation: {
          select: {
            id: true,
            title: true,
            description: true,
            user_id: true,
          },
        },
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });

    if (!message) {
      throw new NotFoundException("Chat message not found");
    }

    if (message.conversation.user_id !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return message;
  }

  async update(
    id: string,
    userId: string,
    updateChatMessageDto: UpdateChatMessageDto
  ) {
    const message = await this.findOne(id, userId);

    return this.prisma.chatMessage.update({
      where: { id },
      data: updateChatMessageDto,
      include: {
        conversation: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const message = await this.findOne(id, userId);

    return this.prisma.chatMessage.delete({
      where: { id },
    });
  }

  async findByConversation(conversationId: string, userId: string) {
    // Verify conversation belongs to user
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    if (conversation.user_id !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return this.prisma.chatMessage.findMany({
      where: {
        conversation_id: conversationId,
      },
      include: {
        conversation: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
  }

  async updateStage(id: string, userId: string, stage: ChatStage) {
    const message = await this.findOne(id, userId);

    return this.prisma.chatMessage.update({
      where: { id },
      data: { stage },
      include: {
        conversation: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async findByRole(conversationId: string, userId: string, role: MessageRole) {
    // Verify conversation belongs to user
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    if (conversation.user_id !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return this.prisma.chatMessage.findMany({
      where: {
        conversation_id: conversationId,
        role,
      },
      include: {
        conversation: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
  }
}
