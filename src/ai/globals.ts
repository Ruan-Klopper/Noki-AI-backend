/**
 * Global variables for AI service
 * Centralized configuration for development and production environments
 */

export const AI_GLOBALS = {
  // Development flag - set to true for development, false for production
  is_dev:
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev",

  // AI Server URLs
  AI_DEV_URL: process.env.AI_DEV_URL || "http://localhost:8000/",
  AI_LIVE_URL: process.env.AI_LIVE_URL || "https://noidea.noki.co.za/",

  // Bearer token for AI server authentication
  AI_BEARER_TOKEN: process.env.AI_BAREAR_TOKEN || "",

  // Get the appropriate URL based on environment
  get aiServerUrl(): string {
    return this.is_dev ? this.AI_DEV_URL : this.AI_LIVE_URL;
  },

  // Get the bearer token
  get bearerToken(): string {
    return this.AI_BEARER_TOKEN;
  },
} as const;
