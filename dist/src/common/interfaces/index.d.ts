export * from "./api-response.interface";
export declare enum AuthProviderType {
    Canvas = "Canvas",
    Google = "Google",
    Microsoft = "Microsoft"
}
export declare enum ProjectSource {
    Personal = "Personal",
    Canvas = "Canvas"
}
export declare enum TaskType {
    Canvas = "Canvas",
    Project = "Project",
    Personal = "Personal"
}
export declare enum Priority {
    High = "High",
    Medium = "Medium",
    Low = "Low"
}
export declare enum ResourceType {
    Document = "Document",
    Link = "Link",
    Note = "Note",
    Media = "Media",
    AI_Generated = "AI_Generated"
}
export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password_hash: string;
    profile_image?: string;
    google_id?: string;
    created_at: Date;
    updated_at: Date;
    auth_providers?: AuthProvider[];
    projects?: Project[];
    tasks?: Task[];
    todos?: Todo[];
    resources?: Resource[];
}
export interface AuthProvider {
    id: string;
    user_id: string;
    type: AuthProviderType;
    base_url?: string;
    access_token_hash: string;
    refresh_token_hash?: string;
    metadata?: any;
    created_at: Date;
    user?: User;
}
export interface Project {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    source: ProjectSource;
    external_id?: string;
    course_code?: string;
    color_hex?: string;
    time_zone?: string;
    start_at?: Date;
    end_at?: Date;
    raw_canvas_data?: any;
    created_at: Date;
    updated_at: Date;
    user?: User;
    tasks?: Task[];
    resources?: Resource[];
}
export interface Task {
    id: string;
    user_id: string;
    project_id?: string;
    title: string;
    description?: string;
    due_date?: Date;
    created_at: Date;
    updated_at: Date;
    type: TaskType;
    priority?: Priority;
    raw_canvas_data?: any;
    user?: User;
    project?: Project;
    todos?: Todo[];
    resources?: Resource[];
}
export interface Todo {
    id: string;
    user_id: string;
    task_id: string;
    title: string;
    description?: string;
    priority?: Priority;
    due_date?: Date;
    created_at: Date;
    updated_at: Date;
    user?: User;
    task?: Task;
}
export interface Resource {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    type: ResourceType;
    url?: string;
    file_path?: string;
    metadata?: any;
    created_at: Date;
    updated_at: Date;
    task_id?: string;
    project_id?: string;
    user?: User;
    task?: Task;
    project?: Project;
}
