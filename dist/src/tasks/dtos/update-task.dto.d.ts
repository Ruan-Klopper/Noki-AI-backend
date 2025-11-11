import { Priority } from "../../common/interfaces";
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    due_date?: string;
    is_submitted?: boolean;
    priority?: Priority;
    raw_canvas_data?: any;
}
