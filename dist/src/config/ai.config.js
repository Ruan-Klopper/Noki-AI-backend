"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("ai", () => ({
    server: {
        url: process.env.AI_SERVER_URL ||
            "https://noki-ai-aiserver-production.up.railway.app",
        token: process.env.AI_SERVER_TOKEN,
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_MODEL || "gpt-4",
        maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || "2000"),
    },
    langchain: {
        temperature: parseFloat(process.env.LANGCHAIN_TEMPERATURE || "0.7"),
        maxRetries: parseInt(process.env.LANGCHAIN_MAX_RETRIES || "3"),
    },
}));
//# sourceMappingURL=ai.config.js.map