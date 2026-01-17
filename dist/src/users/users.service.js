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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const prisma_enums_1 = require("../common/enums/prisma-enums");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const { password, ...userData } = createUserDto;
        const password_hash = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                ...userData,
                password_hash,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                profile_image: true,
                google_id: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                profile_image: true,
                google_id: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
    async findOne(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                profile_image: true,
                google_id: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async update(id, updateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                profile_image: true,
                google_id: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async validatePassword(user, password) {
        return bcrypt.compare(password, user.password_hash);
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!user.password_hash) {
            throw new common_1.BadRequestException('Password cannot be changed for Google-authenticated accounts');
        }
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isCurrentPasswordValid) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                password_hash: newPasswordHash,
            },
        });
        return {
            message: 'Password changed successfully',
        };
    }
    async getAIUsage(userId) {
        const messages = await this.prisma.chatMessage.findMany({
            where: {
                user_id: userId,
                type: prisma_enums_1.MessageType.Response,
                token_usage: {
                    not: undefined,
                },
            },
            select: {
                token_usage: true,
                created_at: true,
            },
        });
        let totalPromptTokens = 0;
        let totalCompletionTokens = 0;
        let totalTokens = 0;
        let totalEmbeddingTokens = 0;
        let totalCost = 0;
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        let monthlyPromptTokens = 0;
        let monthlyCompletionTokens = 0;
        let monthlyTokens = 0;
        let monthlyEmbeddingTokens = 0;
        let monthlyCost = 0;
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        let lastMonthTokens = 0;
        let lastMonthCost = 0;
        messages.forEach((message) => {
            if (message.token_usage && typeof message.token_usage === 'object') {
                const usage = message.token_usage;
                const promptTokens = usage.prompt_tokens || 0;
                const completionTokens = usage.completion_tokens || 0;
                const tokens = usage.total_tokens || 0;
                const embeddingTokens = usage.embedding_tokens || 0;
                const cost = usage.cost_estimate_usd || 0;
                totalPromptTokens += promptTokens;
                totalCompletionTokens += completionTokens;
                totalTokens += tokens;
                totalEmbeddingTokens += embeddingTokens;
                totalCost += cost;
                if (message.created_at >= startOfMonth) {
                    monthlyPromptTokens += promptTokens;
                    monthlyCompletionTokens += completionTokens;
                    monthlyTokens += tokens;
                    monthlyEmbeddingTokens += embeddingTokens;
                    monthlyCost += cost;
                }
                if (message.created_at >= startOfLastMonth &&
                    message.created_at <= endOfLastMonth) {
                    lastMonthTokens += tokens;
                    lastMonthCost += cost;
                }
            }
        });
        const monthlyChange = lastMonthTokens > 0
            ? ((monthlyTokens - lastMonthTokens) / lastMonthTokens) * 100
            : monthlyTokens > 0
                ? 100
                : 0;
        const TOKEN_LIMIT_FREE = 5000;
        const tokensRemaining = Math.max(0, TOKEN_LIMIT_FREE - monthlyTokens);
        const tokensUsed = monthlyTokens;
        const usagePercentage = (tokensUsed / TOKEN_LIMIT_FREE) * 100;
        return {
            totals: {
                prompt_tokens: totalPromptTokens,
                completion_tokens: totalCompletionTokens,
                total_tokens: totalTokens,
                embedding_tokens: totalEmbeddingTokens,
                total_cost_usd: parseFloat(totalCost.toFixed(6)),
            },
            monthly: {
                prompt_tokens: monthlyPromptTokens,
                completion_tokens: monthlyCompletionTokens,
                total_tokens: monthlyTokens,
                embedding_tokens: monthlyEmbeddingTokens,
                cost_usd: parseFloat(monthlyCost.toFixed(6)),
                change_percentage: parseFloat(monthlyChange.toFixed(2)),
            },
            limits: {
                token_limit: TOKEN_LIMIT_FREE,
                tokens_remaining: tokensRemaining,
                tokens_used: tokensUsed,
                usage_percentage: parseFloat(usagePercentage.toFixed(2)),
                is_premium: false,
            },
            message_count: messages.length,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map