import {
  Injectable,
  UnauthorizedException,
  Logger,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../database/prisma.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { EmailService } from "../email/email.service";
import { ProjectSource, TaskType, Priority } from "../common/interfaces";
import axios from "axios";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException("User already exists");
    }

    // Hash password
    const password_hash = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        firstname: registerDto.firstname,
        lastname: registerDto.lastname,
        email: registerDto.email,
        password_hash,
      },
    });

    // Onboarding: create default General project, Explore task, and sample conversation
    await this.createOnboardingProjectAndTask(user.id);
    await this.createSampleConversation(user.id);

    // Send welcome email (non-blocking)
    this.emailService
      .sendWelcomeEmail(
        user.email,
        `${user.firstname} ${user.lastname}`.trim() || user.email
      )
      .catch(() => {});

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

    // Validate password using bcrypt
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password_hash
    );
    if (!isPasswordValid) {
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

        // Onboarding for new Google users
        await this.createOnboardingProjectAndTask(user.id);
        await this.createSampleConversation(user.id);

        // Send welcome email (non-blocking)
        this.emailService
          .sendWelcomeEmail(
            user.email,
            `${user.firstname} ${user.lastname}`.trim() || user.email
          )
          .catch(() => {});
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

  async exchangeGoogleIdToken(idToken: string) {
    if (!idToken || typeof idToken !== "string") {
      throw new BadRequestException("Missing or invalid Google ID token");
    }

    try {
      // Verify the ID token with Google tokeninfo endpoint
      const tokenInfoUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(
        idToken
      )}`;
      const { data } = await axios.get(tokenInfoUrl, { timeout: 8000 });

      /* Expected fields from tokeninfo:
         - sub: Google user ID
         - email
         - email_verified ("true" | "false")
         - given_name, family_name, name, picture
      */
      const googleUser = {
        googleId: data.sub,
        email: data.email,
        firstname: data.given_name || "",
        lastname: data.family_name || "",
        name: data.name || "",
        picture: data.picture || "",
        accessToken: "", // not applicable for ID token exchange
        refreshToken: "", // not applicable
        emailVerified: String(data.email_verified) === "true",
      };

      if (!googleUser.email) {
        throw new UnauthorizedException("Invalid Google token: email missing");
      }

      return await this.googleAuth(googleUser);
    } catch (error: any) {
      this.logger.error(
        `Google ID token verification failed: ${error?.message || error}`
      );
      if (error?.response?.data?.error_description) {
        throw new UnauthorizedException(
          `Invalid Google token: ${error.response.data.error_description}`
        );
      }
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new UnauthorizedException("Invalid Google token");
    }
  }

  private async createOnboardingProjectAndTask(userId: string): Promise<void> {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const project = await this.prisma.project.create({
      data: {
        user_id: userId,
        title: "General",
        description: "Your default project in Noki AI",
        source: ProjectSource.Personal,
        color_hex: "#1d72a6",
      },
    });

    await this.prisma.task.create({
      data: {
        user_id: userId,
        project_id: project.id,
        title: "Explore Noki AI",
        description:
          "Take a quick tour and explore what Noki AI can do for you.",
        due_date: startOfDay,
        type: TaskType.Personal,
        priority: Priority.Medium,
      },
    });
  }

  private async createSampleConversation(userId: string): Promise<void> {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

    await this.prisma.conversation.create({
      data: {
        user_id: userId,
        title: `New Conversation - ${formattedDate}`,
        description: "Your first conversation with Noki AI",
      },
    });

    this.logger.log(`Sample conversation created for user: ${userId}`);
  }

  async validateGoogleUser(googleUser: any) {
    if (!googleUser || !googleUser.email) {
      throw new UnauthorizedException("Invalid Google user data");
    }
    return this.googleAuth(googleUser);
  }
}
