import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/auth/google/callback",
      scope: ["email", "profile"],
      passReqToCallback: false,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    try {
      const { name, emails, photos, id } = profile;

      if (!emails || !emails[0] || !emails[0].value) {
        return done(new Error("No email found in Google profile"), false);
      }

      const user = {
        googleId: id,
        email: emails[0].value,
        firstname: name?.givenName || "",
        lastname: name?.familyName || "",
        name: name ? `${name.givenName} ${name.familyName}` : "",
        picture: photos && photos[0] ? photos[0].value : "",
        accessToken,
        refreshToken,
        emailVerified: emails[0].verified || false,
      };

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
