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
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ConversationsService = class ConversationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createConversationDto) {
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
                    take: 10,
                },
            },
        });
    }
    async findAll(userId) {
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
                    take: 1,
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
    async findOne(id, userId) {
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
            throw new common_1.NotFoundException("Conversation not found");
        }
        if (conversation.user_id !== userId) {
            throw new common_1.ForbiddenException("Access denied");
        }
        return conversation;
    }
    async update(id, userId, updateConversationDto) {
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
    async remove(id, userId) {
        const conversation = await this.findOne(id, userId);
        return this.prisma.conversation.delete({
            where: { id },
        });
    }
    async findByAiEngineId(aiEngineId, userId) {
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
            throw new common_1.NotFoundException("Conversation not found");
        }
        return conversation;
    }
    async updateAiEngineId(id, userId, aiEngineId) {
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
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map