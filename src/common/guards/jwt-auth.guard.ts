import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Extract token from Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("No token provided");
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      // Verify and decode the JWT token
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || "default-secret-key",
      });

      // Attach user info to request object
      request.user = {
        userId: payload.sub,
        email: payload.email,
        isGoogleUser: payload.isGoogleUser || false,
        isNewUser: payload.isNewUser || false,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
