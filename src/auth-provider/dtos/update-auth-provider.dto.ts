import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';
import { AuthProviderType } from '../../common/interfaces';

export class UpdateAuthProviderDto {
  @IsOptional()
  @IsEnum(AuthProviderType)
  type?: AuthProviderType;

  @IsOptional()
  @IsString()
  base_url?: string;

  @IsOptional()
  @IsString()
  access_token?: string;

  @IsOptional()
  @IsString()
  refresh_token?: string;

  @IsOptional()
  @IsObject()
  metadata?: any;
}
