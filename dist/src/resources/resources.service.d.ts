import { PrismaService } from "../database/prisma.service";
import { CreateResourceDto } from "./dtos/create-resource.dto";
import { UpdateResourceDto } from "./dtos/update-resource.dto";
export declare class ResourcesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createResourceDto: CreateResourceDto): Promise<{
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
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
        task: ({
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
        }) | null;
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        type: import(".prisma/client").$Enums.ResourceType;
        project_id: string | null;
        task_id: string | null;
        url: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
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
        task: ({
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
        }) | null;
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        type: import(".prisma/client").$Enums.ResourceType;
        project_id: string | null;
        task_id: string | null;
        url: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    findOne(id: string): Promise<({
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
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
        task: ({
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
        }) | null;
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        type: import(".prisma/client").$Enums.ResourceType;
        project_id: string | null;
        task_id: string | null;
        url: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }) | null>;
    findByUser(userId: string): Promise<({
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
        task: ({
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
        }) | null;
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        type: import(".prisma/client").$Enums.ResourceType;
        project_id: string | null;
        task_id: string | null;
        url: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    findByTask(taskId: string): Promise<({
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
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
        user_id: string;
        type: import(".prisma/client").$Enums.ResourceType;
        project_id: string | null;
        task_id: string | null;
        url: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    findByProject(projectId: string): Promise<({
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
        task: {
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
        } | null;
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        type: import(".prisma/client").$Enums.ResourceType;
        project_id: string | null;
        task_id: string | null;
        url: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    update(id: string, updateResourceDto: UpdateResourceDto): Promise<{
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
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
        task: ({
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
        }) | null;
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        type: import(".prisma/client").$Enums.ResourceType;
        project_id: string | null;
        task_id: string | null;
        url: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        user_id: string;
        type: import(".prisma/client").$Enums.ResourceType;
        project_id: string | null;
        task_id: string | null;
        url: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
