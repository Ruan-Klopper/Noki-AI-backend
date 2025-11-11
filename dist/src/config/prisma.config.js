"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('prisma', () => ({
    databaseUrl: process.env.DATABASE_URL,
    logLevel: process.env.PRISMA_LOG_LEVEL || 'info',
}));
//# sourceMappingURL=prisma.config.js.map