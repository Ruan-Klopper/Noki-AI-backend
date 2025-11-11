import { AuthProviderType } from '../../common/interfaces';
export declare class UpdateAuthProviderDto {
    type?: AuthProviderType;
    base_url?: string;
    access_token?: string;
    refresh_token?: string;
    metadata?: any;
}
