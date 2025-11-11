import { Priority } from "../../common/interfaces";
export declare class UpdateTodoDto {
    title?: string;
    description?: string;
    priority?: Priority;
    due_date?: string;
    is_all_day?: boolean;
    is_submitted?: boolean;
}
