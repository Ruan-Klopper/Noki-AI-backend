"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("auth", () => ({
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    },
    session: {
        secret: process.env.SESSION_SECRET,
        maxAge: parseInt(process.env.SESSION_MAX_AGE || "86400000"),
    },
}));
//# sourceMappingURL=auth.config.js.map