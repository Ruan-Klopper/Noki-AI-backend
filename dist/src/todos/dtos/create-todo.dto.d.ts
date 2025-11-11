import { Priority } from "../../common/interfaces";
export declare class CreateTodoDto {
    user_id: string;
    task_id: string;
    title: string;
    description?: string;
    priority?: Priority;
    due_date?: string;
    is_all_day?: boolean;
    is_submitted?: boolean;
}
export declare class UpdateTodoDto {
    title?: string;
    description?: string;
    priority?: Priority;
    due_date?: string;
    is_all_day?: boolean;
    is_submitted?: boolean;
}
