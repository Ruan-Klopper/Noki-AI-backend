import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { Priority } from '../../common/interfaces';

export class CreateTodoDto {
  @IsString()
  user_id: string;

  @IsString()
  task_id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsDateString()
  due_date?: string;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsDateString()
  due_date?: string;
}
