import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User successfully registered" })
  @ApiResponse({ status: 400, description: "Bad request - Invalid input data" })
  @ApiResponse({ status: 409, description: "Conflict - User already exists" })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Login user" })
  @ApiResponse({ status: 200, description: "User successfully logged in" })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid credentials",
  })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Get user profile" })
  @ApiResponse({
    status: 200,
    description: "User profile retrieved successfully",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing token",
  })
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get("google")
  @ApiOperation({ summary: "Initiate Google OAuth authentication" })
  @ApiResponse({ status: 302, description: "Redirect to Google OAuth" })
  async googleAuth() {
    // Google OAuth redirect
  }

  @Get("google/callback")
  @ApiOperation({ summary: "Handle Google OAuth callback" })
  @ApiResponse({ status: 200, description: "Google authentication successful" })
  @ApiResponse({ status: 401, description: "Google authentication failed" })
  async googleAuthCallback(@Request() req) {
    return this.authService.googleLogin(req.user);
  }
}
