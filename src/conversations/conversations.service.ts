import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateConversationDto } from "./dtos/create-conversation.dto";
import { UpdateConversationDto } from "./dtos/update-conversation.dto";

@Injectable()
export class ConversationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createConversationDto: CreateConversationDto) {
    return this.prisma.conversation.create({
      data: {
        ...createConversationDto,
        user_id: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        messages: {
          orderBy: {
            created_at: "asc",
          },
          take: 10, // Limit to recent messages for performance
        },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        messages: {
          orderBy: {
            created_at: "desc",
          },
          take: 1, // Only get the latest message for list view
        },
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
  }

  async findOne(id: string, userId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        messages: {
          orderBy: {
            created_at: "asc",
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    if (conversation.user_id !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return conversation;
  }

  async update(
    id: string,
    userId: string,
    updateConversationDto: UpdateConversationDto
  ) {
    const conversation = await this.findOne(id, userId);

    return this.prisma.conversation.update({
      where: { id },
      data: updateConversationDto,
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        messages: {
          orderBy: {
            created_at: "asc",
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const conversation = await this.findOne(id, userId);

    return this.prisma.conversation.delete({
      where: { id },
    });
  }

  async findByAiEngineId(aiEngineId: string, userId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        ai_engine_id: aiEngineId,
        user_id: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        messages: {
          orderBy: {
            created_at: "asc",
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    return conversation;
  }

  async updateAiEngineId(id: string, userId: string, aiEngineId: string) {
    const conversation = await this.findOne(id, userId);

    return this.prisma.conversation.update({
      where: { id },
      data: { ai_engine_id: aiEngineId },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        messages: {
          orderBy: {
            created_at: "asc",
          },
        },
      },
    });
  }
}
