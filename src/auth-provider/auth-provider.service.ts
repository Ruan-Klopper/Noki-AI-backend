import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateAuthProviderDto } from "./dtos/create-auth-provider.dto";
import { UpdateAuthProviderDto } from "./dtos/update-auth-provider.dto";
import { AuthProviderType } from "../common/interfaces";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthProviderService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthProviderDto: CreateAuthProviderDto) {
    const { access_token, refresh_token, ...providerData } =
      createAuthProviderDto;

    // For Canvas tokens, store them directly (they're bearer tokens, not passwords)
    // For other providers, hash them for security
    const access_token_hash =
      providerData.type === "Canvas"
        ? access_token
        : await bcrypt.hash(access_token, 10);

    const refresh_token_hash = refresh_token
      ? providerData.type === "Canvas"
        ? refresh_token
        : await bcrypt.hash(refresh_token, 10)
      : null;

    return this.prisma.authProvider.create({
      data: {
        ...providerData,
        access_token_hash,
        refresh_token_hash,
      },
    });
  }

  async findAll() {
    return this.prisma.authProvider.findMany({
      include: {
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

  async findOne(id: string) {
    return this.prisma.authProvider.findUnique({
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
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.authProvider.findMany({
      where: { user_id: userId },
      include: {
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

  async update(id: string, updateAuthProviderDto: UpdateAuthProviderDto) {
    const { access_token, refresh_token, ...updateData } =
      updateAuthProviderDto;
    const data: any = { ...updateData };

    if (access_token) {
      // For Canvas tokens, store them directly (they're bearer tokens, not passwords)
      // For other providers, hash them for security
      data.access_token_hash =
        updateData.type === "Canvas"
          ? access_token
          : await bcrypt.hash(access_token, 10);
    }
    if (refresh_token) {
      data.refresh_token_hash =
        updateData.type === "Canvas"
          ? refresh_token
          : await bcrypt.hash(refresh_token, 10);
    }

    return this.prisma.authProvider.update({
      where: { id },
      data,
    });
  }

  async getAccessToken(
    userId: string,
    providerType: string
  ): Promise<string | null> {
    const provider = await this.prisma.authProvider.findFirst({
      where: {
        user_id: userId,
        type: providerType as any,
      },
    });

    if (!provider) {
      return null;
    }

    // For Canvas, we need to store the token in a retrievable way
    // This is a temporary solution - in production, use proper encryption
    return provider.access_token_hash; // This should be the original token, not hashed
  }

  async remove(id: string) {
    return this.prisma.authProvider.delete({
      where: { id },
    });
  }
}
