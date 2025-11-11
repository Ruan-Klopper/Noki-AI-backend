import { ProjectSource } from "../../common/interfaces";
export declare class CreateProjectDto {
    user_id: string;
    title: string;
    description?: string;
    source?: ProjectSource;
    external_id?: string;
    course_code?: string;
    color_hex?: string;
    time_zone?: string;
    start_at?: string;
    end_at?: string;
    raw_canvas_data?: any;
}
export declare class UpdateProjectDto {
    title?: string;
    description?: string;
    source?: ProjectSource;
    external_id?: string;
    course_code?: string;
    color_hex?: string;
    time_zone?: string;
    start_at?: string;
    end_at?: string;
    raw_canvas_data?: any;
}
