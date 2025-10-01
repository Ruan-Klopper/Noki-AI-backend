import { Module } from '@nestjs/common';
import { AuthProviderController } from './auth-provider.controller';
import { AuthProviderService } from './auth-provider.service';

@Module({
  controllers: [AuthProviderController],
  providers: [AuthProviderService],
  exports: [AuthProviderService],
})
export class AuthProviderModule {}
