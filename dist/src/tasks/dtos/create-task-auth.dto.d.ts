import { TaskType, Priority } from "../../common/interfaces";
export declare class CreateTaskAuthDto {
    project_id?: string;
    title: string;
    description?: string;
    due_date?: string;
    is_all_day?: boolean;
    is_submitted?: boolean;
    type: TaskType;
    priority?: Priority;
    raw_canvas_data?: any;
}
