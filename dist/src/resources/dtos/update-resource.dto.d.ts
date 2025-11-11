import { ResourceType } from '../../common/interfaces';
export declare class UpdateResourceDto {
    title?: string;
    description?: string;
    type?: ResourceType;
    url?: string;
    file_path?: string;
    metadata?: any;
}
