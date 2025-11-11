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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ChatMessagesService = class ChatMessagesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createChatMessageDto) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id: createChatMessageDto.conversation_id },
        });
        if (!conversation) {
            throw new common_1.NotFoundException("Conversation not found");
        }
        if (conversation.user_id !== userId) {
            throw new common_1.ForbiddenException("Access denied");
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
            },
        });
    }
    async findAll(userId, conversationId) {
        const where = {
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
            },
            orderBy: {
                created_at: "asc",
            },
        });
    }
    async findOne(id, userId) {
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
            },
        });
        if (!message) {
            throw new common_1.NotFoundException("Chat message not found");
        }
        if (message.conversation.user_id !== userId) {
            throw new common_1.ForbiddenException("Access denied");
        }
        return message;
    }
    async update(id, userId, updateChatMessageDto) {
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
            },
        });
    }
    async remove(id, userId) {
        const message = await this.findOne(id, userId);
        return this.prisma.chatMessage.delete({
            where: { id },
        });
    }
    async findByConversation(conversationId, userId) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id: conversationId },
        });
        if (!conversation) {
            throw new common_1.NotFoundException("Conversation not found");
        }
        if (conversation.user_id !== userId) {
            throw new common_1.ForbiddenException("Access denied");
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
            },
            orderBy: {
                created_at: "asc",
            },
        });
    }
    async findByType(conversationId, userId, type) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id: conversationId },
        });
        if (!conversation) {
            throw new common_1.NotFoundException("Conversation not found");
        }
        if (conversation.user_id !== userId) {
            throw new common_1.ForbiddenException("Access denied");
        }
        return this.prisma.chatMessage.findMany({
            where: {
                conversation_id: conversationId,
                type,
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
            },
            orderBy: {
                created_at: "asc",
            },
        });
    }
};
exports.ChatMessagesService = ChatMessagesService;
exports.ChatMessagesService = ChatMessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatMessagesService);
//# sourceMappingURL=chat-messages.service.js.map