"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI_GLOBALS = void 0;
exports.AI_GLOBALS = {
    is_dev: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev",
    AI_DEV_URL: process.env.AI_DEV_URL || "http://localhost:8000/",
    AI_LIVE_URL: process.env.AI_LIVE_URL || "https://noidea.noki.co.za/",
    AI_BEARER_TOKEN: process.env.AI_BAREAR_TOKEN || "",
    get aiServerUrl() {
        return this.is_dev ? this.AI_DEV_URL : this.AI_LIVE_URL;
    },
    get bearerToken() {
        return this.AI_BEARER_TOKEN;
    },
};
//# sourceMappingURL=globals.js.map