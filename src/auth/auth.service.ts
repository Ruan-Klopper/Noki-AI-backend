import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../database/prisma.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException("User already exists");
    }

    // Create user
    const user = await this.prisma.user.create({
      data: {
        firstname: registerDto.firstname,
        lastname: registerDto.lastname,
        email: registerDto.email,
        password_hash: registerDto.password, // This should be hashed in the users service
      },
    });

    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    };
  }

  async login(loginDto: LoginDto) {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Simple password check (in production, use proper password hashing)
    if (user.password_hash !== loginDto.password) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    };
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
