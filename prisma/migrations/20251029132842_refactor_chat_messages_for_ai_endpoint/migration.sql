-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('Prompt', 'Response');

-- AlterTable: Restructure chat_messages table for new AI endpoint
-- Drop old columns
ALTER TABLE "chat_messages" DROP COLUMN "role",
DROP COLUMN "stage",
DROP COLUMN "intent",
DROP COLUMN "content",
DROP COLUMN "project_id",
DROP COLUMN "task_id";

-- Add new columns
ALTER TABLE "chat_messages" 
ADD COLUMN "type" "MessageType" NOT NULL,
ADD COLUMN "prompt" TEXT,
ADD COLUMN "projects" JSONB,
ADD COLUMN "tasks" JSONB,
ADD COLUMN "todos" JSONB,
ADD COLUMN "text" TEXT;

-- Drop old indexes
DROP INDEX IF EXISTS "chat_messages_project_id_idx";
DROP INDEX IF EXISTS "chat_messages_task_id_idx";

-- Create new index
CREATE INDEX "chat_messages_type_idx" ON "chat_messages"("type");

