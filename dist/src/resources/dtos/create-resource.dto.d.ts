import { ResourceType } from "../../common/interfaces";
export declare class CreateResourceDto {
    user_id: string;
    title: string;
    description?: string;
    type: ResourceType;
    url?: string;
    file_path?: string;
    metadata?: any;
    task_id?: string;
    project_id?: string;
}
export declare class UpdateResourceDto {
    title?: string;
    description?: string;
    type?: ResourceType;
    url?: string;
    file_path?: string;
    metadata?: any;
}
