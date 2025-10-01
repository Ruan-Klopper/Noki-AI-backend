import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';
import { AuthProviderType } from '../../common/interfaces';

export class CreateAuthProviderDto {
  @IsString()
  user_id: string;

  @IsEnum(AuthProviderType)
  type: AuthProviderType;

  @IsOptional()
  @IsString()
  base_url?: string;

  @IsString()
  access_token: string;

  @IsOptional()
  @IsString()
  refresh_token?: string;

  @IsOptional()
  @IsObject()
  metadata?: any;
}
