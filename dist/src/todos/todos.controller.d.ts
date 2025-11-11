import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { UpdateTodoDto } from "./dtos/update-todo.dto";
import { CreateTodoAuthDto } from "./dtos/create-todo-auth.dto";
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
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
    createTodo(taskId: string, createTodoDto: CreateTodoAuthDto, currentUser: any): Promise<{
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
    updateTodo(body: {
        todoIds: string[];
        updates: UpdateTodoDto;
    }, currentUser: any): Promise<{
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
    deleteTodo(body: {
        todoIds: string[];
    }, currentUser: any): Promise<{
        deleted: number;
        todoIds: string[];
    }>;
    completeTodo(id: string, currentUser: any): Promise<{
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
