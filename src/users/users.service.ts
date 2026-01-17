import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { MessageType } from '../common/enums/prisma-enums';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
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

  async findOne(id: string) {
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

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
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

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async validatePassword(user: any, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password_hash);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user has a password (Google users might not have one)
    if (!user.password_hash) {
      throw new BadRequestException('Password cannot be changed for Google-authenticated accounts');
    }

    // Validate current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password
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

  async getAIUsage(userId: string) {
    // Get all response messages with token usage for this user
    const messages = await this.prisma.chatMessage.findMany({
      where: {
        user_id: userId,
        type: MessageType.Response,
        token_usage: {
          not: null,
        },
      },
      select: {
        token_usage: true,
        created_at: true,
      },
    });

    // Calculate totals
    let totalPromptTokens = 0;
    let totalCompletionTokens = 0;
    let totalTokens = 0;
    let totalEmbeddingTokens = 0;
    let totalCost = 0;

    // Current month totals
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    let monthlyPromptTokens = 0;
    let monthlyCompletionTokens = 0;
    let monthlyTokens = 0;
    let monthlyEmbeddingTokens = 0;
    let monthlyCost = 0;

    // Last month totals (for comparison)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    let lastMonthTokens = 0;
    let lastMonthCost = 0;

    messages.forEach((message) => {
      if (message.token_usage && typeof message.token_usage === 'object') {
        const usage = message.token_usage as any;
        const promptTokens = usage.prompt_tokens || 0;
        const completionTokens = usage.completion_tokens || 0;
        const tokens = usage.total_tokens || 0;
        const embeddingTokens = usage.embedding_tokens || 0;
        const cost = usage.cost_estimate_usd || 0;

        // Add to totals
        totalPromptTokens += promptTokens;
        totalCompletionTokens += completionTokens;
        totalTokens += tokens;
        totalEmbeddingTokens += embeddingTokens;
        totalCost += cost;

        // Check if message is from current month
        if (message.created_at >= startOfMonth) {
          monthlyPromptTokens += promptTokens;
          monthlyCompletionTokens += completionTokens;
          monthlyTokens += tokens;
          monthlyEmbeddingTokens += embeddingTokens;
          monthlyCost += cost;
        }

        // Check if message is from last month
        if (
          message.created_at >= startOfLastMonth &&
          message.created_at <= endOfLastMonth
        ) {
          lastMonthTokens += tokens;
          lastMonthCost += cost;
        }
      }
    });

    // Calculate percentage change from last month
    const monthlyChange =
      lastMonthTokens > 0
        ? ((monthlyTokens - lastMonthTokens) / lastMonthTokens) * 100
        : monthlyTokens > 0
        ? 100
        : 0;

    // Token limits (Free plan: 5,000 tokens, Premium: unlimited)
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
        is_premium: false, // TODO: Add premium check when subscription system is implemented
      },
      message_count: messages.length,
    };
  }
}
