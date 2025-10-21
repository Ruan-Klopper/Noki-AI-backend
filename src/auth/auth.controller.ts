import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Res,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
} from "@nestjs/swagger";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

export class GoogleAuthResponseDto {
  access_token: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    profile_picture?: string;
    email_verified: boolean;
  };
  isNewUser: boolean;
  message: string;
}

export class AuthResponseDto {
  access_token: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({
    summary: "Register a new user",
    description: "Create a new user account with email and password",
  })
  @ApiResponse({
    status: 201,
    description: "User successfully registered",
    type: AuthResponseDto,
    schema: {
      example: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: "user-uuid",
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
    schema: {
      example: {
        statusCode: 400,
        message: "Validation failed",
        error: "Bad Request",
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: "Conflict - User already exists",
    schema: {
      example: {
        statusCode: 409,
        message: "User already exists",
        error: "Conflict",
      },
    },
  })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @ApiOperation({
    summary: "Login user",
    description: "Authenticate user with email and password",
  })
  @ApiResponse({
    status: 200,
    description: "User successfully logged in",
    type: AuthResponseDto,
    schema: {
      example: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: "user-uuid",
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid credentials",
    schema: {
      example: {
        statusCode: 401,
        message: "Invalid credentials",
        error: "Unauthorized",
      },
    },
  })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Get user profile",
    description: "Retrieve the authenticated user's profile information",
  })
  @ApiResponse({
    status: 200,
    description: "User profile retrieved successfully",
    schema: {
      example: {
        id: "user-uuid",
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        profile_picture: "https://example.com/avatar.jpg",
        email_verified: true,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing token",
    schema: {
      example: {
        statusCode: 401,
        message: "Unauthorized",
        error: "Unauthorized",
      },
    },
  })
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({
    summary: "Initiate Google OAuth authentication",
    description:
      "Redirects to Google OAuth consent screen. This endpoint initiates the Google OAuth flow.",
  })
  @ApiResponse({
    status: 302,
    description: "Redirect to Google OAuth consent screen",
    headers: {
      Location: {
        description: "Google OAuth URL",
        schema: {
          type: "string",
          example: "https://accounts.google.com/oauth/authorize?...",
        },
      },
    },
  })
  @ApiExcludeEndpoint()
  async googleAuth() {
    // This endpoint is handled by the Google OAuth guard
    // It will automatically redirect to Google's OAuth consent screen
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({
    summary: "Handle Google OAuth callback",
    description:
      "Handles the callback from Google OAuth. Automatically creates a new account if the user doesn't exist, or logs in existing users.",
  })
  @ApiResponse({
    status: 200,
    description: "Google authentication successful",
    type: GoogleAuthResponseDto,
    schema: {
      example: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: "user-uuid",
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@gmail.com",
          profile_picture: "https://lh3.googleusercontent.com/...",
          email_verified: true,
        },
        isNewUser: false,
        message: "Login successful",
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Google authentication failed",
    schema: {
      example: {
        statusCode: 401,
        message: "Google authentication failed",
        error: "Unauthorized",
      },
    },
  })
  @ApiExcludeEndpoint()
  async googleAuthCallback(@Request() req, @Res() res: Response) {
    try {
      const result = await this.authService.validateGoogleUser(req.user);

      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const redirectUrl = `${frontendUrl}/auth/callback?token=${result.access_token}&isNewUser=${result.isNewUser}`;

      res.redirect(redirectUrl);
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const errorUrl = `${frontendUrl}/auth/error?message=${encodeURIComponent(error.message)}`;
      res.redirect(errorUrl);
    }
  }

  @Post("google/token")
  @ApiOperation({
    summary: "Exchange Google token for JWT",
    description:
      "Alternative endpoint for frontend applications to exchange Google ID token for JWT. Useful for mobile apps or SPAs.",
  })
  @ApiResponse({
    status: 200,
    description: "Token exchange successful",
    type: GoogleAuthResponseDto,
    schema: {
      example: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: "user-uuid",
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@gmail.com",
          profile_picture: "https://lh3.googleusercontent.com/...",
          email_verified: true,
        },
        isNewUser: true,
        message: "Account created successfully",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid Google token",
    schema: {
      example: {
        statusCode: 400,
        message: "Invalid Google token",
        error: "Bad Request",
      },
    },
  })
  @ApiBody({
    description: "Google ID token for authentication",
    schema: {
      type: "object",
      properties: {
        idToken: {
          type: "string",
          description: "Google ID token from Google Sign-In",
          example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzAyNzQ4...",
        },
      },
      required: ["idToken"],
    },
  })
  async googleTokenExchange(
    @Body() body: { idToken: string }
  ): Promise<GoogleAuthResponseDto> {
    const { idToken } = body || ({} as any);
    return this.authService.exchangeGoogleIdToken(idToken);
  }
}
