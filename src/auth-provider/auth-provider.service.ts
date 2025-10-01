import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAuthProviderDto } from './dtos/create-auth-provider.dto';
import { UpdateAuthProviderDto } from './dtos/update-auth-provider.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthProviderService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthProviderDto: CreateAuthProviderDto) {
    const { access_token, refresh_token, ...providerData } = createAuthProviderDto;
    const access_token_hash = await bcrypt.hash(access_token, 10);
    const refresh_token_hash = refresh_token ? await bcrypt.hash(refresh_token, 10) : null;

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
    const { access_token, refresh_token, ...updateData } = updateAuthProviderDto;
    const data: any = { ...updateData };

    if (access_token) {
      data.access_token_hash = await bcrypt.hash(access_token, 10);
    }
    if (refresh_token) {
      data.refresh_token_hash = await bcrypt.hash(refresh_token, 10);
    }

    return this.prisma.authProvider.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.authProvider.delete({
      where: { id },
    });
  }
}
