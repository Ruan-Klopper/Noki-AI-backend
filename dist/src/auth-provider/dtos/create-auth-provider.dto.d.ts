import { AuthProviderType } from '../../common/interfaces';
export declare class CreateAuthProviderDto {
    user_id: string;
    type: AuthProviderType;
    base_url?: string;
    access_token: string;
    refresh_token?: string;
    metadata?: any;
}
