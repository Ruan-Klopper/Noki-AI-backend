-- CreateEnum
CREATE TYPE "public"."MessageRole" AS ENUM ('User', 'Assistant', 'System');

-- CreateEnum
CREATE TYPE "public"."ChatStage" AS ENUM ('Thinking', 'Intent', 'Response', 'Complete');

-- CreateTable
CREATE TABLE "public"."conversations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "ai_engine_id" TEXT,
    "context_source" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_messages" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "user_id" TEXT,
    "role" "public"."MessageRole" NOT NULL,
    "stage" "public"."ChatStage" NOT NULL DEFAULT 'Thinking',
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "blocks" JSONB,
    "intent" JSONB,
    "token_usage" JSONB,
    "project_id" TEXT,
    "task_id" TEXT,
    "embedding_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chat_messages_conversation_id_idx" ON "public"."chat_messages"("conversation_id");

-- CreateIndex
CREATE INDEX "chat_messages_user_id_idx" ON "public"."chat_messages"("user_id");

-- CreateIndex
CREATE INDEX "chat_messages_project_id_idx" ON "public"."chat_messages"("project_id");

-- CreateIndex
CREATE INDEX "chat_messages_task_id_idx" ON "public"."chat_messages"("task_id");

-- AddForeignKey
ALTER TABLE "public"."conversations" ADD CONSTRAINT "conversations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_messages" ADD CONSTRAINT "chat_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_messages" ADD CONSTRAINT "chat_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_messages" ADD CONSTRAINT "chat_messages_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_messages" ADD CONSTRAINT "chat_messages_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
