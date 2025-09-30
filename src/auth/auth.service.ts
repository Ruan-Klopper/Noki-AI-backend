import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    // Implement user registration logic
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        name: registerDto.name,
      },
    });
    return user;
  }

  async login(loginDto: LoginDto) {
    // Implement login logic
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    return user;
  }

  async googleLogin(googleUser: any) {
    // Implement Google OAuth login
    const user = await this.prisma.user.upsert({
      where: { email: googleUser.email },
      update: { name: googleUser.name },
      create: {
        email: googleUser.email,
        name: googleUser.name,
      },
    });
    return user;
  }
}
