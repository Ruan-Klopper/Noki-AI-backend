import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { CanvasModule } from './canvas/canvas.module';
import { AiModule } from './ai/ai.module';
import { GoogleModule } from './integrations/google/google.module';
import prismaConfig from './config/prisma.config';
import authConfig from './config/auth.config';
import aiConfig from './config/ai.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [prismaConfig, authConfig, aiConfig],
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    CanvasModule,
    AiModule,
    GoogleModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
