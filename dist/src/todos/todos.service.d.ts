import { PrismaService } from "../database/prisma.service";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { UpdateTodoDto } from "./dtos/update-todo.dto";
export declare class TodosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTodoDto: CreateTodoDto): Promise<{
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
        task: {
            project: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                description: string | null;
                source: import(".prisma/client").$Enums.ProjectSource;
                external_id: string | null;
                course_code: string | null;
                color_hex: string | null;
                time_zone: string | null;
                start_at: Date | null;
                end_at: Date | null;
                raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
                user_id: string;
            } | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            description: string | null;
            raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
            user_id: string;
            due_date: Date | null;
            is_all_day: boolean;
            is_submitted: boolean;
            type: import(".prisma/client").$Enums.TaskType;
            priority: import(".prisma/client").$Enums.Priority | null;
            project_id: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        due_date: Date | null;
        is_all_day: boolean;
        is_submitted: boolean;
        priority: import(".prisma/client").$Enums.Priority | null;
        task_id: string;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
        task: {
            project: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                description: string | null;
                source: import(".prisma/client").$Enums.ProjectSource;
                external_id: string | null;
                course_code: string | null;
                color_hex: string | null;
                time_zone: string | null;
                start_at: Date | null;
                end_at: Date | null;
                raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
                user_id: string;
            } | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            description: string | null;
            raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
            user_id: string;
            due_date: Date | null;
            is_all_day: boolean;
            is_submitted: boolean;
            type: import(".prisma/client").$Enums.TaskType;
            priority: import(".prisma/client").$Enums.Priority | null;
            project_id: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        due_date: Date | null;
        is_all_day: boolean;
        is_submitted: boolean;
        priority: import(".prisma/client").$Enums.Priority | null;
        task_id: string;
    })[]>;
    findOne(id: string): Promise<({
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
        task: {
            project: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                description: string | null;
                source: import(".prisma/client").$Enums.ProjectSource;
                external_id: string | null;
                course_code: string | null;
                color_hex: string | null;
                time_zone: string | null;
                start_at: Date | null;
                end_at: Date | null;
                raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
                user_id: string;
            } | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            description: string | null;
            raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
            user_id: string;
            due_date: Date | null;
            is_all_day: boolean;
            is_submitted: boolean;
            type: import(".prisma/client").$Enums.TaskType;
            priority: import(".prisma/client").$Enums.Priority | null;
            project_id: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        due_date: Date | null;
        is_all_day: boolean;
        is_submitted: boolean;
        priority: import(".prisma/client").$Enums.Priority | null;
        task_id: string;
    }) | null>;
    findByUser(userId: string): Promise<({
        task: {
            project: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                description: string | null;
                source: import(".prisma/client").$Enums.ProjectSource;
                external_id: string | null;
                course_code: string | null;
                color_hex: string | null;
                time_zone: string | null;
                start_at: Date | null;
                end_at: Date | null;
                raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
                user_id: string;
            } | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            description: string | null;
            raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
            user_id: string;
            due_date: Date | null;
            is_all_day: boolean;
            is_submitted: boolean;
            type: import(".prisma/client").$Enums.TaskType;
            priority: import(".prisma/client").$Enums.Priority | null;
            project_id: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        due_date: Date | null;
        is_all_day: boolean;
        is_submitted: boolean;
        priority: import(".prisma/client").$Enums.Priority | null;
        task_id: string;
    })[]>;
    findByTask(taskId: string): Promise<({
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        due_date: Date | null;
        is_all_day: boolean;
        is_submitted: boolean;
        priority: import(".prisma/client").$Enums.Priority | null;
        task_id: string;
    })[]>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<{
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
        task: {
            project: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                description: string | null;
                source: import(".prisma/client").$Enums.ProjectSource;
                external_id: string | null;
                course_code: string | null;
                color_hex: string | null;
                time_zone: string | null;
                start_at: Date | null;
                end_at: Date | null;
                raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
                user_id: string;
            } | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            description: string | null;
            raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
            user_id: string;
            due_date: Date | null;
            is_all_day: boolean;
            is_submitted: boolean;
            type: import(".prisma/client").$Enums.TaskType;
            priority: import(".prisma/client").$Enums.Priority | null;
            project_id: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        due_date: Date | null;
        is_all_day: boolean;
        is_submitted: boolean;
        priority: import(".prisma/client").$Enums.Priority | null;
        task_id: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        due_date: Date | null;
        is_all_day: boolean;
        is_submitted: boolean;
        priority: import(".prisma/client").$Enums.Priority | null;
        task_id: string;
    }>;
    getTodoListForPeriod(userId: string, duration: "today" | "this_week" | "this_month" | "next_two_months" | "all" | "overdue", projectIds?: string[]): Promise<any[]>;
    saveTodoList(todos: Array<{
        title: string;
        description?: string;
        task_id: string;
        user_id: string;
        priority?: "High" | "Medium" | "Low";
        due_date?: string;
    }>): Promise<any[]>;
    createByUser(createTodoDto: any, userId: string): Promise<{
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
        task: {
            project: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                description: string | null;
                source: import(".prisma/client").$Enums.ProjectSource;
                external_id: string | null;
                course_code: string | null;
                color_hex: string | null;
                time_zone: string | null;
                start_at: Date | null;
                end_at: Date | null;
                raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
                user_id: string;
            } | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            description: string | null;
            raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
            user_id: string;
            due_date: Date | null;
            is_all_day: boolean;
            is_submitted: boolean;
            type: import(".prisma/client").$Enums.TaskType;
            priority: import(".prisma/client").$Enums.Priority | null;
            project_id: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        due_date: Date | null;
        is_all_day: boolean;
        is_submitted: boolean;
        priority: import(".prisma/client").$Enums.Priority | null;
        task_id: string;
    }>;
    updateManyByUser(todoIds: string[], userId: string, updateTodoDto: any): Promise<{
        updated: number;
        todos: ({
            user: {
                id: string;
                email: string;
                firstname: string;
                lastname: string;
            };
            task: {
                project: {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    title: string;
                    description: string | null;
                    source: import(".prisma/client").$Enums.ProjectSource;
                    external_id: string | null;
                    course_code: string | null;
                    color_hex: string | null;
                    time_zone: string | null;
                    start_at: Date | null;
                    end_at: Date | null;
                    raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
                    user_id: string;
                } | null;
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                description: string | null;
                raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
                user_id: string;
                due_date: Date | null;
                is_all_day: boolean;
                is_submitted: boolean;
                type: import(".prisma/client").$Enums.TaskType;
                priority: import(".prisma/client").$Enums.Priority | null;
                project_id: string | null;
            };
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            description: string | null;
            user_id: string;
            due_date: Date | null;
            is_all_day: boolean;
            is_submitted: boolean;
            priority: import(".prisma/client").$Enums.Priority | null;
            task_id: string;
        })[];
    }>;
    removeManyByUser(todoIds: string[], userId: string): Promise<{
        deleted: number;
        todoIds: string[];
    }>;
    completeTodo(id: string, userId: string): Promise<{
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
        task: {
            project: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                description: string | null;
                source: import(".prisma/client").$Enums.ProjectSource;
                external_id: string | null;
                course_code: string | null;
                color_hex: string | null;
                time_zone: string | null;
                start_at: Date | null;
                end_at: Date | null;
                raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
                user_id: string;
            } | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            description: string | null;
            raw_canvas_data: import("@prisma/client/runtime/library").JsonValue | null;
            user_id: string;
            due_date: Date | null;
            is_all_day: boolean;
            is_submitted: boolean;
            type: import(".prisma/client").$Enums.TaskType;
            priority: import(".prisma/client").$Enums.Priority | null;
            project_id: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        due_date: Date | null;
        is_all_day: boolean;
        is_submitted: boolean;
        priority: import(".prisma/client").$Enums.Priority | null;
        task_id: string;
    }>;
}
