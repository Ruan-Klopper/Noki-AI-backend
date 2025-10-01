import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { Priority } from '../../common/interfaces';

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
