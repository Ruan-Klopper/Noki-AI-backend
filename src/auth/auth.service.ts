import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    // Implement user registration logic
    const user = await this.prisma.user.create({
      data: {
        firstname: registerDto.firstname,
        lastname: registerDto.lastname,
        email: registerDto.email,
        password_hash: registerDto.password, // This should be hashed in the users service
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
      update: {
        firstname: googleUser.firstname || googleUser.name?.split(" ")[0],
        lastname: googleUser.lastname || googleUser.name?.split(" ")[1],
      },
      create: {
        firstname: googleUser.firstname || googleUser.name?.split(" ")[0],
        lastname: googleUser.lastname || googleUser.name?.split(" ")[1],
        email: googleUser.email,
        password_hash: "", // Google users don't need password
        google_id: googleUser.id,
      },
    });
    return user;
  }
}
