export declare class CanvasUserDetails {
    id: number;
    name: string;
    created_at: string;
    sortable_name: string;
    short_name: string;
    avatar_url: string;
    last_name: string;
    first_name: string;
    locale: string | null;
    effective_locale: string;
    permissions: {
        can_update_name: boolean;
        can_update_avatar: boolean;
        limit_parent_app_web_access: boolean;
    };
}
export declare class SetupCanvasResponseDto {
    message: string;
    user_details: CanvasUserDetails;
}
