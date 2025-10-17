import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../database/prisma.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

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

  async googleAuth(googleUser: any) {
    try {
      this.logger.log(`Google OAuth attempt for email: ${googleUser.email}`);

      // Check if user exists by email
      const existingUser = await this.prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      let user;
      let isNewUser = false;

      if (existingUser) {
        // User exists - update their Google ID if not set
        user = await this.prisma.user.update({
          where: { email: googleUser.email },
          data: {
            google_id: googleUser.googleId,
            firstname: googleUser.firstname || existingUser.firstname,
            lastname: googleUser.lastname || existingUser.lastname,
            profile_image: googleUser.picture || existingUser.profile_image,
          },
        });
        this.logger.log(`Existing user logged in: ${user.email}`);
      } else {
        // User doesn't exist - create new user
        user = await this.prisma.user.create({
          data: {
            email: googleUser.email,
            firstname: googleUser.firstname || "",
            lastname: googleUser.lastname || "",
            google_id: googleUser.googleId,
            password_hash: "", // Google users don't need password
            profile_image: googleUser.picture || "",
          },
        });
        isNewUser = true;
        this.logger.log(`New user created: ${user.email}`);
      }

      // Generate JWT token
      const payload = {
        email: user.email,
        sub: user.id,
        isGoogleUser: true,
        isNewUser,
      };
      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          profile_picture: user.profile_image,
          email_verified: true, // Google users are considered verified
        },
        isNewUser,
        message: isNewUser
          ? "Account created successfully"
          : "Login successful",
      };
    } catch (error) {
      this.logger.error(`Google OAuth error: ${error.message}`, error.stack);
      throw new UnauthorizedException("Google authentication failed");
    }
  }

  async validateGoogleUser(googleUser: any) {
    if (!googleUser || !googleUser.email) {
      throw new UnauthorizedException("Invalid Google user data");
    }
    return this.googleAuth(googleUser);
  }
}
