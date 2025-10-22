import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class MiscService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Deletes ALL data associated with a user including:
   * - Auth providers
   * - Projects and their associated tasks/resources
   * - Tasks and their associated todos/resources
   * - Todos
   * - Resources
   * - Conversations and chat messages
   * - Chat messages
   * - The user account itself
   *
   * WARNING: This operation is irreversible!
   *
   * @param userId - The ID of the user whose data should be deleted
   * @param requestingUserId - The ID of the user making the request (for authorization)
   * @returns Promise<void>
   */
  async deleteAllUserData(
    userId: string,
    requestingUserId: string
  ): Promise<void> {
    // Verify the requesting user exists and is authorized
    const requestingUser = await this.prisma.user.findUnique({
      where: { id: requestingUserId },
    });

    if (!requestingUser) {
      throw new NotFoundException("Requesting user not found");
    }

    // Verify the target user exists
    const targetUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      throw new NotFoundException("Target user not found");
    }

    // Authorization check: Only allow users to delete their own data
    // In a production environment, you might want to add admin roles
    if (userId !== requestingUserId) {
      throw new ForbiddenException("You can only delete your own data");
    }

    try {
      // Use a transaction to ensure all deletions succeed or none do
      await this.prisma.$transaction(async (tx) => {
        // Delete chat messages first (they reference projects/tasks)
        await tx.chatMessage.deleteMany({
          where: { user_id: userId },
        });

        // Delete conversations and their associated messages
        const conversations = await tx.conversation.findMany({
          where: { user_id: userId },
          select: { id: true },
        });

        for (const conversation of conversations) {
          await tx.chatMessage.deleteMany({
            where: { conversation_id: conversation.id },
          });
        }

        await tx.conversation.deleteMany({
          where: { user_id: userId },
        });

        // Delete todos (they reference tasks)
        await tx.todo.deleteMany({
          where: { user_id: userId },
        });

        // Delete resources (they can reference tasks/projects)
        await tx.resource.deleteMany({
          where: { user_id: userId },
        });

        // Delete tasks (they can reference projects)
        await tx.task.deleteMany({
          where: { user_id: userId },
        });

        // Delete projects
        await tx.project.deleteMany({
          where: { user_id: userId },
        });

        // Delete auth providers
        await tx.authProvider.deleteMany({
          where: { user_id: userId },
        });

        // Finally, delete the user
        await tx.user.delete({
          where: { id: userId },
        });
      });

      console.log(`Successfully deleted all data for user: ${userId}`);
    } catch (error) {
      console.error(`Failed to delete user data for user: ${userId}`, error);
      throw new Error("Failed to delete user data. Please try again.");
    }
  }

  /**
   * Gets a summary of all data associated with a user
   * Useful for confirming what will be deleted
   *
   * @param userId - The ID of the user
   * @param requestingUserId - The ID of the user making the request
   * @returns Promise<object> - Summary of user data counts
   */
  async getUserDataSummary(
    userId: string,
    requestingUserId: string
  ): Promise<{
    user: any;
    counts: {
      authProviders: number;
      projects: number;
      tasks: number;
      todos: number;
      resources: number;
      conversations: number;
      chatMessages: number;
    };
  }> {
    // Verify the requesting user exists and is authorized
    const requestingUser = await this.prisma.user.findUnique({
      where: { id: requestingUserId },
    });

    if (!requestingUser) {
      throw new NotFoundException("Requesting user not found");
    }

    // Verify the target user exists
    const targetUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      throw new NotFoundException("Target user not found");
    }

    // Authorization check: Only allow users to view their own data summary
    if (userId !== requestingUserId) {
      throw new ForbiddenException("You can only view your own data summary");
    }

    // Get counts of all related data
    const [
      authProvidersCount,
      projectsCount,
      tasksCount,
      todosCount,
      resourcesCount,
      conversationsCount,
      chatMessagesCount,
    ] = await Promise.all([
      this.prisma.authProvider.count({ where: { user_id: userId } }),
      this.prisma.project.count({ where: { user_id: userId } }),
      this.prisma.task.count({ where: { user_id: userId } }),
      this.prisma.todo.count({ where: { user_id: userId } }),
      this.prisma.resource.count({ where: { user_id: userId } }),
      this.prisma.conversation.count({ where: { user_id: userId } }),
      this.prisma.chatMessage.count({ where: { user_id: userId } }),
    ]);

    return {
      user: {
        id: targetUser.id,
        email: targetUser.email,
        firstname: targetUser.firstname,
        lastname: targetUser.lastname,
        created_at: targetUser.created_at,
      },
      counts: {
        authProviders: authProvidersCount,
        projects: projectsCount,
        tasks: tasksCount,
        todos: todosCount,
        resources: resourcesCount,
        conversations: conversationsCount,
        chatMessages: chatMessagesCount,
      },
    };
  }

  /**
   * Gets all projects, tasks, and todos for a user in a hierarchical structure
   * Projects contain tasks, and tasks contain todos
   *
   * @param userId - The ID of the user (from JWT token)
   * @returns Promise<object> - All user data in hierarchical structure
   */
  async getAllUserData(userId: string): Promise<{
    resultForUserId: string;
    data: {
      projects: any[];
    };
  }> {
    // Verify the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Fetch all projects with nested tasks and todos
    const projects = await this.prisma.project.findMany({
      where: { user_id: userId },
      include: {
        tasks: {
          include: {
            todos: {
              orderBy: [
                { priority: "desc" },
                { due_date: "asc" },
                { created_at: "desc" },
              ],
            },
          },
          orderBy: [{ due_date: "asc" }, { created_at: "desc" }],
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return {
      resultForUserId: userId,
      data: {
        projects,
      },
    };
  }
}
